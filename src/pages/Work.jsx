import { useCallback, useEffect, useRef, useState } from 'react'
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
              <div><dt className="tag">{t(w.site.k)}</dt><dd>{w.site.to
                ? <Link className="site" to={w.site.to}>{t(w.site.text)} →</Link>
                : <a className="site" href={w.site.url} target="_blank" rel="noopener noreferrer" translate="no">{w.site.text} ↗</a>}</dd></div>
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
            {s.volumes && <Volumes v={s.volumes} />}
            {s.carousel && <Carousel c={s.carousel} />}
            {s.site && <SitePreview s={s.site} />}
            {s.book && <Book b={s.book} />}
            {s.images && <div className={s.cols ? `shots c${s.cols}` : 'shots'}>
              {s.images.map((img) => img.video ? (
                <LazyVideo key={img.video} className={img.lead ? 'shot lead' : 'shot'} src={img.video} poster={img.src} width={img.w} height={img.h} label={t(img.alt)} />
              ) : (
                <img key={img.src} className="shot" src={img.src} {...srcset(img, s.cols)} width={img.w} height={img.h} alt={t(img.alt)} loading={n === 0 ? 'eager' : 'lazy'} decoding="async" />
              ))}
            </div>}
            {s.live && <p className="wp-live"><Link className="btn primary" to={s.live.to}>{t(s.live.text)}<span className="ar" aria-hidden="true">→</span></Link></p>}
          </section>
        ))}

        {w.link && <p className="wp-link"><Link to={w.link.to}>{t(w.link.text)} →</Link></p>}

        <Link className="next" to={`/work/${next.id}`}>
          <img src={next.cover.src} srcSet={`${next.cover.src.replace('.webp', '-900.webp')} 900w, ${next.cover.src} 1400w`} sizes="(max-width: 640px) 100vw, 420px" width="1400" height="713" alt="" loading="lazy" decoding="async" />
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
          <img key={i} src={t(sl)} width={c.w} height={c.h} style={{ aspectRatio: `${c.w} / ${c.h}` }} alt={t(c.alts[i])} loading="lazy" decoding="async" />
        ))}
      </div>
      <div className="car-nav">
        <button type="button" onClick={() => go(-1)} aria-label={t({ en: 'Previous card', es: 'Tarjeta anterior' })}>←</button>
        <button type="button" onClick={() => go(1)} aria-label={t({ en: 'Next card', es: 'Tarjeta siguiente' })}>→</button>
      </div>
    </div>
  )
}

/** The client's home page in a browser window, scrolled inside the window. */
function SitePreview({ s }) {
  const t = useT()
  return (
    <figure className="sp">
      <div className="sp-bar" aria-hidden="true"><i /><i /><i /><span>{s.url}</span></div>
      <div className="sp-scr" tabIndex="0" aria-label={t({ en: 'Website preview, scrollable', es: 'Vista del sitio, con desplazamiento' })}>
        <img src={s.src} width={s.w} height={s.h} alt={t(s.alt)} loading="lazy" decoding="async" />
      </div>
    </figure>
  )
}

