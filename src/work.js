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
    line: { en: 'Signage that stops the street.', es: 'Letreros que detienen a la calle.' },
    cover: { src: '/work/cover-shmokey.webp', alt: { en: 'The Mr. Shmokey logo above the coffee board', es: 'El logo de Mr. Shmokey sobre el menú de café' } },
    intro: {
      en: 'Smokehouse and coffee bar in Tulum. The light boxes out front and the coffee board over the counter.',
      es: 'Smokehouse y coffee bar en Tulum. Las cajas de luz de la entrada y el menú de café sobre la barra.',
    },
    facts: [
      { k: { en: 'Client', es: 'Cliente' }, v: { en: 'Mr. Shmokey', es: 'Mr. Shmokey' } },
      { k: { en: 'Place', es: 'Lugar' }, v: { en: 'Tulum', es: 'Tulum' } },
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Light boxes, street signs and the coffee board', es: 'Cajas de luz, letreros y el menú de café' } },
    ],
    sections: [
      {
        title: { en: 'The light boxes', es: 'Las cajas de luz' },
        images: [{ src: '/work/shmokey-lightbox.webp', w: 1800, h: 398, alt: { en: 'Light box with the Mr. Shmokey logo', es: 'Caja de luz con el logo de Mr. Shmokey' } }],
      },
      {
        title: { en: 'The coffee board', es: 'El menú de café' },
        images: [{ src: '/work/shmokey-coffee-board.webp', w: 1800, h: 348, alt: { en: 'Coffee menu board: cold coffees, freddo, iced latte and the classics', es: 'Menú de café: cafés fríos, freddo, iced latte y los clásicos' } }],
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
    cover: { src: '/work/cover-ahau.webp', alt: { en: 'The Ahau Collection wordmark above the logos of Ahau, Alaya, Villa Pescadores and Casa Ganesh', es: 'El logo de Ahau Collection sobre los de Ahau, Alaya, Villa Pescadores y Casa Ganesh' } },
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
        title: { en: 'Campaigns', es: 'Campañas' },
        text: { en: 'New Years Eve at Ahau: dinner, live music and a tribal white dress code.', es: 'Año Nuevo en Ahau: cena, música en vivo y dress code tribal en blanco.' },
        images: [{ src: '/work/ahau-nye-banner.webp', w: 1600, h: 837, alt: { en: 'New Years Eve Party banner: a statue drawn in white dots on black, 31.12.26, dinner 8 PM', es: 'Banner de la fiesta de Año Nuevo: una estatua dibujada con puntos blancos sobre negro, 31.12.26, cena 8 PM' } }],
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
      { k: { en: 'Made', es: 'Hice' }, v: { en: 'Website, Meta ads, brochures and the photobook', es: 'Sitio web, anuncios en Meta, brochures y el photobook' } },
    ],
    sections: [
      {
        title: { en: 'The website', es: 'El sitio web' },
        images: [{ src: '/work/la-reserva-home.webp', w: 1915, h: 915, alt: { en: 'La Reserva Tulum home page: feel of a home, care of a hotel', es: 'Página de inicio de La Reserva Tulum: feel of a home, care of a hotel' } }],
      },
      {
        title: { en: 'Meta ads', es: 'Anuncios en Meta' },
        text: { en: 'Ads for the broker referral program.', es: 'Anuncios del programa de referidos para brokers.' },
        images: [{ src: '/work/la-reserva-ads.webp', w: 2056, h: 720, alt: { en: 'Three Meta ads for the La Reserva referral program', es: 'Tres anuncios en Meta del programa de referidos de La Reserva' } }],
      },
      {
        title: { en: 'The photobook', es: 'El photobook' },
        cols: 2,
        images: [
          { src: '/work/la-reserva-book.webp', w: 1500, h: 960, alt: { en: 'La Reserva photobook, volume one, closed', es: 'El photobook de La Reserva, volumen uno, cerrado' } },
          { src: '/work/la-reserva-spread.webp', w: 1500, h: 960, alt: { en: 'An open spread of the photobook', es: 'Una doble página del photobook' } },
        ],
      },
    ],
  },
]

// Order on the page
export const WORK = ['ahau-collection', 'la-reserva', 'mare', 'mr-shmokey'].map((id) => ALL.find((w) => w.id === id))

export const ALSO = [
  { src: '/work/petrodex-43.webp', name: 'Petrodex', place: { en: 'Dubai', es: 'Dubái' }, text: { en: 'Investor company profile, printed in A5 and A4.', es: 'Perfil para inversionistas, impreso en A5 y A4.' } },
  { src: '/work/water-toys-43.webp', name: 'Water Toys Center', place: { en: 'Cannes, Monaco', es: 'Cannes, Mónaco' }, text: { en: 'Boat show backdrops and banners.', es: 'Fondos y banners para salones náuticos.' } },
  { src: '/work/carmel-43.webp', name: 'Carmel', place: { en: 'Mexico', es: 'México' }, text: { en: 'Press kit for a French music producer and DJ.', es: 'Press kit para un productor musical y DJ francés.' } },
]
