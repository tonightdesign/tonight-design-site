import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { T, useLang } from '../lang.jsx'

export const CONTACT = {
  email: 'julian@tonight.design',
  whatsapp: '+352 621 585 610',
  waLink: 'https://wa.me/352621585610',
}

export function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
    </div>
  )
}

const NAV = [
  { id: 'work', en: 'Work', es: 'Trabajo' },
  { id: 'approach', en: 'Approach', es: 'Enfoque' },
  { id: 'how', en: 'How it works', es: 'Cómo funciona', menuOnly: true },
  { id: 'plans', en: 'Plans', es: 'Planes' },
  { id: 'contact', en: 'Contact', es: 'Contacto' },
]

export function Header({ active, simple = false }) {
  const [open, setOpen] = useState(false)
  const openBtn = useRef(null)
  const closeBtn = useRef(null)
  const href = (id) => (simple ? `/#${id}` : `#${id}`)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <>
      <header>
        <div className="wrap hd">
          <Link className="brand" to="/" aria-label="tonight.design">
            <img src="/img/brain-disc.png" alt="" width="32" height="32" />tonight.design
          </Link>
          <div className="right">
            {!simple && (
              <nav className="main" aria-label="Main">
                {NAV.filter((n) => !n.menuOnly).map((n) => (
                  <a key={n.id} href={href(n.id)} className={active === n.id ? 'on' : undefined}><T en={n.en} es={n.es} /></a>
                ))}
              </nav>
            )}
            <LangSwitch />
            {!simple && (
              <button type="button" className="menu-btn" ref={openBtn} aria-expanded={open} aria-controls="overlay" onClick={() => setOpen(true)}>
                <T en="Menu" es="Menú" />
              </button>
            )}
          </div>
        </div>
      </header>
      {open && (
        <div className="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="top">
            <span className="brand"><img src="/img/brain-disc.png" alt="" width="32" height="32" />tonight.design</span>
            <button type="button" className="menu-btn" ref={closeBtn} style={{ display: 'inline-block' }} onClick={() => { setOpen(false); openBtn.current?.focus() }}>
              <T en="Close" es="Cerrar" />
            </button>
          </div>
          <nav aria-label="Menu">
            {NAV.map((n, i) => (
              <a key={n.id} href={href(n.id)} onClick={() => setOpen(false)}>
                <span><T en={n.en} es={n.es} /></span><span className="n">0{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="foot"><span>{CONTACT.email}</span><span>WhatsApp {CONTACT.whatsapp}</span></div>
        </div>
      )}
    </>
  )
}

export function Footer() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Cancun' }))
      } catch { /* ignore */ }
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <footer>
      <div className="wrap ft">
        <div>www.tonight.design</div>
        <div>{CONTACT.whatsapp} · {CONTACT.email}</div>
        <div>Tulum, Mexico · {time} GMT-5</div>
      </div>
    </footer>
  )
}