/** A brochure you leaf through: the right page turns over the spine like paper. */
function Book({ b }) {
  const t = useT()
  const base = t(b.src)
  const page = (i) => `${base}${String(i + 1).padStart(2, '0')}.webp`
  const [cur, setCur] = useState(0)
  const [turn, setTurn] = useState(null) // { dir: 1 | -1, to }
  const box = useRef(null)
  const startX = useRef(null)
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // keep the pages either side ready so a turn never shows a blank sheet
  useEffect(() => {
    ;[cur - 1, cur + 1, cur + 2].forEach((i) => { if (i >= 0 && i < b.pages) { const im = new Image(); im.src = page(i) } })
  }, [cur, base]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback((dir) => {
    if (turn) return
    const to = cur + dir
    if (to < 0 || to >= b.pages) return
    if (still) { setCur(to); return }
    setTurn({ dir, to })
  }, [cur, turn, b.pages, still])

  const done = () => { if (turn) { setCur(turn.to); setTurn(null) } }

  const L = turn ? (turn.dir > 0 ? cur : turn.to) : cur
  const R = turn ? (turn.dir > 0 ? turn.to : cur) : cur
  const bg = (i, side) => ({ backgroundImage: `url(${page(i)})`, backgroundPosition: side === 'l' ? '0 0' : '100% 0' })

  const full = () => {
    const el = box.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.().then(() => screen.orientation?.lock?.('landscape').catch(() => {})).catch(() => {})
  }

  return (
    <div className="bk" ref={box}>
      <div
        className="bk-spread"
        role="group"
        aria-roledescription={t({ en: 'brochure', es: 'brochure' })}
        aria-label={t({ en: `Page ${cur + 1} of ${b.pages}`, es: `Página ${cur + 1} de ${b.pages}` })}
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
        onPointerDown={(e) => { startX.current = e.clientX }}
        onPointerUp={(e) => {
          if (startX.current == null) return
          const dx = e.clientX - startX.current
          startX.current = null
          if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); return }
          const r = e.currentTarget.getBoundingClientRect()
          go(e.clientX - r.left > r.width / 2 ? 1 : -1)
        }}
      >
        <div className="bk-half l" style={bg(L, 'l')} />
        <div className="bk-half r" style={bg(R, 'r')} />
        {turn && (
          <div className={turn.dir > 0 ? 'bk-leaf fwd' : 'bk-leaf back'} onAnimationEnd={done}>
            <div className="bk-face" style={turn.dir > 0 ? bg(cur, 'r') : bg(cur, 'l')} />
            <div className="bk-face bk-rev" style={turn.dir > 0 ? bg(turn.to, 'l') : bg(turn.to, 'r')} />
          </div>
        )}
        <div className="bk-spine" aria-hidden="true" />
        <img className="bk-sr" src={page(cur)} alt="" width={b.w} height={b.h} />
      </div>
      <div className="bk-nav">
        <button type="button" onClick={() => go(-1)} disabled={cur === 0} aria-label={t({ en: 'Previous page', es: 'Página anterior' })}>←</button>
        <span className="tag dim" aria-live="polite">{String((turn ? turn.to : cur) + 1).padStart(2, '0')} / {b.pages}</span>
        <button type="button" onClick={() => go(1)} disabled={cur === b.pages - 1} aria-label={t({ en: 'Next page', es: 'Página siguiente' })}>→</button>
        <button type="button" className="bk-full" onClick={full}><T en="Full screen" es="Pantalla completa" /></button>
      </div>
    </div>
  )
}

/** Story slots for a series: a muted loop where the volume exists, an empty frame where it is still to come. */
export function Volumes({ v }) {
  const t = useT()
  return (
    <ol className="vols">
      {v.map((x) => (
        <li key={x.n} className={x.video ? 'vol' : 'vol empty'}>
          {x.video
            ? <LazyVideo className="vol-media" src={x.video} poster={x.poster} width="720" height="1280" label={t(x.alt)} />
            : <div className="vol-media" aria-hidden="true"><span>{x.n}</span></div>}
          <span className="vol-nm"><span className="tag">Vol {x.n}</span> <span translate="no">{t(x.name)}</span></span>
          {x.note && <span className="vol-tx">{t(x.note)}</span>}
        </li>
      ))}
    </ol>
  )
}

/** Images 1400 px and wider also ship a 900 px copy (name-900.webp) for phones. */
function srcset(img, cols) {
  if (!img.w || img.w < 1400) return {}
  const small = img.src.replace(/\.webp$/, '-900.webp')
  return { srcSet: `${small} 900w, ${img.src} ${img.w}w`, sizes: cols ? `(max-width: 640px) 100vw, ${Math.round(1152 / cols)}px` : '(max-width: 1200px) 100vw, 1152px' }
}

/** A muted story loop that only starts downloading when it is about to scroll into view. */
export function LazyVideo({ src, poster, label, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setOn(true); io.disconnect() } }, { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={on ? src : undefined} poster={poster} aria-label={label} autoPlay muted loop playsInline preload="none" {...rest} />
}
