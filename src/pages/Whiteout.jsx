import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { T, useT } from '../lang.jsx'
import { LangSwitch } from '../components/Chrome.jsx'
import WhiteoutOrb from '../components/WhiteoutOrb.jsx'
import { LazyVideo } from './Work.jsx'
import { VOLUMES } from '../work.js'
import '../whiteout.css'

/*
  Whiteout Sessions, the event site. A concept: the banner at the top and the footer say so,
  and the tickets are shown but not sold. Acts, venue and dates are part of the concept.
*/
const DATES = ['09.01.27', '23.01.27', '06.02.27', '20.02.27', '06.03.27']

const SETS = [
  { time: '22:00', act: 'Kori Tapes' },
  { time: '00:00', act: 'Hoshi System' },
  { time: '02:00', act: 'Last Lift' },
  { time: '04:00', act: { en: 'Closing set, til sunrise', es: 'Set de cierre, hasta el amanecer' } },
]

const TICKETS = [
  { name: { en: 'First chair', es: 'Primera silla' }, text: { en: 'The first hundred tickets for each night.', es: 'Los primeros cien boletos de cada noche.' } },
  { name: { en: 'Night', es: 'Noche' }, text: { en: 'One night, doors at 22:00.', es: 'Una noche, puertas a las 22:00.' } },
  { name: { en: 'Season', es: 'Temporada' }, text: { en: 'All five volumes, January to March.', es: 'Los cinco volúmenes, de enero a marzo.' } },
]

