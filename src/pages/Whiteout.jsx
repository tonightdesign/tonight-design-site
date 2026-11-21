import { useEffect } from 'react'
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
          <ol className="wo-vols">
            {VOLUMES.map((v, i) => (
              <li key={v.n} className={v.video ? 'wo-vol' : 'wo-vol empty'}>
                {v.video
                  ? <LazyVideo className="wo-vol-media" src={v.video} poster={v.poster} width="720" height="1280" label={t(v.alt)} />
                  : <div className="wo-vol-media" aria-hidden="true"><span>{v.n}</span></div>}
                <div className="wo-vol-tx">
                  <span className="wo-mono">VOL {v.n} · {DATES[i]}</span>
                  <span className="wo-vol-nm" translate="no">{t(v.name)}</span>
                  {v.note && <span className="wo-dim">{t(v.note)}</span>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="wo-sec" id="lineup" aria-labelledby="wo-line">
          <div className="wo-sec-hd">
            <h2 id="wo-line"><T en="Next night" es="Próxima noche" /></h2>
            <p><T en="Vol 02, XTAL. Saturday 23 January, Lift 3 Hall." es="Vol 02, XTAL. Sábado 23 de enero, Lift 3 Hall." /></p>
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
