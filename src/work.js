/*
  The four brands on the home page, in the order shown on the page.
  Each one has a card (cover + one line) and its own page at /work/<id>.
  `site` is the client's own website (or Instagram), shown under the facts and opened in a new tab.
  `story` is the problem, what I did and the result, shown under the title in place of the intro.
  A section is a heading, an optional line, and one or more images. `cols` lays the images side by side. An image with `video` plays that muted loop, with `src` as its poster; `lead` puts it first on phones.
*/

const ALL = [
  {
    id: 'mr-shmokey',
    site: { k: { en: 'Instagram', es: 'Instagram' }, url: 'https://www.instagram.com/mr.shmokey/', text: '@mr.shmokey' },
    name: 'Mr. Shmokey',
    line: { en: 'Food photography and menus that stop the street.', es: 'Fotografía de comida y menús que detienen la calle.' },
    cover: { src: '/work/cover-shmokey.webp', alt: { en: 'The Mr. Shmokey Smokehouse logo over three burgers on a yellow logo pattern', es: 'El logo de Mr. Shmokey Smokehouse sobre tres hamburguesas y un patrón de logos amarillo' } },
    intro: {
      en: 'Smokehouse and coffee bar in Tulum, and my first project after university. I shot the food photography and designed the branded menus, from the light boxes over the counter to the printed menus along the bar.',
      es: 'Smokehouse y coffee bar en Tulum, y mi primer proyecto al salir de la universidad. Hice la fotografía de comida y diseñé los menús de marca, de las cajas de luz sobre la barra a los menús impresos del mostrador.',
    },
    story: [
      { k: { en: 'The problem', es: 'El problema' }, v: { en: 'A smokehouse and coffee bar in Tulum with a long menu and a street full of passers-by to win over.', es: 'Un smokehouse y coffee bar en Tulum con un menú largo y una calle llena de gente que pasa y hay que convencer.' } },
      { k: { en: 'What I did', es: 'Lo que hice' }, v: { en: 'I shot the food and designed the branded menus, from the light boxes over the counter to the printed menus along the bar. My first project after university.', es: 'Hice la fotografía de comida y diseñé los menús de marca, de las cajas de luz sobre la barra a los menús impresos del mostrador. Mi primer proyecto al salir de la universidad.' } },
      { k: { en: 'The result', es: 'El resultado' }, v: { en: 'The food sells itself from the sidewalk: every dish is shown before anyone has to read a word.', es: 'La comida se vende sola desde la banqueta: cada plato se ve antes de que alguien tenga que leer una palabra.' } },
    ],
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'Mr. Shmokey', es: 'Mr. Shmokey' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Food photography and branded menus', es: 'Fotografía de comida y menús de marca' } },
    ],
    sections: [
      {
        images: [{ src: '/work/shmokey-logo-board.webp', w: 1400, h: 713, alt: { en: 'The Mr. Shmokey Smokehouse logo on its logo pattern', es: 'El logo de Mr. Shmokey Smokehouse sobre su patrón de logos' } }],
      },
      {
        title: { en: 'The burgers', es: 'Las hamburguesas' },
        text: { en: 'My photography, set on the logo pattern.', es: 'Mi fotografía, sobre el patrón del logo.' },
        cols: 2,
        images: [
          { src: '/work/shmokey-burger-1.webp', w: 1000, h: 1000, alt: { en: 'A cheese burger on the Mr. Shmokey logo pattern', es: 'Una hamburguesa con queso sobre el patrón del logo de Mr. Shmokey' } },
          { src: '/work/shmokey-burger-2.webp', w: 1000, h: 1000, alt: { en: 'A second burger with cheese and onions on the Mr. Shmokey logo pattern', es: 'Otra hamburguesa con queso y cebolla sobre el patrón del logo de Mr. Shmokey' } },
        ],
      },
      {
        title: { en: 'The menus', es: 'Los menús' },
        text: { en: 'Light box menus over the counter and printed menus along the bar.', es: 'Menús de caja de luz sobre la barra y menús impresos a lo largo del mostrador.' },
        images: [{ src: '/work/shmokey-storefront.webp', w: 1600, h: 815, alt: { en: 'The Mr. Shmokey counter at night with the lit menus above and printed menus below', es: 'La barra de Mr. Shmokey de noche con los menús iluminados arriba y los impresos abajo' } }],
      },
    ],
  },
  {
    id: 'mare',
    site: { k: { en: 'Website', es: 'Sitio web' }, url: 'https://villapescadorestulum.com/', text: 'villapescadorestulum.com' },
    name: 'Máre',
    line: { en: 'A beach club brand, from scratch.', es: 'Una marca de beach club, desde cero.' },
    cover: { src: '/work/cover-mare.webp', alt: { en: 'The Máre logo and two of its characters, next to the menu', es: 'El logo de Máre y dos de sus personajes, junto al menú' } },
    intro: {
      en: 'The restaurant and beach club at Villa Pescadores, part of Ahau Collection. A brush wordmark, a cast of hand-drawn characters and a local expression: máre, said when something is really good.',
      es: 'El restaurante y beach club de Villa Pescadores, parte de Ahau Collection. Un logo a pincel, un elenco de personajes dibujados a mano y una expresión local: máre, lo que se dice cuando algo está muy bueno.',
    },
    story: [
      { k: { en: 'The problem', es: 'El problema' }, v: { en: 'The restaurant and beach club at Villa Pescadores needed a brand of its own, one that stands out on a busy stretch of Tulum beach.', es: 'El restaurante y beach club de Villa Pescadores necesitaba una marca propia, una que destaque en un tramo concurrido de la playa de Tulum.' } },
      { k: { en: 'What I did', es: 'Lo que hice' }, v: { en: 'I built it from scratch around a local expression, máre, said when something is really good: a brush wordmark and a cast of hand-drawn characters who carry every menu, story and flyer.', es: 'La hice desde cero alrededor de una expresión local, máre, lo que se dice cuando algo está muy bueno: un logo a pincel y un elenco de personajes dibujados a mano que llevan cada menú, story y flyer.' } },
      { k: { en: 'The result', es: 'El resultado' }, v: { en: 'A brand you can spot from one drawing, with a cast the team puts on anything new, from the breakfast tent cards to the New Years dinner.', es: 'Una marca que se reconoce por un solo dibujo, con un elenco que el equipo pone en todo lo nuevo, de las tarjetas del desayuno a la cena de Año Nuevo.' } },
    ],
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'Ahau Collection', es: 'Ahau Collection' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Villa Pescadores, Tulum', es: 'Villa Pescadores, Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Logo, characters, menus, stories and flyers', es: 'Logo, personajes, menús, stories y flyers' } },
    ],
    sections: [
      {
        images: [{ src: '/work/mare-banner.webp', w: 1800, h: 917, alt: { en: 'The Máre logo, two of its characters and the Spanish menu', es: 'El logo de Máre, dos de sus personajes y el menú en español' } }],
      },
      {
        title: { en: 'The characters', es: 'Los personajes' },
        text: { en: 'Every story and flyer is carried by one of them: the waiter with the champagne, the taco delivery, the fish market guide.', es: 'Cada story y cada flyer lo lleva uno de ellos: el mesero con la champaña, el de los tacos, el guía del fish market.' },
        images: [{ src: '/work/mare-posts.webp', w: 2330, h: 800, alt: { en: 'Máre stories: New Years Dinner, ¿Unos taquitos?, the fish market and how to get there', es: 'Stories de Máre: cena de Año Nuevo, ¿Unos taquitos?, el fish market y cómo llegar' } }],
      },
      {
        title: { en: 'The menus', es: 'Los menús' },
        text: { en: 'Tacos and beach club, in Mazurquica and Sofia Pro, with the cast along the bottom of every page.', es: 'Tacos y beach club, en Mazurquica y Sofia Pro, con los personajes al pie de cada página.' },
        images: [{ src: '/work/mare-menus.webp', w: 1800, h: 1100, alt: { en: 'The two pages of the Máre menu', es: 'Las dos páginas del menú de Máre' } }],
      },
    ],
  },
  {
    id: 'ahau-collection',
    site: { k: { en: 'Website', es: 'Sitio web' }, url: 'https://ahaucollection.com/', text: 'ahaucollection.com' },
    name: 'Ahau Collection',
    line: { en: 'One system, four hotels.', es: 'Un sistema, cuatro hoteles.' },
    cover: { src: '/work/cover-ahau.webp', alt: { en: 'New Years Eve Party at Ahau: a statue drawn in white dots on black, 31.12.26, dinner 8 PM', es: 'Fiesta de Año Nuevo en Ahau: una estatua dibujada con puntos blancos sobre negro, 31.12.26, cena 8 PM' } },
    intro: {
      en: 'Four boutique hotels in Tulum. Ahau, Alaya and Villa Pescadores, each with rooms, a restaurant and a beach club, and Casa Ganesh. Six years on the brands, from menus to campaigns.',
      es: 'Cuatro hoteles boutique en Tulum. Ahau, Alaya y Villa Pescadores, cada uno con habitaciones, restaurante y beach club, y Casa Ganesh. Seis años en las marcas, de los menús a las campañas.',
    },
    story: [
      { k: { en: 'The problem', es: 'El problema' }, v: { en: 'Four hotels in Tulum, three of them with a restaurant and beach club, each needing menus, stories and campaigns every week, in two languages, without looking like four different companies.', es: 'Cuatro hoteles en Tulum, tres con restaurante y beach club, que necesitan menús, stories y campañas cada semana, en dos idiomas, sin parecer cuatro empresas distintas.' } },
      { k: { en: 'What I did', es: 'Lo que hice' }, v: { en: 'One brand system across the four, then six years of menus, stories and campaigns built on it, from the Sunday DJ Sessions to New Years Eve.', es: 'Un sistema de marca para los cuatro, y luego seis años de menús, stories y campañas sobre él, de las DJ Sessions del domingo a Año Nuevo.' } },
      { k: { en: 'The result', es: 'El resultado' }, v: { en: 'Every piece looks like the same family, and each new campaign starts from the system instead of a blank page.', es: 'Cada pieza se ve de la misma familia, y cada campaña nueva parte del sistema y no de una hoja en blanco.' } },
    ],
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'Ahau Collection', es: 'Ahau Collection' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Brand system, menus, campaigns, stories and posts', es: 'Sistema de marca, menús, campañas, stories y posts' } },
    ],
    sections: [
      {
        title: { en: 'The system', es: 'El sistema' },
        text: { en: 'Four hotels, one family: Ahau, Alaya, Villa Pescadores and Casa\u00a0Ganesh.', es: 'Cuatro hoteles, una familia: Ahau, Alaya, Villa Pescadores y Casa\u00a0Ganesh.' },
        images: [{ src: '/work/ahau-brand.webp', w: 1080, h: 550, alt: { en: 'The logos of Ahau, Alaya, Villa Pescadores and Casa Ganesh framed by paper-cut leaves', es: 'Los logos de Ahau, Alaya, Villa Pescadores y Casa Ganesh entre hojas de papel recortado' } }],
      },
      {
        title: { en: 'Campaigns', es: 'Campañas' },
        text: { en: 'Built on the system: Sunday DJ Sessions, New Years Eve and the Christmas menu.', es: 'Hechas sobre el sistema: las DJ Sessions del domingo, Año Nuevo y el menú de Navidad.' },
        cols: 3,
        images: [
          { src: '/work/ahau-dj-sessions.webp', w: 720, h: 1280, alt: { en: 'Story: Sunday DJ Sessions on the beach at Ahau', es: 'Story: DJ Sessions del domingo en la playa de Ahau' } },
          { video: '/work/ahau-nye-story.mp4', src: '/work/ahau-nye-story-poster.webp', w: 720, h: 1280, lead: true, alt: { en: 'Animated story: New Years Eve at Ahau', es: 'Story animada: Año Nuevo en Ahau' } },
          { src: '/work/ahau-christmas.webp', w: 720, h: 1280, alt: { en: 'Story: an evening of joy, the Christmas menu at Ahau', es: 'Story: an evening of joy, el menú de Navidad de Ahau' } },
        ],
      },
    ],
    link: { to: '/work/mare', text: { en: 'Máre, the beach club at Villa Pescadores, has its own page.', es: 'Máre, el beach club de Villa Pescadores, tiene su propia página.' } },
  },
  {
    id: 'la-reserva',
    site: { k: { en: 'Website', es: 'Sitio web' }, url: 'https://lareservatulum.com/', text: 'lareservatulum.com' },
    name: 'La Reserva',
    line: { en: 'Selling the last residences through Meta ads.', es: 'Vendiendo las últimas residencias con anuncios en Meta.' },
    cover: { src: '/work/cover-la-reserva.webp', alt: { en: 'The La Reserva Tulum home page with two referral ads', es: 'La página de inicio de La Reserva Tulum con dos anuncios de referidos' } },
    intro: {
      en: 'Branded residences in Tulum. I designed the website, run their Meta ads and make the creative, from buyer campaigns to the broker referral program.',
      es: 'Residencias de marca en Tulum. Diseñé el sitio web, manejo sus anuncios en Meta y hago el creativo, de las campañas para compradores al programa de referidos para brokers.',
    },
    story: [
      { k: { en: 'The problem', es: 'El problema' }, v: { en: 'A collection of 42 branded residences in Tulum with the last units still to sell, to buyers who mostly live abroad and want to trust a place before they fly in.', es: 'Una colección de 42 residencias de marca en Tulum con las últimas unidades por vender, a compradores que en su mayoría viven fuera y quieren confiar en un lugar antes de viajar.' } },
      { k: { en: 'What I did', es: 'Lo que hice' }, v: { en: 'I rebuilt the website so it sells the stay before the sale. Then I designed and ran Meta ad carousels in English and Spanish that take a buyer from the AD México feature to a WhatsApp chat with the sales director, with the brochure for the follow-up.', es: 'Rehice el sitio web para que venda la estancia antes que la compra. Luego diseñé y lancé carruseles en Meta, en inglés y en español, que llevan al comprador del reportaje en AD México a un chat de WhatsApp con el director de ventas, con el brochure para el seguimiento.' } },
      { k: { en: 'The result', es: 'El resultado' }, v: { en: 'Units are selling to buyers who first met La Reserva through the ads, and new leads keep arriving straight in the sales director\'s WhatsApp.', es: 'Se están vendiendo unidades a compradores que conocieron La Reserva por los anuncios, y siguen llegando leads directo al WhatsApp del director de ventas.' } },
    ],
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'La Reserva Tulum', es: 'La Reserva Tulum' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Website, Meta ads and the brochure', es: 'Sitio web, anuncios en Meta y el brochure' } },
    ],
    sections: [
      {
        title: { en: 'The website', es: 'El sitio web' },
        text: { en: 'Step 1: a home page that sells the stay before the sale. Scroll inside the window to read it.', es: 'Paso 1: una página de inicio que vende la estancia antes que la compra. Desplácese dentro de la ventana para recorrerla.' },
        site: { src: '/work/la-reserva-site-full.webp', w: 1200, h: 6834, url: 'lareservatulum.com', alt: { en: 'The full La Reserva Tulum home page, from the hero to the footer', es: 'La página de inicio completa de La Reserva Tulum, del encabezado al pie' } },
      },
      {
        title: { en: 'Meta ads', es: 'Anuncios en Meta' },
        text: { en: 'Step 2: a five-card carousel for buyers, from the AD México feature to a WhatsApp chat with the sales director.', es: 'Paso 2: un carrusel de cinco tarjetas para compradores, del reportaje en AD México a un chat de WhatsApp con el director de ventas.' },
        carousel: {
          w: 864,
          h: 1080,
          slides: [1, 2, 3, 4, 5].map((n) => ({ en: `/work/la-reserva-ad-en-${n}.webp`, es: `/work/la-reserva-ad-es-${n}.webp` })),
          alts: [
            { en: 'Card 1: Architectural Digest México called it a refuge, call it home', es: 'Tarjeta 1: Architectural Digest México lo llamó un refugio' },
            { en: 'Card 2: a collection of 42 residences with the jungle in between', es: 'Tarjeta 2: una colección de 42 residencias con la selva en medio' },
            { en: 'Card 3: designed by Co-Lab to let the jungle in', es: 'Tarjeta 3: diseñado por Co-Lab para dejar entrar la selva' },
            { en: 'Card 4: stay before you buy', es: 'Tarjeta 4: quédese antes de comprar' },
            { en: 'Card 5: Ben, the sales director, with a WhatsApp button', es: 'Tarjeta 5: Ben, el director de ventas, con un botón de WhatsApp' },
          ],
        },
      },
      {
        title: { en: 'A day at La Reserva', es: 'Un día en La Reserva' },
        text: { en: 'Step 3: a second carousel that lets them live a day there first, then opens the same WhatsApp chat.', es: 'Paso 3: un segundo carrusel que les deja vivir un día ahí primero, y luego abre el mismo chat de WhatsApp.' },
        carousel: {
          w: 960,
          h: 960,
          slides: [1, 2, 3, 4, 5].map((n) => ({ en: `/work/la-reserva-day-en-${n}.webp`, es: `/work/la-reserva-day-es-${n}.webp` })),
          alts: [
            { en: 'Card 1: a day at La Reserva', es: 'Tarjeta 1: un día en La Reserva' },
            { en: 'Card 2: morning', es: 'Tarjeta 2: la mañana' },
            { en: 'Card 3: afternoon', es: 'Tarjeta 3: la tarde' },
            { en: 'Card 4: dinner', es: 'Tarjeta 4: la cena' },
            { en: 'Card 5: Ben, the sales director, with a WhatsApp button', es: 'Tarjeta 5: Ben, el director de ventas, con un botón de WhatsApp' },
          ],
        },
      },
      {
        title: { en: 'The brochure', es: 'El brochure' },
        text: { en: 'Step 4: the brochure buyers get after the first chat. Fifteen of its fifty-one pages, turn them with the arrows or a swipe.', es: 'Paso 4: el brochure que reciben después del primer chat. Quince de sus cincuenta y una páginas, páselas con las flechas o deslizando.' },
        book: { pages: 15, src: { en: '/work/brochure-en-', es: '/work/brochure-es-' }, w: 1600, h: 900 },
      },
    ],
  },
]