export default function Whiteout() {
  const t = useT()

  useEffect(() => {
    window.scrollTo(0, 0)
    const before = document.title
    document.title = 'Whiteout Sessions · a concept by tonight.design'
    return () => { document.title = before }
  }, [])

  return (
    <div className="wo">
      <a className="skip" href="#wo-main"><T en="Skip to content" es="Ir al contenido" /></a>
      <p className="wo-note">
        <span><T en="A concept by tonight.design. Not a real event." es="Un concepto de tonight.design. No es un evento real." /></span>
        <Link to="/work/whiteout-sessions"><T en="About the project" es="Sobre el proyecto" /> →</Link>
      </p>

      <header className="wo-hd">
        <a className="wo-brand" href="#top" translate="no">WHITEOUT SESSIONS</a>
        <nav aria-label={t({ en: 'Sections', es: 'Secciones' })}>
          <a href="#volumes"><T en="Volumes" es="Volúmenes" /></a>
          <a href="#lineup"><T en="Lineup" es="Lineup" /></a>
          <a href="#tickets"><T en="Tickets" es="Boletos" /></a>
        </nav>
        <LangSwitch />
      </header>

      <main id="wo-main">
        <section className="wo-hero" id="top" aria-labelledby="wo-h">
          <WhiteoutOrb label={t({ en: 'A snowboarder riding the inside wall of a spinning sphere of light dots', es: 'Un snowboarder sobre la pared interior de una esfera de puntos de luz que gira' })} />
          <h1 id="wo-h" translate="no">WHITEOUT SESSIONS</h1>
          <div className="wo-meta">
            <p><T en="Five nights of electronic music" es="Cinco noches de música electrónica" /></p>
            <p>Hirafu, Niseko</p>
            <p><T en="January to March 2027" es="Enero a marzo 2027" /></p>
            <a className="wo-btn" href="#tickets"><T en="Tickets" es="Boletos" /> <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="wo-sec" id="volumes" aria-labelledby="wo-vol">
          <div className="wo-sec-hd">
            <h2 id="wo-vol"><T en="Volumes" es="Volúmenes" /></h2>
            <p><T en="One night every second Saturday, each with its own light form and its own track." es="Una noche cada dos sábados, cada una con su propia forma de luz y su propia pista." /></p>
          </div>
          <Volumes t={t} />
        </section>

        <section className="wo-sec" id="lineup" aria-labelledby="wo-line">
          <div className="wo-sec-hd">
            <h2 id="wo-line"><T en="Next night" es="Próxima noche" /></h2>
            <p><T en="Vol 02, Floodlight. Saturday 23 January, Lift 3 Hall." es="Vol 02, Floodlight. Sábado 23 de enero, Lift 3 Hall." /></p>
          </div>
          <ol className="wo-sets">
            {SETS.map((s) => (
              <li key={s.time}><span className="wo-mono">{s.time}</span><span className="wo-act" translate={typeof s.act === 'string' ? 'no' : undefined}>{t(s.act)}</span></li>
            ))}
          </ol>
          <p className="wo-venue"><T en="Lift 3 Hall sits at the base of the Hirafu lifts. Doors open when the night skiing closes." es="Lift 3 Hall está al pie de los telesillas de Hirafu. Las puertas abren cuando cierra el esquí nocturno." /></p>
        </section>

        <section className="wo-sec" id="tickets" aria-labelledby="wo-tix">
          <div className="wo-sec-hd">
            <h2 id="wo-tix"><T en="Tickets" es="Boletos" /></h2>
            <p><T en="This is a concept, so nothing is on sale." es="Es un concepto, así que nada está a la venta." /></p>
          </div>
          <ul className="wo-tix">
            {TICKETS.map((x) => (
              <li key={x.name.en}>
                <span className="wo-tix-nm">{t(x.name)}</span>
                <span className="wo-dim">{t(x.text)}</span>
                <span className="wo-tag"><T en="Not on sale" es="No a la venta" /></span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="wo-ft">
        <p><T en="Whiteout Sessions is a self-initiated concept. Photography, identity, motion and this site by tonight.design." es="Whiteout Sessions es un concepto propio. Fotografía, identidad, motion y este sitio por tonight.design." /></p>
        <div className="wo-ft-links">
          <Link to="/work/whiteout-sessions"><T en="The project" es="El proyecto" /> →</Link>
          <Link to="/" translate="no">tonight.design →</Link>
        </div>
      </footer>
    </div>
  )
}

/*
  The flyers, with sound. Nothing plays until the visitor presses the sound button once
  (browsers block sound before a click anyway). Then, on a computer, a flyer plays its track
  while the pointer is on it, picked up at the same moment as the video. On a phone there is
  no hover: the button starts the flyer most in view, and a tap on another flyer switches to it.
  Only one track ever plays. The videos stay muted, silent loops; the sound is a separate file,
  so a tap never opens a video player.
*/
const FADE = 220

function Volumes({ t }) {
  const hasSound = VOLUMES.some((v) => v.audio)
  const [sound, setSound] = useState(false)
  const [playing, setPlaying] = useState(null) // index of the flyer playing
  const items = useRef([]) // { li, audio }
  const fades = useRef({})
  const hover = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches)

  const fadeTo = (i, target, then) => {
    const a = items.current[i]?.audio
    if (!a) return
    clearInterval(fades.current[i])
    const step = (target - a.volume) / (FADE / 20)
    fades.current[i] = setInterval(() => {
      const v = a.volume + step
      if ((step >= 0 && v >= target) || (step < 0 && v <= target)) {
        a.volume = target; clearInterval(fades.current[i]); then && then()
      } else a.volume = Math.min(1, Math.max(0, v))
    }, 20)
  }

  const stop = useCallback((i) => {
    const a = items.current[i]?.audio
    if (!a) return
    fadeTo(i, 0, () => a.pause())
    setPlaying((p) => (p === i ? null : p))
  }, [])

  const start = useCallback((i) => {
    const it = items.current[i]
    if (!it?.audio) return
    items.current.forEach((_, j) => { if (j !== i) stop(j) })
    const video = it.li.querySelector('video')
    const a = it.audio
    if (video && a.duration) a.currentTime = video.currentTime % a.duration
    a.volume = 0
    a.play().then(() => { fadeTo(i, 1); setPlaying(i) }).catch(() => {})
  }, [stop])

  const mostInView = () => {
    let best = null, area = 0
    items.current.forEach((it, i) => {
      if (!it?.audio) return
      const r = it.li.getBoundingClientRect()
      const seen = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) * Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0))
      if (seen > area) { area = seen; best = i }
    })
    return best
  }

  const toggle = () => {
    if (sound) {
      items.current.forEach((_, i) => stop(i))
      setSound(false)
      return
    }
    setSound(true)
    items.current.forEach((it) => it?.audio && (it.audio.preload = 'auto'))
    if (!hover.current) { const i = mostInView(); if (i != null) start(i) }
  }

  // stop everything when the tab is hidden or the page is left
  useEffect(() => {
    const off = () => { if (document.hidden) items.current.forEach((_, i) => stop(i)) }
    document.addEventListener('visibilitychange', off)
    return () => { document.removeEventListener('visibilitychange', off); items.current.forEach((it) => it?.audio?.pause()) }
  }, [stop])

  return (
    <>
      {hasSound && (
        <div className="wo-sound">
          <button type="button" className={sound ? 'wo-sound-btn on' : 'wo-sound-btn'} aria-pressed={sound} onClick={toggle}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
              {sound ? <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></> : <><path d="M17 9l5 6" /><path d="M22 9l-5 6" /></>}
            </svg>
            {sound ? <T en="Sound on" es="Sonido activado" /> : <T en="Turn sound on" es="Activar sonido" />}
          </button>
          <span className="wo-dim">
            {hover.current
              ? <T en="Then point at a flyer to hear its track." es="Luego pase el cursor sobre un flyer para escuchar su pista." />
              : <T en="Then tap a flyer to hear its track." es="Luego toque un flyer para escuchar su pista." />}
          </span>
        </div>
      )}
      <ol className="wo-vols">
        {VOLUMES.map((v, i) => (
          <li
            key={v.n}
            ref={(el) => { items.current[i] = { ...(items.current[i] || {}), li: el } }}
            className={[v.video ? 'wo-vol' : 'wo-vol empty', playing === i ? 'is-playing' : ''].join(' ').trim()}
            onPointerEnter={(e) => { if (sound && v.audio && e.pointerType === 'mouse') start(i) }}
            onPointerLeave={(e) => { if (v.audio && e.pointerType === 'mouse') stop(i) }}
            onClick={() => { if (!sound || !v.audio || hover.current) return; playing === i ? stop(i) : start(i) }}
          >
            <div className="wo-vol-box">
              {v.video
                ? <LazyVideo className="wo-vol-media" src={v.video} poster={v.poster} width="720" height="1280" label={t(v.alt)} />
                : <div className="wo-vol-media" aria-hidden="true"><span>{v.n}</span></div>}
              {v.audio && sound && (
                <span className="wo-eq" aria-hidden="true"><i /><i /><i /></span>
              )}
            </div>
            {v.audio && (
              <audio
                ref={(el) => { items.current[i] = { ...(items.current[i] || {}), audio: el } }}
                src={v.audio}
                loop
                preload="none"
              />
            )}
            <div className="wo-vol-tx">
              <span className="wo-mono">VOL {v.n} · {DATES[i]}</span>
              <span className="wo-vol-nm" translate="no">{t(v.name)}</span>
              {v.note && <span className="wo-dim">{t(v.note)}</span>}
              {v.listen && (
                <a className="wo-listen" href={v.listen} target="_blank" rel="noopener noreferrer">
                  <T en="Hear the original" es="Escuchar el original" /> ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
