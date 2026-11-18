import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { T, useLang, useT } from '../lang.jsx'
import { CONTACT, Footer, Header } from '../components/Chrome.jsx'
import Synapse from '../components/Synapse.jsx'

const CLIENTS = ['Ahau Collection', 'La Reserva Tulum', 'Casa Ganesh', 'Alaya', 'Villa Pescadores', 'Máre', 'Petrodex', 'Water Toys Center', 'Carmel', 'Mr. Shmokey Smokehouse']

const INDEX = [
  { img: '/work/petrodex.jpg', c: 'Petrodex', w: { en: 'Investor company profile, print A5 and A4', es: 'Perfil para inversionistas, impreso en A5 y A4' }, l: { en: 'Dubai', es: 'Dubái' } },
  { img: '/work/water-toys.jpg', c: 'Water Toys Center', w: { en: 'Boat show backdrops and banners', es: 'Fondos y banners para salones náuticos' }, l: { en: 'Cannes · Monaco', es: 'Cannes · Mónaco' } },
  { img: '/work/carmel.jpg', c: 'Carmel', w: { en: 'Press kit for a French music producer and DJ', es: 'Press kit para un productor musical y DJ francés' }, l: { en: 'Mexico', es: 'México' } },
  { img: '/work/shmokey.jpg', c: 'Mr. Shmokey Smokehouse', w: { en: 'Menus, signage and light boxes', es: 'Menús, señalética y cajas de luz' }, l: { en: 'Restaurant', es: 'Restaurante' } },
]

const STAGES = [
  { nm: { en: 'The ad', es: 'El anuncio' }, sm: { en: 'Instagram · Meta', es: 'Instagram · Meta' },
    en: ['One ad for everyone, generic stock creative, and an audience that will never book.', 'Bilingual creative built from your own system, one audience sent to one page, tracking checked before spend.', 'Paid Social Setup · Growth plan'],
    es: ['Un solo anuncio para todos, creatividad genérica y una audiencia que nunca va a reservar.', 'Creatividad bilingüe hecha con su propio sistema, una audiencia enviada a una página, medición revisada antes de invertir.', 'Paid Social Setup · Plan Growth'] },
  { nm: { en: 'The page', es: 'La página' }, sm: { en: 'Website · landing', es: 'Sitio · landing' },
    en: ['The page does not match the ad: no price, no reason to book direct, slow on a phone.', 'Page sections that continue the ad, show rates and give a clear reason to book direct.', 'Funnel Audit · Signature plan'],
    es: ['La página no sigue al anuncio: sin precio, sin razón para reservar directo, lenta en el teléfono.', 'Secciones que continúan el anuncio, muestran tarifas y dan una razón clara para reservar directo.', 'Funnel Audit · Plan Signature'] },
  { nm: { en: 'The booking', es: 'La reserva' }, sm: { en: 'Engine · inquiry', es: 'Motor · solicitud' },
    en: ['The booking engine looks like another brand, or the inquiry form goes nowhere and replies take days.', 'A check of every step to the confirmation, plus a fast first reply and a follow-up sequence for leads.', 'Funnel Audit · Growth plan'],
    es: ['El motor de reservas parece otra marca, o el formulario no llega a nadie y la respuesta tarda días.', 'Una revisión de cada paso hasta la confirmación, más una primera respuesta rápida y seguimiento para prospectos.', 'Funnel Audit · Plan Growth'] },
  { nm: { en: 'The OTAs', es: 'Las OTAs' }, sm: { en: 'Airbnb · Booking · Expedia', es: 'Airbnb · Booking · Expedia' },
    en: ['Guests who would book direct pay commission, and the listings fall behind the competition.', 'A benchmark of your Airbnb, Booking.com and Expedia listings against your market, then monthly monitoring.', 'Funnel and OTA Audit · Signature plan'],
    es: ['Huéspedes que reservarían directo pagan comisión, y los anuncios se quedan atrás frente a la competencia.', 'Una comparación de sus anuncios en Airbnb, Booking.com y Expedia frente a su mercado, y después monitoreo mensual.', 'Funnel and OTA Audit · Plan Signature'] },
]

