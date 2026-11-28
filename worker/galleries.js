/**
 * Client delivery galleries (/yuu, /clockit)
 *
 * The gallery pages are public (unlisted, noindex). The full-resolution
 * originals in /<slug>-files/ are not: the Worker only serves them to a browser
 * that has posted the right password to /api/<slug> and holds that gallery's cookie.
 *
 * GET /<slug>-files/<zip> streams one zip of all originals (stored, not
 * compressed: JPGs don't shrink), built on the fly from the static files so
 * no single file goes over the 25 MiB asset limit.
 *
 * Variables (optional): YUU_PASSWORD, CLOCKIT_PASSWORD override the defaults.
 * Adding a gallery: originals in public/<slug>-files, an entry here (sizes and
 * CRC-32 of each file), an entry in src/galleries.js and a route in App.jsx.
 */

export const GALLERIES = {
  yuu: {
    password: 'howareyuu',
    env: 'YUU_PASSWORD',
    zip: 'yuu-soft-opening.zip',
    folder: 'YUU Soft Opening 27.11.26/',
    files: [
      { name: 'yuu-soft-opening-01.jpg', size: 9463068, crc: 2787753435 },
      { name: 'yuu-soft-opening-02.jpg', size: 9539638, crc: 3188243639 },
      { name: 'yuu-soft-opening-03.jpg', size: 5762869, crc: 1605908336 },
      { name: 'yuu-soft-opening-04.jpg', size: 7268379, crc: 3662033002 },
      { name: 'yuu-soft-opening-05.jpg', size: 14693579, crc: 2609238661 },
    ],
  },
  clockit: {
    password: 'slay',
    env: 'CLOCKIT_PASSWORD',
    zip: 'clockit-27.11.26.zip',
    folder: 'Clock It 27.11.26/',
    files: [
      { name: 'clockit-01.jpg', size: 9277400, crc: 1051054989 },
      { name: 'clockit-02.jpg', size: 10490394, crc: 854242582 },
      { name: 'clockit-03.jpg', size: 10296219, crc: 670865223 },
      { name: 'clockit-04.jpg', size: 10672458, crc: 3908586799 },
      { name: 'clockit-05.jpg', size: 9644426, crc: 2888998027 },
      { name: 'clockit-06.jpg', size: 9681520, crc: 1169791012 },
      { name: 'clockit-07.jpg', size: 11716665, crc: 3711379498 },
      { name: 'clockit-08.jpg', size: 8967011, crc: 4142842232 },
      { name: 'clockit-09.jpg', size: 10039986, crc: 891636720 },
      { name: 'clockit-10.jpg', size: 10915980, crc: 894687637 },
      { name: 'clockit-11.jpg', size: 10864040, crc: 2996266722 },
      { name: 'clockit-12.jpg', size: 12039985, crc: 459629688 },
      { name: 'clockit-13.jpg', size: 9676779, crc: 2055585513 },
      { name: 'clockit-14.jpg', size: 9312097, crc: 1414172827 },
      { name: 'clockit-15.jpg', size: 8686465, crc: 251536820 },
    ],
  },
}

const prefix = (slug) => `/${slug}-files/`
const cookieName = (slug) => `${slug}_dl`
const passwordFor = (g, env) => String(env[g.env] || g.password).toLowerCase()

/** Which gallery a request belongs to, if any */
export function matchGallery(pathname) {
  for (const slug of Object.keys(GALLERIES)) {
    if (pathname === `/api/${slug}`) return { slug, kind: 'login' }
    if (pathname.startsWith(prefix(slug))) return { slug, kind: 'files' }
  }
  return null
}

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } })

async function token(slug, env) {
  const pw = passwordFor(GALLERIES[slug], env)
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`tonight.design/${slug}:` + pw))
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

/** POST /api/<slug>  { password } -> sets that gallery's download cookie */
export async function handleGalleryLogin(slug, request, env) {
  const g = GALLERIES[slug]
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405)
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }
  const pw = String(data?.password ?? '').trim().toLowerCase()
  const expected = passwordFor(g, env)
  if (!pw || pw !== expected) return json({ ok: false, error: 'wrong_password' }, 401)
  const t = await token(slug, env)
  return json({ ok: true, url: prefix(slug) + g.zip }, 200, {
    'Set-Cookie': `${cookieName(slug)}=${t}; Path=${prefix(slug)}; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`,
  })
}

/** GET /<slug>-files/* -> only with the cookie */
export async function handleGalleryFiles(slug, request, env, ctx) {
  const g = GALLERIES[slug]
  const url = new URL(request.url)
  if (readCookie(request, cookieName(slug)) !== (await token(slug, env))) {
    return Response.redirect(new URL('/' + slug, url).toString(), 302)
  }
  const file = url.pathname.slice(prefix(slug).length)
  const headers = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' }
  if (file === g.zip) {
    const { response, done } = streamZip(g, prefix(slug), request, env, headers)
    ctx.waitUntil(done)
    return response
  }
  if (!g.files.some((f) => f.name === file)) return new Response('Not found', { status: 404, headers })
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

function streamZip(g, dir, request, env, headers) {
  const enc = new TextEncoder()
  const entries = []
  let offset = 0
  for (const f of g.files) {
    const nameBytes = enc.encode(g.folder + f.name)
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
        const res = await env.ASSETS.fetch(new Request(new URL(dir + e.f.name, request.url).toString()))
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
      'Content-Disposition': `attachment; filename="${g.zip}"`,
      'Content-Length': String(total),
    },
  }), done }
}
