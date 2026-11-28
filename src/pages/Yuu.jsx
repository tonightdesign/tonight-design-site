import { useCallback, useEffect, useRef, useState } from 'react'
import { T, useT } from '../lang.jsx'
import { Header } from '../components/Chrome.jsx'
import '../yuu.css'

// YUU Temaki + HiFi Bar, soft opening 27.11.26. Client delivery page: unlisted, noindex.
// Originals sit behind the Worker (worker/yuu.js); this page only shows web copies.
const PHOTOS = [
  { src: '/work/yuu/yuu-01.webp', w: 1400, h: 2489 },
  { src: '/work/yuu/yuu-02.webp', w: 1400, h: 2488 },
  { src: '/work/yuu/yuu-03.webp', w: 1400, h: 2489 },
  { src: '/work/yuu/yuu-04.webp', w: 1400, h: 2489 },
  { src: '/work/yuu/yuu-05.webp', w: 1400, h: 1867 },
]
// Desktop rows: three, then two. Each row shares one height.
const ROWS = [[0, 1, 2], [3, 4]]

const small = (src) => src.replace('.webp', '-900.webp')

function useNoIndex(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex, nofollow'
    document.head.appendChild(m)
    return () => { document.title = prev; m.remove() }
  }, [title])
}

function Download() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [pw, setPw] = useState('')
  const [state, setState] = useState('idle') // idle | busy | wrong | done | error
  const input = useRef(null)

  useEffect(() => { if (open) input.current?.focus() }, [open])

  async function submit(e) {
    e.preventDefault()
    if (!pw.trim()) return
    setState('busy')
    try {
      const res = await fetch('/api/yuu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (res.status === 401) { setState('wrong'); input.current?.select(); return }
      const data = await res.json()
      if (!data.ok) throw new Error()
      setState('done')
      window.location.href = data.url
    } catch {
      setState('error')
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn primary yuu-dl" onClick={() => setOpen(true)}>
        <T en="Download files" es="Descargar archivos" /><span className="ar" aria-hidden="true">↓</span>
      </button>
    )
  }

  return (
    <form className="yuu-pw" onSubmit={submit}>
      <label className="sr" htmlFor="yuu-pw">{t({ en: 'Password', es: 'Contraseña' })}</label>
      <input
        ref={input}
        id="yuu-pw"
        type="password"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck="false"
        placeholder={t({ en: 'Password', es: 'Contraseña' })}
        value={pw}
        onChange={(e) => { setPw(e.target.value); if (state === 'wrong') setState('idle') }}
        aria-invalid={state === 'wrong'}
        aria-describedby="yuu-msg"
      />
      <button type="submit" className="btn primary" disabled={state === 'busy'}>
        {state === 'done'
          ? <T en="Downloading" es="Descargando" />
          : <><T en="Download" es="Descargar" /><span className="ar" aria-hidden="true">↓</span></>}
      </button>
      <p id="yuu-msg" className="yuu-msg" role="status">
        {state === 'wrong' && <T en="Wrong password" es="Contraseña incorrecta" />}
        {state === 'error' && <T en="Something went wrong, try again" es="Algo salió mal, intente de nuevo" />}
      </p>
    </form>
  )
}

function Lightbox({ index, onClose, onStep }) {
  const close = useRef(null)
  const startX = useRef(null)
  useEffect(() => {
    close.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [onClose, onStep])
  const p = PHOTOS[index]
  return (
    <div
      className="yuu-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${index + 1} / ${PHOTOS.length}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onTouchStart={(e) => { startX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (startX.current == null) return
        const dx = e.changedTouches[0].clientX - startX.current
        if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1)
        startX.current = null
      }}
    >
      <img src={p.src} width={p.w} height={p.h} alt="" onClick={onClose} />
      <button type="button" className="yuu-lb-x" ref={close} onClick={onClose} aria-label="Close">×</button>
      <button type="button" className="yuu-lb-nav yuu-prev" onClick={() => onStep(-1)} aria-label="Previous">←</button>
      <button type="button" className="yuu-lb-nav yuu-next" onClick={() => onStep(1)} aria-label="Next">→</button>
      <span className="yuu-lb-n" aria-hidden="true">{index + 1} / {PHOTOS.length}</span>
    </div>
  )
}

export default function Yuu() {
  useNoIndex('YUU · tonight.design')
  const [lb, setLb] = useState(null)
  const step = useCallback((d) => setLb((i) => (i + d + PHOTOS.length) % PHOTOS.length), [])
  const closeLb = useCallback(() => setLb(null), [])

  return (
    <div className="yuu">
      <Header simple />
      <main id="main" className="wrap yuu-main">
        <div className="yuu-hd">
          <div>
            <h1 translate="no">YUU</h1>
            <p className="yuu-sub"><span translate="no">Temaki + HiFi Bar</span> · Soft opening 27.11.26</p>
          </div>
          <Download />
        </div>

        <div className="yuu-grid">
          {ROWS.map((row, r) => (
            <div className="yuu-row" key={r}>
              {row.map((i) => {
                const p = PHOTOS[i]
                const ar = p.w / p.h
                return (
                  <button
                    type="button"
                    key={i}
                    className="yuu-ph"
                    style={{ '--ar': ar }}
                    onClick={() => setLb(i)}
                    aria-label={`${i + 1} / ${PHOTOS.length}`}
                  >
                    <img
                      src={p.src}
                      srcSet={`${small(p.src)} 900w, ${p.src} 1400w`}
                      sizes={`(max-width: 699px) 100vw, ${row.length === 3 ? 400 : 560}px`}
                      width={p.w}
                      height={p.h}
                      alt=""
                      loading={r === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </main>
      {lb !== null && <Lightbox index={lb} onClose={closeLb} onStep={step} />}
    </div>
  )
}
