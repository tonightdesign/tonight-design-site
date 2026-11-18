/**
 * POST /api/brief
 * Receives a brief from /brief or /brief/<client> and emails it to the studio through Resend.
 *
 * Environment variables (Cloudflare Pages > Settings > Variables and secrets):
 *   RESEND_API_KEY  secret, from resend.com (required)
 *   BRIEF_TO        where briefs go, default julian@tonight.design
 *   BRIEF_FROM      sender on a domain verified in Resend, default "tonight.design <briefs@tonight.design>"
 */

const MAX_FIELD = 200
const MAX_ANSWERS = 20000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

const clean = (v, max = MAX_FIELD) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export async function onRequestPost({ request, env }) {
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  // Honeypot: bots fill the hidden field, people never see it. Pretend it worked.
  if (clean(data.botField)) return json({ ok: true })

  const b = {
    project: clean(data.project),
    language: clean(data.language, 5),
    name: clean(data.name),
    company: clean(data.company),
    email: clean(data.email),
    whatsapp: clean(data.whatsapp, 40),
    answers: clean(data.answers, MAX_ANSWERS),
  }
  if (!b.name || !(b.email || b.whatsapp) || !b.answers) return json({ ok: false, error: 'missing_fields' }, 422)
  if (b.email && !EMAIL_RE.test(b.email)) return json({ ok: false, error: 'bad_email' }, 422)
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500)

  const who = [b.name, b.company].filter(Boolean).join(' · ')
  const text = [
    `Project: ${b.project || 'studio'}`,
    `Language: ${b.language || '?'}`,
    `Name: ${b.name}`,
    b.company && `Company: ${b.company}`,
    b.email && `Email: ${b.email}`,
    b.whatsapp && `WhatsApp: ${b.whatsapp}`,
  ].filter(Boolean).join('\n') + '\n\n' + b.answers

  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;max-width:640px">
<p style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#069cad;margin:0 0 4px">tonight.design · brief</p>
<h2 style="font-weight:600;margin:0 0 16px">${escapeHtml(b.project || 'studio')}: ${escapeHtml(who)}</h2>
<p style="margin:0 0 20px;color:#444">${[b.email && escapeHtml(b.email), b.whatsapp && 'WhatsApp ' + escapeHtml(b.whatsapp), 'idioma ' + escapeHtml(b.language || '?')].filter(Boolean).join(' · ')}</p>
<pre style="white-space:pre-wrap;font-family:inherit;margin:0;border-top:1px solid #ddd;padding-top:16px">${escapeHtml(b.answers)}</pre>
</div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.BRIEF_FROM || 'tonight.design <briefs@tonight.design>',
      to: [env.BRIEF_TO || 'julian@tonight.design'],
      reply_to: b.email || undefined,
      subject: `Brief: ${b.project || 'studio'} · ${who}`,
      text,
      html,
    }),
  })
  if (!res.ok) return json({ ok: false, error: 'send_failed' }, 502)
  return json({ ok: true })
}

export const onRequestGet = () => json({ ok: false, error: 'method_not_allowed' }, 405)
