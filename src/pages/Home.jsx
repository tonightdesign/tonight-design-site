import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { T, useT } from '../lang.jsx'
import { WALK, Footer, Header } from '../components/Chrome.jsx'
import BrainMap from '../components/BrainMap.jsx'
import { ALSO, WORK } from '../work.js'

// What happens in a guest's head, in order, and the service that answers each step
const STEPS = [
  {
    tag: { en: '01 attention', es: '01 atención' },
    title: { en: 'The ad', es: 'El anuncio' },
    text: { en: 'Ads and signs that make them stop.', es: 'Anuncios y letreros que los hacen detenerse.' },
  },
  {
    tag: { en: '02 desire', es: '02 deseo' },
    title: { en: 'The photos', es: 'Las fotos' },
    text: { en: 'Posts, stories and print in both languages.', es: 'Posts, stories e impresos en los dos idiomas.' },
  },
  {
    tag: { en: '03 memory', es: '03 memoria' },
    title: { en: 'The brand', es: 'La marca' },
    text: { en: 'A brand they recognise at a glance.', es: 'Una marca que reconocen al instante.' },
  },
  {
    tag: { en: '04 decision', es: '04 decisión' },
    title: { en: 'The booking', es: 'La reserva' },
    text: { en: 'A booking page that keeps them.', es: 'Una página de reservas que no los deja ir.' },
  },
]

export default function Home() {
  const t = useT()
  const [active, setActive] = useState(-1)
  const onActive = useCallback((i) => setActive(i), [])
  const { hash } = useLocation()

  // Coming back from a project page with /#work: land on the cards, not the top
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <>
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-h">
          <div className="hero-copy">
            <h1 id="hero-h"><T en="Before a guest books, four things happen in their head." es="Antes de reservar, a un huésped le pasan cuatro cosas por la cabeza." /></h1>
            <p className="hero-sub"><T en="Brand, content and Meta ads for hotels, wellness retreats, restaurants and real estate. In English and Spanish." es="Marca, contenido y anuncios en Meta para hoteles, retiros de bienestar, restaurantes y bienes raíces. En español e inglés." /></p>
            <ol className={active >= 0 ? 'steps focus' : 'steps'}>
              {STEPS.map((s, i) => (
                <li
                  key={i}
                  className={i === active ? 'step on' : 'step'}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(-1)}
                >
                  <span className="tag">{t(s.tag)}</span>
                  <h2>{t(s.title)}</h2>
                  <p>{t(s.text)}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="map-box">
            <BrainMap
              labels={STEPS.map((s) => `${t(s.tag)}: ${t(s.title)}`)}
              active={active}
              onActive={onActive}
              alt={t({ en: 'A brain with four marked areas: attention, desire, memory and decision', es: 'Un cerebro con cuatro zonas marcadas: atención, deseo, memoria y decisión' })}
            />
            <div className={active === 3 ? 'walk on' : 'walk'}>
              <div className="walk-tx">
                <span className="tag"><T en="Guest walkthrough" es="Recorrido como huésped" /></span>
                <h2><T en="Follow your guest from ad to booking." es="Siga a su huésped del anuncio a la reserva." /></h2>
                <p><T en="I go through your ads, website and booking page as a guest would, and show you where they drop off. 48 hours, no cost." es="Reviso sus anuncios, su sitio web y su página de reservas como lo haría un huésped, y le muestro en qué punto se van. En 48 horas, sin costo." /></p>
              </div>
              <Link className="btn primary" to={WALK}><T en="Book a walkthrough" es="Pedir mi recorrido" /><span className="ar" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="work wrap" id="work" aria-labelledby="work-h">
          <h2 id="work-h"><T en="Behind these brands" es="Detrás de estas marcas" /></h2>
          <ul className="cards">
            {WORK.map((w) => (
              <li key={w.id}>
                <Link className="wc" to={`/work/${w.id}`}>
                  <img src={w.cover.src} width="1200" height="900" alt={t(w.cover.alt)} loading="lazy" decoding="async" />
                  <span className="ttl"><h3 translate="no">{w.name}</h3><span className="tag">{t(w.step)}</span></span>
                  <span className="ln">{t(w.line)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="also">
            <span className="tag dim"><T en="Also" es="También" /></span>
            <ul>
              {ALSO.map((a) => (
                <li key={a.name}>
                  <img src={a.src} width="1200" height="900" alt="" loading="lazy" decoding="async" />
                  <span className="also-nm"><span translate="no">{a.name}</span> <span className="dim">{t(a.place)}</span></span>
                  <span className="also-tx">{t(a.text)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer cta />
    </>
  )
}