const SIZES = [
  { key: 'b', name: 'Boutique', en: 'Up to 20 keys or 30 units', es: 'Hasta 20 llaves o 30 unidades' },
  { key: 'm', name: 'Mid-size', en: '21 to 60 keys or 31 to 100 units', es: 'De 21 a 60 llaves o de 31 a 100 unidades' },
  { key: 'g', name: 'Group', en: '61+ keys, 100+ units or several properties', es: 'Más de 61 llaves, más de 100 unidades o varias propiedades' },
]

const PLANS = [
  { name: 'Essentials', p: [1000, 1400, 1900], for: { en: 'For a steady, consistent feed', es: 'Para una presencia constante y consistente' },
    items: [{ en: '12 to 24 bilingual pieces a month', es: 'De 12 a 24 piezas bilingües al mes' }, { en: 'Content calendar', es: 'Calendario de contenido' }, { en: 'Monthly brand audit', es: 'Auditoría mensual de marca' }] },
  { name: 'Growth', mid: true, p: [2000, 2800, 3800], for: { en: 'For more direct bookings and leads', es: 'Para más reservas directas y prospectos' },
    items: [{ en: 'Everything in Essentials', es: 'Todo lo de Essentials' }, { en: 'Meta ads, built and run', es: 'Anuncios en Meta, creados y gestionados' }, { en: 'A weekly check on the booking path', es: 'Revisión semanal del camino de reserva' }, { en: 'Monthly report', es: 'Reporte mensual' }] },
  { name: 'Signature', p: [3500, 4800, 6500], for: { en: 'For the whole path, OTAs included', es: 'Para todo el camino, OTAs incluidas' },
    items: [{ en: 'Everything in Growth', es: 'Todo lo de Growth' }, { en: 'OTA monitoring', es: 'Monitoreo de OTAs' }, { en: 'Dashboard and CRM', es: 'Dashboard y CRM' }, { en: 'A new web page section each month', es: 'Una nueva sección web cada mes' }] },
]

const PROJECTS = [
  { n: 'Booking Snapshot', d: { en: 'Five findings on your booking path', es: 'Cinco hallazgos sobre su camino de reserva' }, t: { en: '48 hours', es: '48 horas' }, free: true },
  { n: 'Funnel Audit', d: { en: '15 to 20 ranked fixes and a call', es: 'De 15 a 20 ajustes priorizados y una llamada' }, t: { en: '5 business days', es: '5 días hábiles' }, p: [750, 1000, 1500] },
  { n: 'Funnel and OTA Audit', d: { en: 'Adds Airbnb, Booking.com and Expedia against your market', es: 'Suma Airbnb, Booking.com y Expedia frente a su mercado' }, t: { en: '10 business days', es: '10 días hábiles' }, p: [1500, 2000, 3000] },
  { n: 'Launch Creative Pack', d: { en: 'A first set of bilingual pieces on your new system', es: 'Un primer set de piezas bilingües con su nuevo sistema' }, t: { en: '10 business days', es: '10 días hábiles' }, p: [1500, 2000, 3000] },
  { n: 'Paid Social Setup', d: { en: 'Meta account, tracking and first campaigns', es: 'Cuenta de Meta, medición y primeras campañas' }, t: { en: '2 weeks', es: '2 semanas' }, p: [1200, 1500, 2000] },
  { n: 'Brand System', d: { en: 'Your existing brand, organised into a design system', es: 'Su marca actual, ordenada en un sistema de diseño' }, t: { en: '3 to 5 weeks', es: '3 a 5 semanas' }, p: [2500, 3500, 5000] },
  { n: { en: 'Identity and Brand System', es: 'Identidad y Brand System' }, d: { en: 'A new identity, then the full system', es: 'Una identidad nueva y después el sistema completo' }, t: { en: '6 to 8 weeks', es: '6 a 8 semanas' }, p: [5000, 7000, 10000] },
]

