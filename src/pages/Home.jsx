import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { T, useT } from '../lang.jsx'
import { FIXES, Footer, Header } from '../components/Chrome.jsx'
import BrainMap from '../components/BrainMap.jsx'

// What happens in a guest's head, in order, and the service that answers each step
const STEPS = [
  {
    tag: { en: '01 attention', es: '01 atención' },
    title: { en: 'The ad', es: 'El anuncio' },
    text: { en: 'Meta ads that stop the scroll.', es: 'Anuncios en Meta que frenan el scroll.' },
    price: { en: 'Monthly, from $1,000', es: 'Mensual, desde $1,000' },
  },
  {
    tag: { en: '02 desire', es: '02 deseo' },
    title: { en: 'The photos', es: 'Las fotos' },
    text: { en: 'Posts, stories and print in both languages.', es: 'Posts, stories e impresos en los dos idiomas.' },
    price: { en: 'Monthly, from $1,000', es: 'Mensual, desde $1,000' },
  },
  {
    tag: { en: '03 memory', es: '03 memoria' },
    title: { en: 'The brand', es: 'La marca' },
    text: { en: 'A brand they recognise at a glance.', es: 'Una marca que reconocen al instante.' },
    price: { en: 'Once, from $2,500', es: 'Una vez, desde $2,500' },
  },
  {
    tag: { en: '04 decision', es: '04 decisión' },
    title: { en: 'The booking', es: 'La reserva' },
    text: { en: 'A booking page that keeps them.', es: 'Una página de reservas que no los deja ir.' },
    price: { en: 'Free, in 48 hours', es: 'Gratis, en 48 horas' },
  },
]

const PROJECTS = [
  {
    id: 'ahau', name: 'Ahau Collection',
    tag: { en: 'hotels, wellness · six years', es: 'hoteles, bienestar · seis años' },
    text: {
      en: 'Four boutique hotels in Tulum. Ahau, Alaya and Villa Pescadores, each with rooms, a restaurant and a beach club, and Casa Ganesh. Shown here: Máre, the restaurant and beach club at Villa Pescadores, from the logo to the menus.',
      es: 'Cuatro hoteles boutique en Tulum. Ahau, Alaya y Villa Pescadores, cada uno con habitaciones, restaurante y beach club, y Casa Ganesh. Aquí: Máre, el restaurante y beach club de Villa Pescadores, del logo a los menús.',
    },
    made: { en: ['Brand system', 'Menus', 'Campaigns and ads', 'Instagram stories and posts'], es: ['Sistema de marca', 'Menús', 'Campañas y anuncios', 'Stories y posts de Instagram'] },
    images: [{ src: '/work/mare-banner.webp', w: 1800, h: 900, alt: { en: 'Máre at a glance: logo, the local expression, Mazurquica and Sofia Pro, colours, two of its characters and the taco menu', es: 'Máre de un vistazo: logo, la expresión local, Mazurquica y Sofia Pro, colores, dos de sus personajes y el menú de tacos' } }],
    more: {
      label: { en: 'More from Ahau Collection', es: 'Más de Ahau Collection' },
      images: [{ src: '/work/mare-posts.webp', w: 2330, h: 800, alt: { en: 'Máre illustrated stories: New Years Dinner, ¿Unos taquitos?, the fish market and how to get there', es: 'Stories ilustradas de Máre: cena de Año Nuevo, ¿Unos taquitos?, el fish market y cómo llegar' } }],
      cap: { en: 'Máre: illustrated stories and flyers', es: 'Máre: stories y flyers ilustrados' },
    },
  },
  {
    id: 'la-reserva', name: 'La Reserva',
    tag: { en: 'real estate · three years', es: 'bienes raíces · tres años' },
    text: {
      en: 'Branded residences in Tulum. I run their Meta ads and make the creative, from buyer campaigns to the broker referral program.',
      es: 'Residencias de marca en Tulum. Manejo sus anuncios en Meta y hago el creativo, de las campañas para compradores al programa de referidos para brokers.',
    },
    made: { en: ['Meta ads and creative', 'Website', 'Sales brochures and photobook', 'Broker material'], es: ['Anuncios en Meta y creativo', 'Sitio web', 'Brochures de ventas y photobook', 'Material para brokers'] },
    images: [{ src: '/work/la-reserva-ads.webp', w: 2056, h: 720, alt: { en: 'Three Meta ads for the La Reserva referral program', es: 'Tres anuncios en Meta del programa de referidos de La Reserva' } }],
  },
  {
    id: 'shmokey', name: 'Mr. Shmokey',
    tag: { en: 'restaurant', es: 'restaurante' },
    text: {
      en: 'Smokehouse and coffee bar in Tulum. The light boxes out front and the coffee board over the counter.',
      es: 'Smokehouse y coffee bar en Tulum. Las cajas de luz de la entrada y el menú de café sobre la barra.',
    },
    made: { en: ['Light boxes and street signs', 'Coffee board'], es: ['Cajas de luz y letreros', 'Menú de café'] },
    images: [
      { src: '/work/shmokey-lightbox.webp', w: 1800, h: 398, alt: { en: 'Light box with the Mr. Shmokey logo', es: 'Caja de luz con el logo de Mr. Shmokey' } },
      { src: '/work/shmokey-coffee-board.webp', w: 1800, h: 348, alt: { en: 'Coffee menu board', es: 'Menú de café' } },
    ],
  },
]

