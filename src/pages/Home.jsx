import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { T, useT } from '../lang.jsx'
import { REVIEW, Footer, Header } from '../components/Chrome.jsx'
import BrainMap from '../components/BrainMap.jsx'
import { ALSO, WORK } from '../work.js'

// What happens in a customer's head, in order, and the service that answers each step
const STEPS = [
  {
    tag: { en: '01 attention', es: '01 atención' },
    title: { en: 'The ad', es: 'El anuncio' },
    text: { en: 'Ads and signs that make people stop.', es: 'Anuncios y letreros que hacen que la gente se detenga.' },
  },
  {
    tag: { en: '02 desire', es: '02 deseo' },
    title: { en: 'The content', es: 'El contenido' },
    text: { en: 'Posts, stories and print in both languages.', es: 'Posts, stories e impresos en los dos idiomas.' },
  },
  {
    tag: { en: '03 memory', es: '03 memoria' },
    title: { en: 'The brand', es: 'La marca' },
    text: { en: 'A brand they recognise at a glance.', es: 'Una marca que reconocen al instante.' },
  },
  {
    tag: { en: '04 decision', es: '04 decisión' },
    title: { en: 'The website', es: 'El sitio web' },
    text: { en: 'A website that makes the yes easy.', es: 'Un sitio que les facilita decir que sí.' },
  },
]

export default function Home() {
  const t = useT()
  const [active, setActive] = useState(-1)
  const onActive = useCallback((i) => setActive(i), [])
  const { hash } = useLocation()
  const heroRef = useRef(null)

  // On wide screens, line the middle of the text up with the middle of the whole right side
  // (the brain plus the free review under it). Whichever is shorter moves down.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const copy = hero.querySelector('.hero-copy')
    const map = hero.querySelector('.map')
    const walk = hero.querySelector('.walk')
    const wide = window.matchMedia('(min-width: 960px)')
    const fit = () => {
      hero.style.removeProperty('--copy-shift')
      hero.style.removeProperty('--map-shift')
      if (!wide.matches) return
      const d = (map.offsetHeight + walk.offsetHeight - copy.offsetHeight) / 2
      if (d >= 0) hero.style.setProperty('--copy-shift', `${d}px`)
      else hero.style.setProperty('--map-shift', `${-d}px`)
    }
    const ro = new ResizeObserver(fit)
    ro.observe(copy); ro.observe(map); ro.observe(walk)
    wide.addEventListener('change', fit)
    return () => { ro.disconnect(); wide.removeEventListener('change', fit) }
  }, [])

  // Coming back from a project page with /#work: land on the cards, not the top
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <>
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header />
      <main id="main">
        <section className="hero wrap" ref={heroRef} aria-labelledby="hero-h">
          <div className="hero-copy">
            <h1 id="hero-h"><T en="Before anyone says yes, four things happen in their head." es="Antes de decir que sí, a cualquiera le pasan cuatro cosas por la cabeza." /></h1>
            <p className="hero-sub"><T en="Brand, content, websites and Meta ads, in English and Spanish. Most of my work is for hotels, restaurants and real estate in Tulum." es="Marca, contenido, sitios web y anuncios en Meta, en español e inglés. La mayor parte de mi trabajo es para hoteles, restaurantes y bienes raíces en Tulum." /></p>
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
                <span className="tag"><T en="Free review" es="Revisión gratuita" /></span>
                <h2><T en="See your brand the way a new customer does." es="Vea su marca como la ve un cliente nuevo." /></h2>
                <p><T en="I go through your ads, website and social as a new customer would, and show you where they hesitate or leave. In 24 hours, free." es="Reviso sus anuncios, su sitio web y sus redes como lo haría un cliente nuevo, y le señalo dónde duda o se va. En 24 horas, sin costo." /></p>
              </div>
              <Link className="btn primary" to={REVIEW}><T en="Get my free review" es="Quiero mi revisión" /><span className="ar" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="work wrap" id="work" aria-labelledby="work-h">
          <h2 id="work-h"><T en="Behind these brands" es="Detrás de estas marcas" /></h2>
          <ul className="cards">
            {WORK.map((w) => (
              <li key={w.id}>
                <Link className="wc" to={`/work/${w.id}`}>
                  <img src={w.cover.src} srcSet={`${w.cover.src.replace('.webp', '-900.webp')} 900w, ${w.cover.src} 1400w`} sizes="(max-width: 640px) 100vw, 560px" width="1400" height="713" alt={t(w.cover.alt)} loading="lazy" decoding="async" />
                  <span className="ttl"><h3 translate="no">{w.name}</h3></span>
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
                  <img src={a.src} width="1080" height="1080" sizes="(max-width: 900px) 50vw, 264px" alt="" loading="lazy" decoding="async" />
                  <span className="also-nm"><span translate="no">{a.name}</span>{a.place && <> <span className="dim">{t(a.place)}</span></>}</span>
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