const WHY = [
  { big: '6', u: { en: 'years', es: 'años' }, h: { en: 'Inside a hotel group', es: 'Dentro de un grupo hotelero' }, p: { en: 'Booking engines, OTAs, menus, events and seasons, from the inside.', es: 'Motores de reserva, OTAs, menús, eventos y temporadas, desde adentro.' } },
  { big: '4', u: { en: 'years', es: 'años' }, h: { en: 'Inside a developer', es: 'Dentro de un desarrollador' }, p: { en: 'Broker programmes, buyer funnels and sales material for residences.', es: 'Programas de brokers, funnels de compradores y material de ventas para residencias.' } },
  { big: '2', u: { en: 'languages', es: 'idiomas' }, h: { en: 'Written natively', es: 'Escritos de forma nativa' }, p: { en: 'Mexican and European. Copy is written in each language for guests and buyers on both sides.', es: 'Mexicano y europeo. Los textos se escriben en cada idioma, para huéspedes y compradores de ambos lados.' } },
  { big: '1', u: { en: 'person', es: 'persona' }, h: { en: 'Approves every piece', es: 'Aprueba cada pieza' }, p: { en: 'AI speeds up the production. I set the direction and sign off everything before it reaches you.', es: 'La IA agiliza la producción. Yo marco la dirección y apruebo todo antes de que llegue a usted.' } },
]

const STEPS = [
  { h: 'Booking Snapshot', when: { en: 'Free · 48 hours', es: 'Gratis · 48 horas' }, p: { en: 'Five findings on your path from ad to booking, with screenshots. No commitment.', es: 'Cinco hallazgos sobre su camino del anuncio a la reserva, con capturas. Sin compromiso.' } },
  { h: 'Funnel Audit', when: { en: '5 business days', es: '5 días hábiles' }, p: { en: '15 to 20 ranked fixes and a call. Credited if you start a plan within 30 days.', es: 'De 15 a 20 ajustes priorizados y una llamada. Se acredita si inicia un plan en 30 días.' } },
  { h: { en: 'Monthly plan', es: 'Plan mensual' }, when: { en: 'From month one', es: 'Desde el primer mes' }, p: { en: 'Your design system first, then creative, ads and a check every week.', es: 'Primero su sistema de diseño, después contenido, anuncios y una revisión cada semana.' } },
  { h: { en: 'Monthly report', es: 'Reporte mensual' }, when: { en: 'Every month', es: 'Cada mes' }, p: { en: "Results against your starting numbers, and next month's plan.", es: 'Resultados contra sus números de inicio, y el plan del mes siguiente.' } },
]

const usd = (n) => '$' + n.toLocaleString('en-US')

function CopyLine({ k, v }) {
  const { lang } = useLang()
  const [done, setDone] = useState(false)
  const ref = useRef(null)
  const copy = () => {
    const select = () => {
      const r = document.createRange(); r.selectNodeContents(ref.current)
      const s = getSelection(); s.removeAllRanges(); s.addRange(r)
    }
    try {
      navigator.clipboard.writeText(v).then(() => { setDone(true); setTimeout(() => setDone(false), 1400) }, select)
    } catch { select() }
  }
  return (
    <div className="line">
      <span className="k">{k}</span>
      <span className="v" ref={ref}>{v}</span>
      <button className="copy" type="button" onClick={copy}>{done ? (lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'es' ? 'Copiar' : 'Copy')}</button>
    </div>
  )
}

