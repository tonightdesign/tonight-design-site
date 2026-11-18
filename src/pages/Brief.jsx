import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { T, useLang, useT } from '../lang.jsx'
import { CONTACT, Footer, Header } from '../components/Chrome.jsx'
import { BRIEFS } from '../briefs.js'
import NotFound from './NotFound.jsx'

const encode = (data) => new URLSearchParams(data).toString()

function answerText(q, a, t) {
  if (!a) return ''
  if (q.type === 'multi') {
    const picked = (a.picked || []).map((i) => {
      const o = q.options[i]
      return o.other && a.other ? `${t(o)}: ${a.other}` : t(o)
    })
    return picked.join(', ')
  }
  if (q.type === 'choice') {
    if (a.picked == null) return ''
    const o = q.options[a.picked]
    return o.other && a.other ? `${t(o)}: ${a.other}` : t(o)
  }
  return (a.text || '').trim()
}

function isAnswered(q, a) {
  if (!a) return false
  if (q.type === 'multi') return (a.picked || []).length > 0
  if (q.type === 'choice') return a.picked != null
  return !!(a.text || '').trim()
}

export default function Brief() {
  const { project = 'studio' } = useParams()
  const brief = BRIEFS[project]
  const { lang, setLang } = useLang()
  const t = useT()

  useEffect(() => {
    if (!brief) return
    const explicit = new URLSearchParams(location.search).get('lang')
    if (!explicit && brief.lang) setLang(brief.lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

  const qs = brief?.questions || []
  const total = qs.length + 2 // contact + questions + review
  const [step, setStep] = useState(0) // 0 intro, 1 contact, 2.. questions, last review
  const [contact, setContact] = useState({ name: '', company: '', email: '', whatsapp: '' })
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [touched, setTouched] = useState(false)
  const bot = useRef(null)
  const heading = useRef(null)

  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo(0, 0); setTouched(false) }, [step, status])

  if (!brief) return <NotFound />

  const qIndex = step - 2
  const q = qs[qIndex]
  const reviewStep = qs.length + 2
  const contactOk = contact.name.trim() && (contact.email.trim() || contact.whatsapp.trim())
  const emailOk = !contact.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())

  const canNext = () => {
    if (step === 1) return contactOk && emailOk
    if (q) return !q.required || isAnswered(q, answers[q.id])
    return true
  }
  const next = () => { if (!canNext()) { setTouched(true); return } setStep((s) => s + 1) }
  const back = () => setStep((s) => Math.max(0, s - 1))

  const setA = (id, patch) => setAnswers((all) => ({ ...all, [id]: { ...(all[id] || {}), ...patch } }))

  const summary = qs.map((qq, i) => {
    const a = answerText(qq, answers[qq.id], t)
    return `${i + 1}. ${t(qq.q)}\n${a || '(sin respuesta / no answer)'}`
  }).join('\n\n')

  const submit = async () => {
    setStatus('sending')
    const payload = {
      'form-name': 'brief',
      'bot-field': bot.current?.value || '',
      project: brief.client ? `${brief.client} (${project})` : project,
      language: lang,
      name: contact.name, company: contact.company, email: contact.email, whatsapp: contact.whatsapp,
      answers: summary,
    }
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(payload) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const mailFallback = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Brief: ' + t(brief.title))}&body=${encodeURIComponent(`${contact.name} · ${contact.company}\n${contact.email} ${contact.whatsapp}\n\n${summary}`)}`

  const pct = status === 'sent' ? 100 : Math.round((Math.max(0, step - 1) / total) * 100)

  return (
    <div className="bf">
      <Header simple />
      <main id="main" className="bf-main">
        <div className="bf-progress" aria-hidden="true"><i style={{ width: pct + '%' }} /></div>
        <div className="wrap bf-wrap">
          {status === 'sent' ? (
            <section className="bf-card bf-done">
              <p className="label">{t(brief.title)}</p>
              <h1 ref={heading} tabIndex={-1}><T en="Thank you. It's with me now." es="Gracias. Ya lo tengo." /></h1>
              <p className="muted"><T en="I'll reply within one business day with next steps. If anything changes in the meantime, write to me on WhatsApp." es="Le respondo en un día hábil con los siguientes pasos. Si algo cambia mientras tanto, escríbame por WhatsApp." /></p>
              <div className="ctas">
                <a className="btn primary" href={CONTACT.waLink} target="_blank" rel="noopener">WhatsApp<span className="ar">→</span></a>
                <Link className="btn ghost" to="/"><T en="Back to tonight.design" es="Volver a tonight.design" /></Link>
              </div>
            </section>
          ) : step === 0 ? (
            <section className="bf-card">
              <p className="label">tonight.design · brief</p>
              <h1 ref={heading} tabIndex={-1}>{t(brief.title)}</h1>
              <p className="lede">{t(brief.intro)}</p>
              <div className="ctas"><button className="btn primary" type="button" onClick={next}><T en="Start" es="Empezar" /><span className="ar">→</span></button></div>
            </section>
          ) : step === 1 ? (
            <section className="bf-card">
              <p className="label"><T en="About you" es="Sobre usted" /></p>
              <h1 ref={heading} tabIndex={-1}><T en="Who should I reply to?" es="¿A quién le respondo?" /></h1>
              <div className="fields">
                <label className="field"><span><T en="Name" es="Nombre" /></span>
                  <input autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} aria-invalid={touched && !contact.name.trim()} /></label>
                <label className="field"><span><T en="Company or property" es="Empresa o propiedad" /></span>
                  <input autoComplete="organization" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} /></label>
                <label className="field"><span>Email</span>
                  <input type="email" inputMode="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} aria-invalid={touched && !emailOk} /></label>
                <label className="field"><span>WhatsApp</span>
                  <input type="tel" inputMode="tel" autoComplete="tel" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} /></label>
              </div>
              {touched && !canNext() && <p className="err" role="alert"><T en="Please add your name and an email or WhatsApp number." es="Agregue su nombre y un correo o número de WhatsApp." /></p>}
              <Nav back={back} next={next} />
            </section>
          ) : step === reviewStep ? (
            <section className="bf-card">
              <p className="label"><T en="Review" es="Revisión" /></p>
              <h1 ref={heading} tabIndex={-1}><T en="Everything right?" es="¿Todo correcto?" /></h1>
              <dl className="review">
                <div><dt><T en="Contact" es="Contacto" /></dt><dd>{[contact.name, contact.company, contact.email, contact.whatsapp].filter(Boolean).join(' · ')}</dd><button type="button" className="edit" onClick={() => setStep(1)}><T en="Edit" es="Editar" /></button></div>
                {qs.map((qq, i) => (
                  <div key={qq.id}><dt>{t(qq.q)}</dt><dd>{answerText(qq, answers[qq.id], t) || <span className="muted">·</span>}</dd><button type="button" className="edit" onClick={() => setStep(i + 2)}><T en="Edit" es="Editar" /></button></div>
                ))}
              </dl>
              <input ref={bot} name="bot-field" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              {status === 'error' && (
                <p className="err" role="alert">
                  <T en="That didn't go through. You can send the same answers by email instead: " es="No se pudo enviar. Puede mandar las mismas respuestas por correo: " />
                  <a href={mailFallback}><T en="open email" es="abrir correo" /></a>
                </p>
              )}
              <div className="bf-nav">
                <button type="button" className="btn ghost" onClick={back}>←<span><T en="Back" es="Atrás" /></span></button>
                <button type="button" className="btn primary" onClick={submit} disabled={status === 'sending'}>
                  {status === 'sending' ? <T en="Sending" es="Enviando" /> : <T en="Send" es="Enviar" />}<span className="ar">→</span>
                </button>
              </div>
            </section>
          ) : (
            <Question key={q.id} q={q} n={qIndex + 1} of={qs.length} a={answers[q.id]} setA={(p) => setA(q.id, p)} heading={heading}
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
      <button type="button" className="btn ghost" onClick={back}>←<span><T en="Back" es="Atrás" /></span></button>
      <button type="button" className="btn primary" onClick={next}>{last ? <T en="Review" es="Revisar" /> : <T en="Next" es="Siguiente" />}<span className="ar">→</span></button>
    </div>
  )
}

