import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { T, useLang } from '../lang.jsx'

export const CONTACT = {
  email: 'julian@tonight.design',
  whatsapp: '+352 621 585 610',
  waLink: 'https://wa.me/352621585610',
}

export const WALK = '/brief/walkthrough'

export function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
    </div>
  )
}

export function Header({ simple = false }) {
  return (
    <header>
      <div className="wrap hd">
        <Link className="brand" to="/" aria-label="tonight.design, home">
          <img src="/img/brain-disc.png" alt="" width="30" height="30" /><span translate="no">tonight.design</span>
        </Link>
        <div className="right">
          <LangSwitch />
          {!simple && (
            <Link className="btn primary sm" to="/brief"><T en="Start a project" es="Iniciar un proyecto" /></Link>
          )}
        </div>
      </div>
    </header>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    </svg>
  )
}

function useTulumTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Cancun' })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return time
}

/** Site footer. With cta, it carries the "Where are you losing guests?" block. */
export function Footer({ cta = false }) {
  const time = useTulumTime()
  return (
    <footer className={cta ? 'ft ft-cta' : 'ft'}>
      <div className="wrap ft-in">
        {cta && (
          <div className="ft-ask">
            <h2><T en="Where are you losing guests?" es="¿Dónde está perdiendo huéspedes?" /></h2>
            <div className="ft-ctas">
              <Link className="btn primary lg" to={WALK}><T en="Book a guest walkthrough" es="Pedir mi recorrido como huésped" /><span className="ar" aria-hidden="true">→</span></Link>
              <a className="btn ghost lg" href="/#work"><T en="See the work" es="Ver el trabajo" /></a>
            </div>
            <p className="ft-note"><T en="I go through your ads, website and booking page the way a guest would, and show you where they drop off. 48 hours, no cost." es="Reviso sus anuncios, su sitio web y su página de reservas como lo haría un huésped, y le muestro en qué punto se van. En 48 horas, sin costo." /></p>
          </div>
        )}
        <div className="ft-side">
          <div className="ft-btns">
            <a className="btn ghost" href={`mailto:${CONTACT.email}`}><MailIcon />Email</a>
            <a className="btn ghost" href={CONTACT.waLink} target="_blank" rel="noopener">
              <ChatIcon />WhatsApp
            </a>
          </div>
          <div className="ft-meta">
            <span>{CONTACT.email}</span>
            <span><T en="Tulum, Mexico" es="Tulum, México" /> · <time>{time}</time> GMT-5</span>
            <span translate="no">tonight.design</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