function Work() {
  const t = useT()
  const pv = useRef(null)
  const [img, setImg] = useState(null)
  const fine = typeof window !== 'undefined' && window.matchMedia?.('(hover:hover) and (pointer:fine)').matches
  const pos = useRef({ tx: 0, ty: 0, x: 0, y: 0, raf: null, on: false })

  const loop = () => {
    const p = pos.current, el = pv.current
    if (!el) return
    p.x += (p.tx - p.x) * 0.18; p.y += (p.ty - p.y) * 0.18
    el.style.left = p.x + 'px'; el.style.top = p.y + 'px'
    p.raf = p.on || Math.abs(p.tx - p.x) > 0.5 ? requestAnimationFrame(loop) : null
  }
  const enter = (e, src) => {
    if (!fine) return
    const p = pos.current
    setImg(src); p.tx = p.x = e.clientX + 180; p.ty = p.y = e.clientY; p.on = true
    if (!p.raf) p.raf = requestAnimationFrame(loop)
  }
  const move = (e) => { if (!fine) return; const p = pos.current; p.tx = e.clientX + 180; p.ty = e.clientY; if (!p.raf) p.raf = requestAnimationFrame(loop) }
  const leave = () => { pos.current.on = false; setImg((s) => s && s) ; pv.current?.classList.remove('on') }

  useEffect(() => { if (img && pos.current.on) pv.current?.classList.add('on') }, [img])

  return (
    <section className="sec" id="work" aria-labelledby="h-work">
      <div className="wrap">
        <div className="head">
          <p className="label">01 <b>/</b> <T en="Selected work" es="Trabajo seleccionado" /></p>
          <h2 id="h-work"><T en="Ten years with hotels, developments and brands" es="Diez años con hoteles, desarrollos y marcas" /></h2>
          <p><T en="Most of it in the Riviera Maya, some of it in Europe and Dubai. Two long relationships first, then a few projects." es="La mayoría en la Riviera Maya, una parte en Europa y Dubái. Primero dos relaciones largas, después algunos proyectos." /></p>
        </div>
        <div className="feat">
          <article className="card">
            <div className="img"><img src="/work/ahau.jpg" alt="Ahau Christmas menu card" loading="lazy" /></div>
            <div className="row"><p className="label">Ahau Collection · Tulum</p><span className="tag"><T en="6 years" es="6 años" /></span></div>
            <h3><T en="Brand and campaigns for a four-hotel group" es="Marca y campañas para un grupo de cuatro hoteles" /></h3>
            <p><T en="Ahau, Casa Ganesh, Alaya and Villa Pescadores with its beach club, Máre. Each keeps its own look inside one system." es="Ahau, Casa Ganesh, Alaya y Villa Pescadores con su beach club, Máre. Cada uno conserva su estilo dentro de un mismo sistema." /></p>
            <div className="tags">
              <span className="tag"><T en="Brand system" es="Sistema de marca" /></span><span className="tag"><T en="Campaigns" es="Campañas" /></span>
              <span className="tag"><T en="Print" es="Impresos" /></span><span className="tag"><T en="Social" es="Redes" /></span>
            </div>
          </article>
          <article className="card">
            <div className="img"><img src="/work/la-reserva.jpg" alt="La Reserva website section, Designed with intention" loading="lazy" /></div>
            <div className="row"><p className="label">La Reserva · Tulum</p><span className="tag"><T en="4 years" es="4 años" /></span></div>
            <h3><T en="In-house at a branded residence development" es="Dentro de un desarrollo de residencias de marca" /></h3>
            <p><T en="Sales brochures, the website, Meta ads and broker material." es="Brochures de venta, el sitio web, anuncios en Meta y material para brokers." /></p>
            <div className="tags">
              <span className="tag"><T en="Website" es="Sitio web" /></span><span className="tag"><T en="Meta ads" es="Anuncios Meta" /></span><span className="tag"><T en="Sales material" es="Material de ventas" /></span>
            </div>
          </article>
        </div>
        <div className="idx" role="list">
          {INDEX.map((r) => (
            <div className="idx-row" role="listitem" key={r.c} onMouseEnter={(e) => enter(e, r.img)} onMouseMove={move} onMouseLeave={leave}>
              <div className="th"><img src={r.img} alt="" loading="lazy" /></div>
              <span className="c">{r.c}</span><span className="w">{t(r.w)}</span><span className="l">{t(r.l)}</span>
              <span className="plus" aria-hidden="true">+</span>
            </div>
          ))}
        </div>
      </div>
      <div className="preview" ref={pv} aria-hidden="true">{img && <img alt="" src={img} />}</div>
    </section>
  )
}

