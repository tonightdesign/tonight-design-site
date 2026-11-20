/*
  The four brands on the home page, in the order shown on the page.
  Each one has a card (cover + one line) and its own page at /work/<id>.
  `site` is the client's own website (or Instagram), shown under the facts and opened in a new tab.
  A section is a heading, an optional line, and one or more images. `cols` lays the images side by side. An image with `video` plays that muted loop, with `src` as its poster; `lead` puts it first on phones.
*/

const ALL = [
  {
    id: 'mr-shmokey',
    site: { k: { en: 'Instagram', es: 'Instagram' }, url: 'https://www.instagram.com/mr.shmokey/', text: '@mr.shmokey' },
    name: 'Mr. Shmokey',
    line: { en: 'Burgers, signs and menus that stop the street.', es: 'Hamburguesas, letreros y menús que detienen la calle.' },
    cover: { src: '/work/cover-shmokey.webp', alt: { en: 'The Mr. Shmokey Smokehouse logo over three burgers on a yellow logo pattern', es: 'El logo de Mr. Shmokey Smokehouse sobre tres hamburguesas y un patrón de logos amarillo' } },
    intro: {
      en: 'Smokehouse and coffee bar in Tulum. The logo, the food photography and the light box menus over the counter.',
      es: 'Smokehouse y coffee bar en Tulum. El logo, la fotografía de comida y los menús de caja de luz sobre la barra.',
    },
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'Mr. Shmokey', es: 'Mr. Shmokey' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Logo, food photography, light box and printed menus', es: 'Logo, fotografía de comida, menús de caja de luz e impresos' } },
    ],
    sections: [
      {
        images: [{ src: '/work/shmokey-logo-board.webp', w: 1400, h: 713, alt: { en: 'The Mr. Shmokey Smokehouse logo on its logo pattern', es: 'El logo de Mr. Shmokey Smokehouse sobre su patrón de logos' } }],
      },
      {
        title: { en: 'The burgers', es: 'Las hamburguesas' },
        text: { en: 'Two burgers on the logo pattern.', es: 'Dos hamburguesas sobre el patrón del logo.' },
        cols: 2,
        images: [
          { src: '/work/shmokey-burger-1.webp', w: 1000, h: 1000, alt: { en: 'A cheese burger on the Mr. Shmokey logo pattern', es: 'Una hamburguesa con queso sobre el patrón del logo de Mr. Shmokey' } },
          { src: '/work/shmokey-burger-2.webp', w: 1000, h: 1000, alt: { en: 'A second burger with cheese and onions on the Mr. Shmokey logo pattern', es: 'Otra hamburguesa con queso y cebolla sobre el patrón del logo de Mr. Shmokey' } },
        ],
      },
      {
        title: { en: 'The menus', es: 'Los menús' },
        text: { en: 'Light box menus over the counter and printed menus along the bar.', es: 'Menús de caja de luz sobre la barra y menús impresos a lo largo del mostrador.' },
        images: [{ src: '/work/shmokey-storefront.webp', w: 1800, h: 917, alt: { en: 'The Mr. Shmokey counter at night with the lit menus above and printed menus below', es: 'La barra de Mr. Shmokey de noche con los menús iluminados arriba y los impresos abajo' } }],
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
        title: { en: 'Stories', es: 'Stories' },
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
    line: { en: 'The website and Meta ads.', es: 'El sitio web y los anuncios en Meta.' },
    cover: { src: '/work/cover-la-reserva.webp', alt: { en: 'The La Reserva Tulum home page with two referral ads', es: 'La página de inicio de La Reserva Tulum con dos anuncios de referidos' } },
    intro: {
      en: 'Branded residences in Tulum. I designed the website, run their Meta ads and make the creative, from buyer campaigns to the broker referral program.',
      es: 'Residencias de marca en Tulum. Diseñé el sitio web, manejo sus anuncios en Meta y hago el creativo, de las campañas para compradores al programa de referidos para brokers.',
    },
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'La Reserva Tulum', es: 'La Reserva Tulum' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Website, Meta ads and the brochure', es: 'Sitio web, anuncios en Meta y el brochure' } },
    ],
    sections: [
      {
        title: { en: 'The website', es: 'El sitio web' },
        text: { en: 'The whole home page. Scroll inside the window to read it.', es: 'La página de inicio completa. Desplácese dentro de la ventana para recorrerla.' },
        site: { src: '/work/la-reserva-site-full.webp', w: 1200, h: 6834, url: 'lareservatulum.com', alt: { en: 'The full La Reserva Tulum home page, from the hero to the footer', es: 'La página de inicio completa de La Reserva Tulum, del encabezado al pie' } },
      },
      {
        title: { en: 'Meta ads', es: 'Anuncios en Meta' },
        text: { en: 'A five-card carousel for buyers, from the AD México feature to a WhatsApp chat with the sales director.', es: 'Un carrusel de cinco tarjetas para compradores, del reportaje en AD México a un chat de WhatsApp con el director de ventas.' },
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
        title: { en: 'Referral ads', es: 'Anuncios de referidos' },
        text: { en: 'Ads for the broker referral program.', es: 'Anuncios del programa de referidos para brokers.' },
        images: [{ src: '/work/la-reserva-ads.webp', w: 2056, h: 720, alt: { en: 'Three Meta ads for the La Reserva referral program', es: 'Tres anuncios en Meta del programa de referidos de La Reserva' } }],
      },
      {
        title: { en: 'The brochure', es: 'El brochure' },
        text: { en: 'Sixteen of its fifty-one pages. Turn them with the arrows, a swipe or a tap on either side.', es: 'Dieciséis de sus cincuenta y una páginas. Páselas con las flechas, deslizando o tocando a cada lado.' },
        book: { pages: 16, src: { en: '/work/brochure-en-', es: '/work/brochure-es-' }, w: 1600, h: 900 },
      },
    ],
  },
]

// Order on the page
export const WORK = ['ahau-collection', 'la-reserva', 'mare', 'mr-shmokey'].map((id) => ALL.find((w) => w.id === id))

export const ALSO = [
  { src: '/work/kin-kakaw-11.webp', name: "K'in Kakaw", place: { en: 'Tulum', es: 'Tulum' }, text: { en: 'Brand for a plant-based restaurant.', es: 'Marca para un restaurante vegetal.' } },
  { src: '/work/petrodex-11.webp', name: 'Petrodex', place: { en: 'Dubai', es: 'Dubái' }, text: { en: 'Investor profile in A5 and A4.', es: 'Perfil de inversión en A5 y A4.' } },
  { src: '/work/water-toys-11.webp', name: 'Water Toys Center', place: { en: 'Monaco', es: 'Mónaco' }, text: { en: 'Boat show backdrops and banners.', es: 'Gráficos para salones náuticos.' } },
  { src: '/work/carmel-11.webp', name: 'Carmel', place: { en: 'France', es: 'Francia' }, text: { en: 'Press kit for a DJ and producer.', es: 'Press kit para un DJ y productor.' } },
]