const ALSO = [
  { src: '/work/petrodex-43.webp', name: 'Petrodex', place: { en: 'Dubai', es: 'Dubái' }, text: { en: 'Investor company profile, printed in A5 and A4.', es: 'Perfil para inversionistas, impreso en A5 y A4.' } },
  { src: '/work/water-toys-43.webp', name: 'Water Toys Center', place: { en: 'Cannes, Monaco', es: 'Cannes, Mónaco' }, text: { en: 'Boat show backdrops and banners.', es: 'Fondos y banners para salones náuticos.' } },
  { src: '/work/carmel-43.webp', name: 'Carmel', place: { en: 'Mexico', es: 'México' }, text: { en: 'Press kit for a French music producer and DJ.', es: 'Press kit para un productor musical y DJ francés.' } },
]

function Shot({ img, t }) {
  return <img className="shot" src={img.src} width={img.w} height={img.h} alt={t(img.alt)} loading="lazy" decoding="async" />
}

/** One brand: a banner, and a drawer with more that closes itself once you scroll past */
function Project({ p, t }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const drawerId = useId()

  useEffect(() => {
    if (!open || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      // Gone above the top of the screen: the reader moved on to the next brand
      if (!e.isIntersecting && e.boundingClientRect.bottom < 0) setOpen(false)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [open])

  return (
    <article className="proj" ref={ref} aria-labelledby={`${p.id}-h`}>
      <div className="ptext">
        <div className="nm"><h3 id={`${p.id}-h`} translate="no">{p.name}</h3><span className="tag">{t(p.tag)}</span></div>
        <p>{t(p.text)}</p>
        <ul className="made">{t(p.made).map((m) => <li key={m}>{m}</li>)}</ul>
      </div>
      <div className="stack">{p.images.map((img) => <Shot key={img.src} img={img} t={t} />)}</div>
      {p.more && (
        <>
          <button type="button" className={open ? 'more open' : 'more'} aria-expanded={open} aria-controls={drawerId} onClick={() => setOpen((o) => !o)}>
            <span>{open ? <T en="Close" es="Cerrar" /> : t(p.more.label)}</span>
            <i aria-hidden="true">{open ? '−' : '+'}</i>
          </button>
          <div className="drawer" id={drawerId} hidden={!open}>
            {p.more.images.map((img) => <Shot key={img.src} img={img} t={t} />)}
            <span className="cap">{t(p.more.cap)}</span>
          </div>
        </>
      )}
    </article>
  )
}

export default function Home() {
  const t = useT()
  const [active, setActive] = useState(-1)
  const onActive = useCallback((i) => setActive(i), [])

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
                  <span className="price">{t(s.price)}</span>
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
          </div>
        </section>

        <section className="wrap fix-band" aria-labelledby="fix-h">
          <div className="fix-card">
            <div className="fix-text">
              <span className="tag"><T en="5 free fixes" es="5 mejoras gratis" /></span>
              <h2 id="fix-h"><T en="Not sure what’s costing you bookings?" es="¿No sabe qué le está costando reservas?" /></h2>
              <p><T en="Send me your ads, website and booking page. In 48 hours you get the five changes that matter most." es="Mándeme sus anuncios, su sitio web y su página de reservas. En 48 horas le digo los cinco cambios que más le van a ayudar." /></p>
            </div>
            <Link className="btn dark lg" to={FIXES}><T en="Find my 5 fixes" es="Quiero mis 5 mejoras" /><span className="ar" aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="work wrap" id="work" aria-labelledby="work-h">
          <h2 id="work-h"><T en="Behind these brands" es="Detrás de estas marcas" /></h2>
          {PROJECTS.map((p) => <Project key={p.id} p={p} t={t} />)}
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