function Approach() {
  const { lang } = useLang()
  const t = useT()
  const [cur, setCur] = useState(0)
  const refs = useRef([])
  const d = STAGES[cur][lang]
  const key = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (cur + (e.key === 'ArrowRight' ? 1 : STAGES.length - 1)) % STAGES.length
    setCur(n); refs.current[n]?.focus(); e.preventDefault()
  }
  return (
    <section className="sec" id="approach" aria-labelledby="h-app">
      <div className="wrap">
        <div className="head">
          <p className="label">02 <b>/</b> <T en="Approach" es="Enfoque" /></p>
          <h2 id="h-app"><T en="Bookings leak between the ad and the room" es="Las reservas se pierden entre el anuncio y la habitación" /></h2>
          <p><T en="A guest passes four points before they book. Pick one to see what usually breaks there and what I do about it." es="Un huésped pasa por cuatro puntos antes de reservar. Elija uno para ver qué suele fallar ahí y qué hago al respecto." /></p>
        </div>
        <div className="path">
          <div className="stages" role="tablist" aria-label="Booking path">
            <div className="flow" aria-hidden="true"><i /><i /><i /></div>
            {STAGES.map((s, i) => (
              <button key={i} ref={(el) => (refs.current[i] = el)} className="stage" role="tab" id={`st-${i}`} aria-selected={i === cur} aria-controls="panel" tabIndex={i === cur ? 0 : -1} onClick={() => setCur(i)} onKeyDown={key}>
                <span className="node">0{i + 1}</span><span className="nm">{t(s.nm)}</span><span className="sm">{t(s.sm)}</span>
              </button>
            ))}
          </div>
          <div className="panel" id="panel" role="tabpanel" aria-labelledby={`st-${cur}`} aria-live="polite">
            <div><span className="k"><T en="What breaks" es="Qué falla" /></span><p>{d[0]}</p></div>
            <div><span className="k"><T en="What I do" es="Qué hago" /></span><p>{d[1]}</p></div>
            <div><span className="k"><T en="Where it lives" es="Dónde está" /></span><p className="svc">{d[2]}</p></div>
          </div>
        </div>
        <div className="do">
          <div><span className="k" aria-hidden="true">A</span><h3><T en="Brand systems" es="Sistemas de marca" /></h3><p className="muted"><T en="Your own design system: logos, colours, type, templates and rules in one place, so every piece comes out consistent." es="Su propio sistema de diseño: logos, colores, tipografía, plantillas y reglas en un solo lugar, para que cada pieza salga consistente." /></p><ul><li>Brand System</li><li><T en="Identity and Brand System" es="Identidad y Brand System" /></li></ul></div>
          <div><span className="k" aria-hidden="true">B</span><h3><T en="Bilingual creative" es="Creatividad bilingüe" /></h3><p className="muted"><T en="Posts, stories, ads, newsletters and print in English and Spanish. The Spanish is written as Spanish, not translated." es="Posts, historias, anuncios, newsletters e impresos en español e inglés. El español se escribe en español, no se traduce." /></p><ul><li>Launch Creative Pack</li><li><T en="Monthly content" es="Contenido mensual" /></li></ul></div>
          <div><span className="k" aria-hidden="true">C</span><h3><T en="Growth" es="Crecimiento" /></h3><p className="muted"><T en="Meta ads, booking-path and OTA audits, landing pages and lead follow-up, measured on bookings and leads." es="Anuncios en Meta, auditorías del camino de reserva y de OTAs, landing pages y seguimiento de prospectos, medidos en reservas y leads." /></p><ul><li><T en="Funnel and OTA audits" es="Auditorías de funnel y OTAs" /></li><li>Paid Social Setup</li></ul></div>
        </div>
      </div>
    </section>
  )
}

