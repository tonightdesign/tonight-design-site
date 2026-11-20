import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { T, useT } from '../lang.jsx'
import { Footer, Header } from '../components/Chrome.jsx'
import { WORK } from '../work.js'
import NotFound from './NotFound.jsx'

/** One brand's page: what it is, what I made, the pieces, then the next brand on the path. */
export default function Work() {
  const { id } = useParams()
  const t = useT()
  const i = WORK.findIndex((w) => w.id === id)
  const w = WORK[i]
  const next = WORK[(i + 1) % WORK.length]

  useEffect(() => {
    if (!w) return
    window.scrollTo(0, 0)
    const before = document.title
    document.title = `${w.name} · tonight.design`
    return () => { document.title = before }
  }, [w])

  if (!w) return <NotFound />

  return (
    <>
      <a className="skip" href="#main"><T en="Skip to content" es="Ir al contenido" /></a>
      <Header />
      <main id="main" className="wp wrap">
        <Link className="back" to="/#work">← <T en="All work" es="Todo el trabajo" /></Link>
        <div className="wp-head">
          <div className="wp-title">
            <h1 translate="no">{w.name}</h1>
            <p className="wp-line">{t(w.line)}</p>
            <p className="wp-intro">{t(w.intro)}</p>
          </div>
          <dl className="facts">
            {w.facts.map((f) => (
              <div key={f.k.en}><dt className="tag">{t(f.k)}</dt><dd>{t(f.v)}</dd></div>
            ))}
            {w.site && (
              <div><dt className="tag">{t(w.site.k)}</dt><dd><a className="site" href={w.site.url} target="_blank" rel="noopener noreferrer" translate="no">{w.site.text} ↗</a></dd></div>
            )}
          </dl>
        </div>

        {w.sections.map((s, n) => (
          <section className="wp-sec" key={n} aria-label={s.title ? t(s.title) : w.name}>
            {s.title && (
              <div className="wp-sec-hd">
                <h2>{t(s.title)}</h2>
                {s.text && <p>{t(s.text)}</p>}
              </div>
            )}
            {s.carousel && <Carousel c={s.carousel} />}
            {s.images && <div className={s.cols ? `shots c${s.cols}` : 'shots'}>
              {s.images.map((img) => img.video ? (
                <video key={img.video} className={img.lead ? 'shot lead' : 'shot'} src={img.video} poster={img.src} width={img.w} height={img.h} aria-label={t(img.alt)} autoPlay muted loop playsInline preload="metadata" />
              ) : (
                <img key={img.src} className="shot" src={img.src} width={img.w} height={img.h} alt={t(img.alt)} loading={n === 0 ? 'eager' : 'lazy'} decoding="async" />
              ))}
            </div>}
          </section>
        ))}

        {w.link && <p className="wp-link"><Link to={w.link.to}>{t(w.link.text)} →</Link></p>}

        <Link className="next" to={`/work/${next.id}`}>
          <img src={next.cover.src} width="1400" height="713" alt="" loading="lazy" decoding="async" />
          <span className="next-tx">
            <span className="tag dim"><T en="Next project" es="Siguiente proyecto" /></span>
            <span className="next-nm" translate="no">{next.name}</span>
            <span className="next-ln">{t(next.line)}</span>
          </span>
          <span className="next-ar" aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer cta />
    </>
  )
}

/** An ad carousel the way it runs in the feed: swipe on a phone, arrows on a computer. */
function Carousel({ c }) {
  const t = useT()
  const row = useRef(null)
  const go = (d) => {
    const el = row.current
    if (!el) return
    const card = el.querySelector('img')
    el.scrollBy({ left: d * (card ? card.offsetWidth + 16 : el.clientWidth), behavior: 'smooth' })
  }
  return (
    <div className="car">
      <div className="car-row" ref={row} tabIndex="0" aria-label={t({ en: 'Ad carousel, scroll sideways', es: 'Carrusel de anuncios, desplace hacia los lados' })}>
        {c.slides.map((sl, i) => (
          <img key={i} src={t(sl)} width={c.w} height={c.h} alt={t(c.alts[i])} loading="lazy" decoding="async" />
        ))}
      </div>
      <div className="car-nav">
        <button type="button" onClick={() => go(-1)} aria-label={t({ en: 'Previous card', es: 'Tarjeta anterior' })}>←</button>
        <button type="button" onClick={() => go(1)} aria-label={t({ en: 'Next card', es: 'Tarjeta siguiente' })}>→</button>
      </div>
    </div>
  )
}