function Question({ q, n, of, a = {}, setA, heading, invalid, back, next }) {
  const t = useT()
  const picked = q.type === 'multi' ? (a.picked || []) : a.picked
  const isOn = (i) => (q.type === 'multi' ? picked.includes(i) : picked === i)
  const toggle = (i) => {
    if (q.type === 'multi') setA({ picked: isOn(i) ? picked.filter((x) => x !== i) : [...picked, i] })
    else setA({ picked: i })
  }
  const otherOpen = q.options?.some((o, i) => o.other && isOn(i))
  const onKey = (e) => { if (e.key === 'Enter' && q.type === 'text') next() }

  return (
    <section className="bf-card">
      <p className="label">{String(n).padStart(2, '0')} <b>/</b> {String(of).padStart(2, '0')}{!q.required && <span className="opt"> · <T en="optional" es="opcional" /></span>}</p>
      <h1 ref={heading} tabIndex={-1} id={`q-${q.id}`}>{t(q.q)}</h1>
      {q.help && <p className="muted help">{t(q.help)}</p>}

      {(q.type === 'choice' || q.type === 'multi') && (
        <div className="opts" role={q.type === 'multi' ? 'group' : 'radiogroup'} aria-labelledby={`q-${q.id}`}>
          {q.options.map((o, i) => (
            <button key={i} type="button" className="opt-btn" role={q.type === 'multi' ? 'checkbox' : 'radio'} aria-checked={isOn(i)} onClick={() => toggle(i)}>
              <span className={'mark ' + (q.type === 'multi' ? 'sq' : 'rd')} aria-hidden="true" />
              <span>{t(o)}</span>
            </button>
          ))}
        </div>
      )}
      {otherOpen && (
        <label className="field"><span><T en="Tell me more" es="Cuénteme más" /></span>
          <input value={a.other || ''} onChange={(e) => setA({ other: e.target.value })} autoFocus /></label>
      )}
      {q.type === 'text' && (
        <label className="field"><span className="sr"><T en="Your answer" es="Su respuesta" /></span>
          <input value={a.text || ''} onChange={(e) => setA({ text: e.target.value })} onKeyDown={onKey} aria-invalid={invalid} /></label>
      )}
      {q.type === 'textarea' && (
        <label className="field"><span className="sr"><T en="Your answer" es="Su respuesta" /></span>
          <textarea rows={5} value={a.text || ''} onChange={(e) => setA({ text: e.target.value })} aria-invalid={invalid} /></label>
      )}
      {invalid && <p className="err" role="alert"><T en="This one needs an answer." es="Esta pregunta necesita una respuesta." /></p>}
      <Nav back={back} next={next} last={n === of} />
    </section>
  )
}
