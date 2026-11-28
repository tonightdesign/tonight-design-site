/**
 * /yuu client delivery: YUU Temaki + HiFi Bar soft opening, 27.11.26
 *
 * The gallery at /yuu is public (unlisted, noindex). The full-resolution
 * originals in /yuu-files/ are not: the Worker only serves them to a browser
 * that has posted the right password to /api/yuu and holds the cookie.
 *
 * GET /yuu-files/yuu-soft-opening.zip streams one zip of all originals
 * (stored, not compressed: JPGs don't shrink). The zip is built on the fly
 * from the static files, so no single file goes over the 25 MiB asset limit.
 *
 * Variable (optional): YUU_PASSWORD overrides the default password.
 */

const DEFAULT_PASSWORD = 'howareyuu'
const COOKIE = 'yuu_dl'
export const YUU_PREFIX = '/yuu-files/'
const ZIP_NAME = 'yuu-soft-opening.zip'

// Sizes and CRC-32 of the originals in public/yuu-files, so the zip can stream with a known length
const FILES = [
  { name: 'yuu-soft-opening-01.jpg', size: 9463068, crc: 2787753435 },
  { name: 'yuu-soft-opening-02.jpg', size: 9539638, crc: 3188243639 },
  { name: 'yuu-soft-opening-03.jpg', size: 5762869, crc: 1605908336 },
  { name: 'yuu-soft-opening-04.jpg', size: 7268379, crc: 3662033002 },
  { name: 'yuu-soft-opening-05.jpg', size: 14693579, crc: 2609238661 },
]

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } })

async function token(env) {
  const pw = env.YUU_PASSWORD || DEFAULT_PASSWORD
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('tonight.design/yuu:' + pw))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function readCookie(request, name) {
  const all = request.headers.get('Cookie') || ''
  for (const part of all.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return v.join('=')
  }
  return ''
}

/** POST /api/yuu  { password } -> sets the download cookie */
export async function handleYuuLogin(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }
  const pw = String(data?.password ?? '').trim().toLowerCase()
  const expected = (env.YUU_PASSWORD || DEFAULT_PASSWORD).toLowerCase()
  if (!pw || pw !== expected) return json({ ok: false, error: 'wrong_password' }, 401)
  const t = await token(env)
  return json({ ok: true, url: YUU_PREFIX + ZIP_NAME }, 200, {
    'Set-Cookie': `${COOKIE}=${t}; Path=${YUU_PREFIX}; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`,
  })
}

/** GET /yuu-files/* -> only with the cookie */
export async function handleYuuFiles(request, env, ctx) {
  const url = new URL(request.url)
  if (readCookie(request, COOKIE) !== (await token(env))) {
    return Response.redirect(new URL('/yuu', url).toString(), 302)
  }
  const file = url.pathname.slice(YUU_PREFIX.length)
  const headers = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' }
  if (file === ZIP_NAME) {
    const { response, done } = streamZip(request, env, headers)
    ctx.waitUntil(done)
    return response
  }
  if (!FILES.some((f) => f.name === file)) return new Response('Not found', { status: 404, headers })
  const res = await env.ASSETS.fetch(new Request(url.toString()))
  const out = new Response(res.body, res)
  for (const [k, v] of Object.entries(headers)) out.headers.set(k, v)
  out.headers.set('Content-Disposition', `attachment; filename="${file}"`)
  return out
}

// ---- zip (store method, no compression) ----

// 27 Nov 2026, 22:00 in MS-DOS format
const DOS_TIME = (22 << 11) | (0 << 5) | 0
const DOS_DATE = ((2026 - 1980) << 9) | (11 << 5) | 27

function localHeader(f, nameBytes) {
  const b = new DataView(new ArrayBuffer(30))
  b.setUint32(0, 0x04034b50, true)
  b.setUint16(4, 20, true) // version needed
  b.setUint16(6, 0, true) // flags
  b.setUint16(8, 0, true) // store
  b.setUint16(10, DOS_TIME, true)
  b.setUint16(12, DOS_DATE, true)
  b.setUint32(14, f.crc, true)
  b.setUint32(18, f.size, true)
  b.setUint32(22, f.size, true)
  b.setUint16(26, nameBytes.length, true)
  b.setUint16(28, 0, true)
  return concat(new Uint8Array(b.buffer), nameBytes)
}

function centralHeader(f, nameBytes, offset) {
  const b = new DataView(new ArrayBuffer(46))
  b.setUint32(0, 0x02014b50, true)
  b.setUint16(4, 20, true) // made by
  b.setUint16(6, 20, true) // needed
  b.setUint16(8, 0, true)
  b.setUint16(10, 0, true)
  b.setUint16(12, DOS_TIME, true)
  b.setUint16(14, DOS_DATE, true)
  b.setUint32(16, f.crc, true)
  b.setUint32(20, f.size, true)
  b.setUint32(24, f.size, true)
  b.setUint16(28, nameBytes.length, true)
  b.setUint32(42, offset, true)
  return concat(new Uint8Array(b.buffer), nameBytes)
}

function endRecord(count, cdSize, cdOffset) {
  const b = new DataView(new ArrayBuffer(22))
  b.setUint32(0, 0x06054b50, true)
  b.setUint16(8, count, true)
  b.setUint16(10, count, true)
  b.setUint32(12, cdSize, true)
  b.setUint32(16, cdOffset, true)
  return new Uint8Array(b.buffer)
}

function concat(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
  let o = 0
  for (const p of parts) { out.set(p, o); o += p.length }
  return out
}

function streamZip(request, env, headers) {
  const enc = new TextEncoder()
  const folder = 'YUU Soft Opening 27.11.26/'
  const entries = []
  let offset = 0
  for (const f of FILES) {
    const nameBytes = enc.encode(folder + f.name)
    const local = localHeader(f, nameBytes)
    entries.push({ f, nameBytes, local, offset })
    offset += local.length + f.size
  }
  const central = concat(...entries.map((e) => centralHeader(e.f, e.nameBytes, e.offset)))
  const tail = concat(central, endRecord(entries.length, central.length, offset))
  const total = offset + tail.length

  const { readable, writable } = new FixedLengthStream(total)
  const pump = async () => {
    const writer = writable.getWriter()
    try {
      for (const e of entries) {
        await writer.write(e.local)
        const res = await env.ASSETS.fetch(new Request(new URL(YUU_PREFIX + e.f.name, request.url).toString()))
        if (!res.ok || !res.body) throw new Error('missing ' + e.f.name)
        const reader = res.body.getReader()
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          await writer.write(value)
        }
      }
      await writer.write(tail)
      await writer.close()
    } catch (err) {
      await writer.abort(err)
    }
  }
  const done = pump()
  return { response: new Response(readable, {
    headers: {
      ...headers,
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${ZIP_NAME}"`,
      'Content-Length': String(total),
    },
  }), done }
}