/*
  Whiteout Sessions: a self-initiated night series, from Julian's own snowboard photography.
  `volumes` is five story slots. Slot 03 holds the Ahau New Years Eve story as a stand-in until its
  own volume is made; 04 and 05 are empty on purpose. Replace them as the volumes get built.
*/
ALL.push({
  id: 'whiteout-sessions',
  cardTo: '/whiteout', // the home card opens the event site itself; the case study stays at /work/whiteout-sessions
  tag: { en: 'Self-initiated', es: 'Proyecto propio' },
  site: { k: { en: 'Event site', es: 'Sitio del evento' }, to: '/whiteout', text: { en: 'Open the concept', es: 'Abrir el concepto' } },
  name: 'Whiteout Sessions',
  line: { en: 'A night series, built from my own photography.', es: 'Una serie de noches, hecha con mi propia fotografía.' },
  cover: { src: '/work/cover-whiteout.webp', alt: { en: 'Two black and white stories: a snowboarder carving through a ring of light dots, and a rider inside a spinning sphere of dots', es: 'Dos stories en blanco y negro: un snowboarder que pasa entre un anillo de puntos de luz, y otro dentro de una esfera de puntos que gira' } },
  intro: {
    en: 'A self-initiated identity for five winter nights of electronic music in Niseko. I shot the photos on the mountain, cut the riders out, built the light forms in 3D and timed every move to the track.',
    es: 'Una identidad propia para cinco noches de invierno de música electrónica en Niseko. Tomé las fotos en la montaña, recorté a los riders, armé las formas de luz en 3D y sincronicé cada movimiento con la pista.',
  },
    story: [
      { k: { en: 'The brief', es: 'El brief' }, v: { en: 'A self-set brief: an identity for five winter nights of electronic music in Niseko, made only from my own photography.', es: 'Un brief propio: una identidad para cinco noches de invierno de música electrónica en Niseko, hecha solo con mi propia fotografía.' } },
      { k: { en: 'What I made', es: 'Lo que hice' }, v: { en: 'I shot the riders on the mountain, cut them out, built the light forms in 3D and timed every move to the track, then carried it all onto an event site.', es: 'Tomé las fotos de los riders en la montaña, los recorté, armé las formas de luz en 3D y sincronicé cada movimiento con la pista, y luego lo llevé todo a un sitio del evento.' } },
      { k: { en: 'What it shows', es: 'Lo que demuestra' }, v: { en: 'How one set of photos becomes a full identity, motion and a website, without a single stock image.', es: 'Cómo un grupo de fotos se vuelve identidad, motion y sitio web, sin una sola imagen de stock.' } },
    ],
  facts: [
    { k: { en: 'Type', es: 'Tipo' }, v: { en: 'Self-initiated concept', es: 'Concepto propio' } },
    { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Hirafu, Niseko', es: 'Hirafu, Niseko' } },
    { k: { en: 'Made', es: 'Hice' }, v: { en: 'Photography, identity, motion and the event site', es: 'Fotografía, identidad, motion y el sitio del evento' } },
  ],
  sections: [
    {
      title: { en: 'The volumes', es: 'Los volúmenes' },
      text: { en: 'One story per night. The light forms move on the beat of the track each one is scored to.', es: 'Una story por noche. Las formas de luz se mueven al ritmo de la pista de cada una.' },
      volumes: [
        { n: '01', name: 'Orbit', note: { en: 'Ambient techno, scored to Xtal by Aphex Twin', es: 'Ambient techno, con Xtal de Aphex Twin' }, video: '/work/whiteout-orbit.mp4', poster: '/work/whiteout-orbit-poster.webp', alt: { en: 'Animated story: a snowboarder carving at night while rings of light dots drift around him', es: 'Story animada: un snowboarder de noche mientras unos anillos de puntos de luz giran a su alrededor' } },
        { n: '02', name: 'Floodlight', note: { en: 'French house, scored to Revolution 909 by Daft Punk', es: 'French house, con Revolution 909 de Daft Punk' }, video: '/work/whiteout-floodlight.mp4', poster: '/work/whiteout-floodlight-poster.webp', alt: { en: 'Animated story: a snowboarder riding the inside wall of a spinning sphere of light', es: 'Story animada: un snowboarder sobre la pared interior de una esfera de luz que gira' } },
        { n: '03', name: { en: 'In progress', es: 'En proceso' }, note: { en: 'Stand-in: the Ahau New Years Eve story', es: 'Provisional: la story de Año Nuevo de Ahau' }, video: '/work/ahau-nye-story.mp4', poster: '/work/ahau-nye-story-poster.webp', alt: { en: 'Animated story: New Years Eve at Ahau', es: 'Story animada: Año Nuevo en Ahau' } },
        { n: '04', name: { en: 'Coming soon', es: 'Próximamente' } },
        { n: '05', name: { en: 'Coming soon', es: 'Próximamente' } },
      ],
    },
    {
      title: { en: 'From the photo', es: 'Desde la foto' },
      text: { en: 'Every volume starts with one of my night or powder shots. The rider is cut out so the light can pass behind and in front of him.', es: 'Cada volumen parte de una de mis fotos de noche o de nieve polvo. El rider va recortado para que la luz pase por detrás y por delante de él.' },
      cols: 4,
      images: [
        { src: '/work/whiteout-source-carve.webp', w: 720, h: 1280, alt: { en: 'The original photo: a snowboarder carving at night, motion blur', es: 'La foto original: un snowboarder de noche, con barrido' } },
        { src: '/work/whiteout-orbit-poster.webp', w: 720, h: 1280, alt: { en: 'The same shot in the Orbit story', es: 'La misma foto en la story Orbit' } },
        { src: '/work/whiteout-source-grab.webp', w: 720, h: 1280, alt: { en: 'The original photo: a snowboarder grabbing his board against a white sky', es: 'La foto original: un snowboarder agarrando la tabla contra un cielo blanco' } },
        { src: '/work/whiteout-floodlight-poster.webp', w: 720, h: 1280, alt: { en: 'The same rider inside the Floodlight sphere', es: 'El mismo rider dentro de la esfera de Floodlight' } },
      ],
    },
    {
      title: { en: 'The event site', es: 'El sitio del evento' },
      text: { en: 'The identity carried onto the web: the sphere turns in the header, then the volumes, the lineup and the tickets.', es: 'La identidad llevada a la web: la esfera gira en el encabezado, luego los volúmenes, el lineup y los boletos.' },
      site: { src: '/work/whiteout-site-full.webp', w: 1200, h: 2492, url: 'whiteout-sessions', alt: { en: 'The full Whiteout Sessions event page: the spinning sphere, the volumes, the lineup and the tickets', es: 'La página completa de Whiteout Sessions: la esfera que gira, los volúmenes, el lineup y los boletos' } },
      live: { to: '/whiteout', text: { en: 'Open the event site', es: 'Abrir el sitio del evento' } },
    },
  ],
})

// Order on the page
export const WORK = ['ahau-collection', 'la-reserva', 'mare', 'mr-shmokey', 'whiteout-sessions'].map((id) => ALL.find((w) => w.id === id))

// The five nights, shared by the project page and the event site
export const VOLUMES = ALL.find((w) => w.id === 'whiteout-sessions').sections[0].volumes

export const ALSO = [
  { src: '/work/kin-kakaw-11.webp', name: "K'in Kakaw", place: { en: 'Tulum', es: 'Tulum' }, text: { en: 'Brand for a plant-based restaurant.', es: 'Marca para un restaurante vegetal.' } },
  { src: '/work/petrodex-11.webp', name: 'Petrodex', place: { en: 'Dubai', es: 'Dubái' }, text: { en: 'Investor profile in A5 and A4.', es: 'Perfil de inversión en A5 y A4.' } },
  { src: '/work/water-toys-11.webp', name: 'Water Toys Center', place: { en: 'Monaco', es: 'Mónaco' }, text: { en: 'Boat show backdrops and banners.', es: 'Gráficos para salones náuticos.' } },
  { src: '/work/carmel-11.webp', name: 'Carmel', place: { en: 'France', es: 'Francia' }, text: { en: 'Press kit for a DJ and producer.', es: 'Press kit para un DJ y productor.' } },
]
