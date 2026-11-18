import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { T, useLang, useT } from '../lang.jsx'
import { CONTACT, Footer, Header } from '../components/Chrome.jsx'
import { BRIEFS } from '../briefs.js'
import NotFound from './NotFound.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY_CONTACT = { name: '', company: '', email: '', whatsapp: '' }

function answerText(q, a, t) {
  if (!a) return ''
  const label = (i) => {
    const o = q.options[i]
    return o.other && a.other ? `${t(o)}: ${a.other}` : t(o)
  }
  if (q.type === 'multi') return (a.picked || []).map(label).join(', ')
  if (q.type === 'choice') return a.picked == null ? '' : label(a.picked)
  return (a.text || '').trim()
}

function isAnswered(q, a) {
  if (!a) return false
  if (q.type === 'multi') return (a.picked || []).length > 0
  if (q.type === 'choice') return a.picked != null
  return !!(a.text || '').trim()
}

// Draft survives a refresh or an accidental close of the tab (this browser only)
function loadDraft(key) {
  try { return JSON.parse(sessionStorage.getItem(key)) || null } catch { return null }
}

export default function Brief() {
  const { project = 'studio' } = useParams()
  const brief = BRIEFS[project]
  const { lang, setLang } = useLang()
  const t = useT()
  const [params, setParams] = useSearchParams()
  const draftKey = `td-brief-v1:${project}`
  const [draft] = useState(() => loadDraft(draftKey))
  const [contact, setContact] = useState(draft?.contact || EMPTY_CONTACT)
  const [answers, setAnswers] = useState(draft?.answers || {})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [touched, setTouched] = useState(false)
  const bot = useRef(null)
  const card = useRef(null)

  const qs = brief?.questions || []
  const reviewStep = qs.length + 2
  const contactOk = !!contact.name.trim() && !!(contact.email.trim() || contact.whatsapp.trim())
  const emailOk = !contact.email.trim() || EMAIL_RE.test(contact.email.trim())

  // The step lives in the URL, so the phone's back button goes to the previous question
  let step = Math.min(Math.max(parseInt(params.get('paso') || '0', 10) || 0, 0), reviewStep)
  if (step > 1 && !(contactOk && emailOk)) step = 1
  const goTo = (n) => setParams((p) => { const q = new URLSearchParams(p); if (n) q.set('paso', String(n)); else q.delete('paso'); return q })

  useEffect(() => {
    if (!brief) return
    if (!new URLSearchParams(location.search).get('lang') && brief.lang) setLang(brief.lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

  useEffect(() => {
    if (status === 'sent') return
    try { sessionStorage.setItem(draftKey, JSON.stringify({ contact, answers })) } catch { /* ignore */ }
  }, [draftKey, contact, answers, status])

  const dirty = status !== 'sent' && (Object.keys(answers).length > 0 || contact.name.trim() !== '')
  useEffect(() => {
    if (!dirty) return
    const warn = (e) => { e.preventDefault(); e.returnValue = '' }
    addEventListener('beforeunload', warn)
    return () => removeEventListener('beforeunload', warn)
  }, [dirty])

  useEffect(() => {
    setTouched(false)
    window.scrollTo(0, 0)
    card.current?.querySelector('h1')?.focus({ preventScroll: true })
  }, [step, status])

  if (!brief) return <NotFound />

  const q = qs[step - 2]
  const canNext = () => {
    if (step === 1) return contactOk && emailOk
    if (q) return !q.required || isAnswered(q, answers[q.id])
    return true
  }
  const next = () => {
    if (!canNext()) {
      setTouched(true)
      requestAnimationFrame(() => card.current?.querySelector('[aria-invalid="true"], input, textarea')?.focus())
      return
    }
    goTo(step + 1)
  }
  const back = () => (step > 0 ? window.history.back() : null)
  const setA = (id, patch) => setAnswers((all) => ({ ...all, [id]: { ...(all[id] || {}), ...patch } }))

  const summary = qs.map((qq, i) => `${i + 1}. ${t(qq.q)}\n${answerText(qq, answers[qq.id], t) || '(sin respuesta / no answer)'}`).join('\n\n')

  const submit = async () => {
    setStatus('sending')
    const payload = {
      botField: bot.current?.value || '',
      project: brief.client ? `${brief.client} (${project})` : project,
      language: lang,
      ...contact,
      answers: summary,
    }
    try {
      const res = await fetch('/api/brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(String(res.status))
      try { sessionStorage.removeItem(draftKey) } catch { /* ignore */ }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const mailFallback = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Brief: ' + t(brief.title))}&body=${encodeURIComponent(`${contact.name} · ${contact.company}\n${contact.email} ${contact.whatsapp}\n\n${summary}`)}`
  const pct = status === 'sent' ? 100 : Math.round((Math.max(0, step - 1) / (qs.length + 2)) * 100)
  const contactErr = !contact.name.trim()
    ? { en: 'Add your name so I know who to reply to.', es: 'Escriba su nombre para saber con quién hablo.' }
    : !emailOk
      ? { en: 'That email looks incomplete. Check it, or leave it empty and add WhatsApp.', es: 'Al correo le falta algo. Revíselo, o déjelo vacío y ponga su WhatsApp.' }
      : { en: 'Add an email or a WhatsApp number so I can reply.', es: 'Déjeme un correo o un WhatsApp para ponerme en contacto con usted.' }

  return (
    <div className="bf">
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header simple />
      <main id="main" className="bf-main">
        <div className="bf-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="wrap bf-wrap" ref={card}>
          {status === 'sent' ? (
            <section className="bf-card bf-done">
              <p className="label" translate="no">{t(brief.title)}</p>
              <h1 tabIndex={-1}><T en="Thank you. It's with me now." es="¡Gracias! Ya me llegó." /></h1>
              <p className="muted">{brief.done ? t(brief.done) : <T en="I'll reply within one business day with next steps. If anything changes in the meantime, write to me on WhatsApp." es="Le contesto en un día hábil con los siguientes pasos. Si algo cambia, mándeme un WhatsApp." />}</p>
              <div className="ctas">
                <a className="btn primary" href={CONTACT.waLink} target="_blank" rel="noopener"><T en="Message me on WhatsApp" es="Mándeme un WhatsApp" /><span className="ar" aria-hidden="true">→</span></a>
                <Link className="btn ghost" to="/"><T en="Back to tonight.design" es="Volver a tonight.design" /></Link>
              </div>
            </section>
          ) : step === 0 ? (
            <section className="bf-card">
              <p className="label" translate="no">tonight.design · brief</p>
              <h1 tabIndex={-1} translate="no">{t(brief.title)}</h1>
              <p className="lede">{t(brief.intro)}</p>
              <div className="ctas"><button className="btn primary" type="button" onClick={next}>{draft ? <T en="Continue" es="Continuar" /> : <T en="Start" es="Empezar" />}<span className="ar" aria-hidden="true">→</span></button></div>
            </section>
          ) : step === 1 ? (
            <section className="bf-card">
              <p className="label"><T en="About you" es="Sus datos" /></p>
              <h1 tabIndex={-1}><T en="Who should I reply to?" es="¿Con quién tengo el gusto?" /></h1>
              <div className="fields">
                <label className="field"><span><T en="Name" es="Nombre" /></span>
                  <input name="name" autoComplete="name" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} aria-invalid={touched && !contact.name.trim()} /></label>
                <label className="field"><span><T en="Company or property" es="Empresa o negocio" /></span>
                  <input name="company" autoComplete="organization" value={contact.company} onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} /></label>
                <label className="field"><span>Email</span>
                  <input name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder="nombre@empresa.com…" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} aria-invalid={touched && !emailOk} /></label>
                <label className="field"><span>WhatsApp</span>
                  <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+52 984 123 4567…" value={contact.whatsapp} onChange={(e) => setContact((c) => ({ ...c, whatsapp: e.target.value }))} /></label>
              </div>
              <p className="err" role="alert" aria-live="polite">{touched && !canNext() ? t(contactErr) : ''}</p>
              <Nav back={back} next={next} />
            </section>
          ) : step === reviewStep ? (
            <section className="bf-card">
              <p className="label"><T en="Review" es="Resumen" /></p>
              <h1 tabIndex={-1}><T en="Everything right?" es="¿Está todo bien?" /></h1>
              <dl className="review">
                <div><dt><T en="Contact" es="Contacto" /></dt><dd>{[contact.name, contact.company, contact.email, contact.whatsapp].filter(Boolean).join(' · ')}</dd><button type="button" className="edit" onClick={() => goTo(1)}><T en="Edit" es="Editar" /></button></div>
                {qs.map((qq, i) => (
                  <div key={qq.id}><dt>{t(qq.q)}</dt><dd>{answerText(qq, answers[qq.id], t) || <span className="muted"><T en="No answer" es="Sin respuesta" /></span>}</dd><button type="button" className="edit" onClick={() => goTo(i + 2)}><T en="Edit" es="Editar" /></button></div>
                ))}
              </dl>
              <input ref={bot} name="bot-field" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              <p className="err" role="alert" aria-live="polite">
                {status === 'error' && <>
                  <T en="The brief didn't send. Check your connection and try again, or send the same answers by email: " es="No se pudo enviar. Revise su conexión e inténtelo de nuevo, o mándeme sus respuestas por correo: " />
                  <a href={mailFallback}><T en="open email" es="abrir correo" /></a>
                </>}
              </p>
              <div className="bf-nav">
                <button type="button" className="btn ghost" onClick={back}><span aria-hidden="true">←</span><span><T en="Back" es="Atrás" /></span></button>
                <button type="button" className="btn primary" onClick={submit} disabled={status === 'sending'}>
                  {status === 'sending' ? <T en="Sending…" es="Enviando…" /> : <T en="Send brief" es="Enviar respuestas" />}<span className="ar" aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          ) : (
            <Question key={q.id} q={q} n={step - 1} of={qs.length} a={answers[q.id]} setA={(p) => setA(q.id, p)}
              invalid={touched && !canNext()} back={back} next={next} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Nav({ back, next, last }) {
  return (
    <div className="bf-nav">
      <button type="button" className="btn ghost" onClick={back}><span aria-hidden="true">←</span><span><T en="Back" es="Atrás" /></span></button>
      <button type="button" className="btn primary" onClick={next}>{last ? <T en="Review answers" es="Revisar respuestas" /> : <T en="Next" es="Siguiente" />}<span className="ar" aria-hidden="true">→</span></button>
    </div>
  )
}

function Question({ q, n, of, a = {}, setA, invalid, back, next }) {
  const t = useT()
  const multi = q.type === 'multi'
  const picked = multi ? (a.picked || []) : a.picked
  const isOn = (i) => (multi ? picked.includes(i) : picked === i)
  const toggle = (i) => setA({ picked: multi ? (isOn(i) ? picked.filter((x) => x !== i) : [...picked, i]) : i })
  const otherOpen = q.options?.some((o, i) => o.other && isOn(i))
  const hid = `q-${q.id}`

  return (
    <section className="bf-card">
      <p className="label">{n} <b>/</b> {of}{!q.required && <span className="opt"> · <T en="optional" es="opcional" /></span>}</p>
      <h1 tabIndex={-1} id={hid}>{t(q.q)}</h1>
      {q.help && <p className="muted help" id={`${hid}-help`}>{t(q.help)}</p>}

      {(q.type === 'choice' || multi) && (
        <fieldset className="opts" aria-labelledby={hid} aria-describedby={q.help ? `${hid}-help` : undefined} aria-invalid={invalid || undefined}>
          {q.options.map((o, i) => (
            <label key={i} className="opt-btn">
              <input type={multi ? 'checkbox' : 'radio'} name={q.id} checked={isOn(i)} onChange={() => toggle(i)} />
              <span className={'mark ' + (multi ? 'sq' : 'rd')} aria-hidden="true" />
              <span>{t(o)}</span>
            </label>
          ))}
        </fieldset>
      )}
      {otherOpen && (
        <label className="field"><span><T en="Tell me more" es="Cuénteme más" /></span>
          <input name={`${q.id}-other`} autoComplete="off" value={a.other || ''} onChange={(e) => setA({ other: e.target.value })} /></label>
      )}
      {q.type === 'text' && (
        <label className="field"><span className="sr"><T en="Your answer" es="Su respuesta" /></span>
          <input name={q.id} autoComplete="off" value={a.text || ''} onChange={(e) => setA({ text: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') next() }} aria-invalid={invalid} aria-describedby={q.help ? `${hid}-help` : undefined} /></label>
      )}
      {q.type === 'textarea' && (
        <label className="field"><span className="sr"><T en="Your answer" es="Su respuesta" /></span>
          <textarea name={q.id} autoComplete="off" rows={5} value={a.text || ''} onChange={(e) => setA({ text: e.target.value })} aria-invalid={invalid} aria-describedby={q.help ? `${hid}-help` : undefined} /></label>
      )}
      <p className="err" role="alert" aria-live="polite">{invalid ? (multi || q.type === 'choice' ? <T en="Choose an option to continue." es="Elija una opción para continuar." /> : <T en="Write an answer to continue." es="Escriba una respuesta para continuar." />) : ''}</p>
      <Nav back={back} next={next} last={n === of} />
    </section>
  )
}
