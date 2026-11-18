import { useCallback, useState } from 'react'
import { T, useT } from '../lang.jsx'
import { Link } from 'react-router-dom'
import { FIXES, Footer, Header } from '../components/Chrome.jsx'
import BrainMap from '../components/BrainMap.jsx'

// What happens in a guest's head, in order, and the service that answers each step.
// x, y, w: label position on the 1280-wide desktop stage (up: y is the bottom edge, so longer text grows upwards).
// lead: the line from the dot to the label.
const STEPS = [
  {
    tag: { en: '01 attention', es: '01 atención' },
    title: { en: 'The ad', es: 'El anuncio' },
    text: { en: 'Meta ads that stop the scroll.', es: 'Anuncios en Meta que frenan el scroll.' },
    price: { en: 'Monthly, from $1,000', es: 'Mensual, desde $1,000' },
    x: 705, y: 240, w: 240, up: true, lead: { x: 687, y: 248, w: 1, h: 167 },
  },
  {
    tag: { en: '02 desire', es: '02 deseo' },
    title: { en: 'The photos', es: 'Las fotos' },
    text: { en: 'Posts, stories and print in both languages.', es: 'Posts, stories e impresos en los dos idiomas.' },
    price: { en: 'Monthly, from $1,000', es: 'Mensual, desde $1,000' },
    x: 1056, y: 610, w: 168, lead: { x: 969, y: 657, w: 79, h: 1 },
  },
  {
    tag: { en: '03 memory', es: '03 memoria' },
    title: { en: 'The brand', es: 'La marca' },
    text: { en: 'A brand they recognise at a glance.', es: 'Una marca que reconocen al instante.' },
    price: { en: 'Once, from $2,500', es: 'Una vez, desde $2,500' },
    x: 596, y: 1040, w: 260, lead: { x: 577, y: 752, w: 1, h: 286 },
  },
  {
    tag: { en: '04 decision', es: '04 decisión' },
    title: { en: 'The booking', es: 'La reserva' },
    text: { en: 'A booking page that keeps them.', es: 'Una página de reservas que no los deja ir.' },
    price: { en: 'Free, in 48 hours', es: 'Gratis, en 48 horas' },
    x: 64, y: 540, w: 158, lead: { x: 230, y: 591, w: 111, h: 1 },
  },
]

const CLIENTS = [
  {
    name: 'Ahau Collection', bg: '#123642', logo: '/clients/ahau-collection-seal-white.png', lw: 96, lh: 96,
    tag: { en: 'hotels, wellness', es: 'hoteles, bienestar' },
    text: {
      en: 'Four boutique hotels and a beach club. Brand system, campaigns, menus and social for six years.',
      es: 'Cuatro hoteles boutique y un beach club. Sistema de marca, campañas, menús y redes durante seis años.',
    },
  },
  {
    name: 'La Reserva', bg: '#868A79', logo: '/clients/la-reserva-white.png', lw: 170, lh: 57,
    tag: { en: 'real estate', es: 'bienes raíces' },
    text: {
      en: 'Branded residences. Sales brochures, website, Meta ads and broker material for three years.',
      es: 'Residencias de marca. Brochures de ventas, sitio web, anuncios en Meta y material para brokers durante tres años.',
    },
  },
  {
    name: 'Mr. Shmokey', bg: '#D78332', logo: '/clients/mr-shmokey-white.png', lw: 210, lh: 46,
    tag: { en: 'restaurant', es: 'restaurante' },
    text: {
      en: 'Smokehouse in Tulum. Menus, signage and light boxes.',
      es: 'Smokehouse en Tulum. Menús, señalética y cajas de luz.',
    },
  },
]

const pos = (o) => ({ '--x': o.x, '--y': o.y, '--w': o.w, ...(o.h ? { '--h': o.h } : {}) })

export default function Home() {
  const t = useT()
  const [active, setActive] = useState(-1)
  const onActive = useCallback((i) => setActive(i), [])

  return (
    <>
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-h">
          <div className="stage">
            <div className="hero-copy" style={pos({ x: 64, y: 40, w: 540 })}>
              <h1 id="hero-h"><T en="Before a guest books, four things happen in their head." es="Antes de reservar, a un huésped le pasan cuatro cosas por la cabeza." /></h1>
              <p><T en="Brand, content and Meta ads for hotels, wellness retreats, restaurants and real estate. In English and Spanish." es="Marca, contenido y anuncios en Meta para hoteles, retiros de bienestar, restaurantes y bienes raíces. En español e inglés." /></p>
            </div>

            <div className="map-box" style={pos({ x: 230, y: 320, w: 820 })}>
              <BrainMap
                labels={STEPS.map((s) => `${t(s.tag)}: ${t(s.title)}`)}
                active={active}
                onActive={onActive}
                alt={t({ en: 'A brain with four marked areas: attention, desire, memory and decision', es: 'Un cerebro con cuatro zonas marcadas: atención, deseo, memoria y decisión' })}
              />
            </div>

            {STEPS.map((s, i) => (
              <span key={i} className={i === active ? 'lead on' : 'lead'} style={pos(s.lead)} aria-hidden="true" />
            ))}

            <ol className={active >= 0 ? 'steps focus' : 'steps'}>
              {STEPS.map((s, i) => (
                <li
                  key={i}
                  className={`step${s.up ? ' up' : ''}${i === active ? ' on' : ''}`}
                  style={pos(s)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(-1)}
                >
                  <span className="tag">{t(s.tag)}</span>
                  <h2>{t(s.title)}</h2>
                  <p>{t(s.text)}</p>
                  <span className="price">{t(s.price)}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wrap fix-band" aria-labelledby="fix-h">
          <div className="fix-card">
            <div className="fix-text">
              <span className="tag"><T en="5 free fixes" es="5 mejoras gratis" /></span>
              <h2 id="fix-h"><T en={"Send me your links. I\u00a0send back five fixes."} es={"Mándeme sus enlaces y le\u00a0regreso cinco mejoras."} /></h2>
              <p><T en="Your ads, website and booking page, reviewed. The five changes that will matter most, in 48 hours. Free." es="Reviso sus anuncios, su sitio web y su página de reservas, y en 48 horas le digo los cinco cambios que más le van a ayudar. Sin costo." /></p>
            </div>
            <Link className="btn dark lg" to={FIXES}><T en="Find my 5 fixes" es="Quiero mis 5 mejoras" /><span className="ar" aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="clients wrap" id="work" aria-labelledby="clients-h">
          <h2 id="clients-h"><T en="Behind these brands" es="Detrás de estas marcas" /></h2>
          <ul className="cards">
            {CLIENTS.map((c) => (
              <li key={c.name} className="card">
                <div className="card-logo" style={{ background: c.bg }}>
                  <img src={c.logo} alt={c.name} width={c.lw} height={c.lh} loading="lazy" decoding="async" />
                </div>
                <div className="card-body">
                  <div className="card-hd"><h3 translate="no">{c.name}</h3><span className="tag">{t(c.tag)}</span></div>
                  <p>{t(c.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer cta />
    </>
  )
}