function How() {
  const t = useT()
  const ol = useRef(null)
  const [p, setP] = useState(0)
  const [lit, setLit] = useState([])
  useEffect(() => {
    const run = () => {
      const el = ol.current; if (!el) return
      const r = el.getBoundingClientRect(), mid = innerHeight * 0.55
      setP(Math.max(0, Math.min(1, (mid - r.top) / r.height)))
      setLit([...el.querySelectorAll('li')].map((li) => li.getBoundingClientRect().top < mid))
    }
    run()
    addEventListener('scroll', run, { passive: true }); addEventListener('resize', run)
    return () => { removeEventListener('scroll', run); removeEventListener('resize', run) }
  }, [])
  return (
    <section className="sec" id="how" aria-labelledby="h-how">
      <div className="wrap how">
        <div className="side">
          <p className="label">03 <b style={{ fontWeight: 400, color: 'var(--dim)' }}>/</b> <T en="How it works" es="Cómo funciona" /></p>
          <h2 id="h-how"><T en="Start free, then decide" es="Empiece gratis y después decida" /></h2>
          <p><T en="Each step stands on its own. You only move to the next one if the last was useful." es="Cada paso funciona por sí solo. Solo pasa al siguiente si el anterior le sirvió." /></p>
          <div className="ctas"><a className="btn ghost" href="#contact"><T en="Start with step 1" es="Empiece por el paso 1" /><span className="ar">→</span></a></div>
        </div>
        <ol className="steps" ref={ol}>
          <span className="bar" aria-hidden="true" style={{ '--p': p * 100 + '%' }} />
          {STEPS.map((s, i) => (
            <li key={i} className={lit[i] ? 'lit' : undefined}>
              <span className="n">0{i + 1}</span><h3>{t(s.h)}</h3><span className="when">{t(s.when)}</span><p>{t(s.p)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Plans() {
  const t = useT()
  const { lang } = useLang()
  const [si, setSi] = useState(0)
  const [flash, setFlash] = useState(0)
  const refs = useRef([])
  const pick = (i) => { setSi(i); setFlash((f) => f + 1) }
  const key = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (i + (e.key === 'ArrowRight' ? 1 : SIZES.length - 1)) % SIZES.length
    pick(n); refs.current[n]?.focus(); e.preventDefault()
  }
  const fl = flash ? 'flash' : undefined
  return (
    <section className="sec" id="plans" aria-labelledby="h-plans">
      <div className="wrap">
        <div className="head">
          <p className="label">04 <b>/</b> <T en="Monthly plans" es="Planes mensuales" /></p>
          <h2 id="h-plans"><T en="Priced by the size of your property" es="Precios según el tamaño de su propiedad" /></h2>
          <p><T en="USD per month, three-month minimum. Ad spend is paid by you, directly to Meta. Choose your size:" es="USD al mes, mínimo tres meses. La inversión en anuncios la paga usted directamente a Meta. Elija su tamaño:" /></p>
        </div>
        <div className="size">
          <div className="seg" role="radiogroup" aria-label="Property size">
            {SIZES.map((s, i) => (
              <button key={s.key} ref={(el) => (refs.current[i] = el)} type="button" role="radio" aria-checked={i === si} tabIndex={i === si ? 0 : -1} onClick={() => pick(i)} onKeyDown={(e) => key(e, i)}>{s.name}</button>
            ))}
          </div>
          <p className="def">{SIZES[si][lang]}</p>
        </div>
        <div className="plans">
          {PLANS.map((p) => (
            <div className={'plan' + (p.mid ? ' mid' : '')} key={p.name}>
              <p className="name">{p.name}</p>
              <p className="for">{t(p.for)}</p>
              <p><span className={'price ' + (fl || '')} key={flash}>{usd(p.p[si])}</span></p>
              <p className="per"><T en="per month" es="al mes" /></p>
              <ul>{p.items.map((it, i) => <li key={i}>{t(it)}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="notes"><p><T en="Prices for Mexico and Latin America. US, Canada and Europe: about 30% higher, on request." es="Precios para México y Latinoamérica. Estados Unidos, Canadá y Europa: alrededor de 30% más, bajo solicitud." /></p></div>
        <h3 className="sub" id="projects"><T en="Audits and projects" es="Auditorías y proyectos" /></h3>
        <div className="tbl">
          <table>
            <thead><tr><th><T en="Project" es="Proyecto" /></th><th><T en="Turnaround" es="Entrega" /></th><th className="n">{SIZES[si].name}</th></tr></thead>
            <tbody>
              {PROJECTS.map((r, i) => (
                <tr key={i}>
                  <td>{t(r.n)}<span className="d">{t(r.d)}</span></td>
                  <td className="t">{t(r.t)}</td>
                  {r.free ? <td className="n free"><T en="Free" es="Gratis" /></td> : <td className={'n ' + (fl || '')} key={flash}>{usd(r.p[si])}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const t = useT()
  const { lang } = useLang()
  const [active, setActive] = useState(null)
  const [fabHidden, setFabHidden] = useState(true)
  const heroRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const map = { how: 'approach', why: 'plans' }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(map[e.target.id] || e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;['work', 'approach', 'how', 'plans', 'why', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    let heroIn = true, ctIn = false
    const upd = () => setFabHidden(heroIn || ctIn)
    const a = new IntersectionObserver((es) => { heroIn = es[0].isIntersecting; upd() }, { threshold: 0.15 })
    const b = new IntersectionObserver((es) => { ctIn = es[0].isIntersecting; upd() }, { threshold: 0.1 })
    a.observe(heroRef.current); b.observe(contactRef.current)
    if (location.hash && location.hash !== '#es') document.querySelector(location.hash)?.scrollIntoView()
    return () => { io.disconnect(); a.disconnect(); b.disconnect() }
  }, [])

  return (
    <>
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header active={active} />
      <main id="main">
        <span id="top" />
        <section className="hero" aria-labelledby="h1" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true" />
          <Synapse hostRef={heroRef} />
          <div className="wrap">
            <div className="hero-text">
              <p className="label"><T en="Hotels · rentals · residences" es="Hoteles · rentas · residencias" /></p>
              <h1 id="h1">
                {lang === 'en'
                  ?<><span className="ln">Brand, creative</span><span className="ln">and <em>growth</em> for hotels</span><span className="ln">and residences</span></>
                  : <><span className="ln">Marca, creatividad</span><span className="ln">y <em>crecimiento</em> para</span><span className="ln">hoteles y residencias</span></>}
              </h1>
              <p className="lede"><T en="A small bilingual studio. I build your design system, then run the content, the Meta ads and a weekly check on the path from ad to booking. You approve every piece." es="Un estudio pequeño y bilingüe. Construyo su sistema de diseño y después llevo el contenido, los anuncios en Meta y una revisión semanal del camino del anuncio a la reserva. Usted aprueba cada pieza." /></p>
              <div className="ctas">
                <a className="btn primary" href="#contact"><T en="Get a free Booking Snapshot" es="Pida su Booking Snapshot gratuito" /><span className="ar">→</span></a>
                <a className="btn ghost" href="#work"><T en="See the work" es="Ver el trabajo" /></a>
              </div>
            </div>
            <div className="hero-meta">
              <div className="facts">
                <span><T en="Riviera Maya first" es="Primero la Riviera Maya" /></span>
                <span><T en="Mexico and Europe" es="México y Europa" /></span>
                <span><T en="English and Spanish" es="Español e inglés" /></span>
              </div>
              <span><T en="Scroll" es="Deslice" /> ↓</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Clients">
          <div className="mq-track">
            <ul>{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
            <ul aria-hidden="true">{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>

        <Work />
        <Approach />
        <How />
        <Plans />

        <section className="sec" id="why" aria-labelledby="h-why">
          <div className="wrap">
            <div className="head">
              <p className="label">05 <b>/</b> <T en="Why tonight.design" es="Por qué tonight.design" /></p>
              <h2 id="h-why"><T en="Agency output, studio attention" es="Resultados de agencia, atención de estudio" /></h2>
            </div>
            <div className="why">
              {WHY.map((w, i) => (
                <div key={i}><p className="big">{w.big}<small>{t(w.u)}</small></p><h3>{t(w.h)}</h3><p>{t(w.p)}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="h-ct" ref={contactRef}>
          <div className="glow" aria-hidden="true" />
          <div className="wrap">
            <p className="label" style={{ marginBottom: 28 }}>06 <b style={{ fontWeight: 400, color: 'var(--dim)' }}>/</b> <T en="Start here" es="Empiece aquí" /></p>
            <div className="ct">
              <h2 id="h-ct">{lang === 'en' ? <>Get a free <em>Booking Snapshot</em></> : <>Pida su <em>Booking Snapshot</em> gratuito</>}</h2>
              <div className="r">
                <p><T en="Send your website and Instagram. Within 48 hours you get five findings on your path from ad to booking, with screenshots. No commitment." es="Envíe su sitio web y su Instagram. En 48 horas recibe cinco hallazgos sobre su camino del anuncio a la reserva, con capturas. Sin compromiso." /></p>
                <div className="lines">
                  <CopyLine k="Email" v={CONTACT.email} />
                  <CopyLine k="WhatsApp" v={CONTACT.whatsapp} />
                </div>
                <div className="ctas">
                  <a className="btn primary" href={CONTACT.waLink} target="_blank" rel="noopener"><T en="Open WhatsApp" es="Abrir WhatsApp" /><span className="ar">→</span></a>
                  <Link className="btn ghost" to="/brief"><T en="Start a project brief" es="Inicie un brief de proyecto" /><span className="ar">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <a className={'fab' + (fabHidden ? ' hide' : '')} href="#contact"><i aria-hidden="true" /><T en="Free Booking Snapshot" es="Booking Snapshot gratis" /></a>
      <Footer />
    </>
  )
}
