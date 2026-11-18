/*
  Brief question sets. /brief uses "studio"; /brief/<key> uses that set.
  Types: choice (one), multi (several), text, textarea.
  An option with other: true opens a text box for the client's own answer.
  Add a new client by copying a set and changing the questions.
*/

const OTHER = { en: 'Other', es: 'Otro', other: true }

export const BRIEFS = {
  studio: {
    lang: 'en',
    title: { en: 'Start a project', es: 'Empecemos un proyecto' },
    intro: {
      en: 'Nine short questions, about five minutes. Your answers come straight to me and I reply within one business day.',
      es: 'Nueve preguntas cortas, como cinco minutos. Sus respuestas me llegan directo y le contesto en un día hábil.',
    },
    questions: [
      { id: 'need', type: 'multi', required: true,
        q: { en: 'What do you need?', es: '¿Qué necesita?' },
        help: { en: 'Choose all that apply.', es: 'Puede elegir varias.' },
        options: [
          { en: 'A new brand identity', es: 'Una identidad de marca nueva' },
          { en: 'A design system for an existing brand', es: 'Un sistema de diseño para una marca existente' },
          { en: 'Social content', es: 'Contenido para redes' },
          { en: 'Meta ads', es: 'Anuncios en Meta' },
          { en: 'Website or landing page', es: 'Sitio web o landing page' },
          { en: 'Print: menus, brochures, signage', es: 'Impresos: menús, brochures, señalética' },
          { en: 'An audit of my booking path', es: 'Una revisión de cómo reservan mis clientes' },
          OTHER,
        ] },
      { id: 'business', type: 'choice', required: true,
        q: { en: 'What kind of business is it?', es: '¿Qué tipo de negocio es?' },
        options: [
          { en: 'Hotel', es: 'Hotel' },
          { en: 'Vacation rental', es: 'Renta vacacional' },
          { en: 'Residential development', es: 'Desarrollo residencial' },
          { en: 'Restaurant, cafe or beach club', es: 'Restaurante, café o beach club' },
          OTHER,
        ] },
      { id: 'size', type: 'choice',
        q: { en: 'How big is it?', es: '¿De qué tamaño es?' },
        options: [
          { en: 'Boutique: up to 20 keys or 30 units', es: 'Boutique: hasta 20 habitaciones o 30 unidades' },
          { en: 'Mid-size: 21 to 60 keys or 31 to 100 units', es: 'Mediano: de 21 a 60 habitaciones o de 31 a 100 unidades' },
          { en: 'Group: more than that, or several properties', es: 'Grupo: más que eso, o varias propiedades' },
          { en: 'Not a property', es: 'No es una propiedad' },
        ] },
      { id: 'goal', type: 'textarea', required: true,
        q: { en: 'What should this work achieve?', es: '¿Qué quiere lograr con este proyecto?' },
        help: { en: 'One or two sentences is enough. For example: more direct bookings, a launch, a rebrand.', es: 'Con una o dos frases basta. Por ejemplo: más reservas directas, un lanzamiento o renovar la marca.' } },
      { id: 'links', type: 'textarea',
        q: { en: 'Where can I see you today?', es: '¿Dónde puedo ver su negocio?' },
        help: { en: 'Website, Instagram, booking page. Paste the links.', es: 'Sitio web, Instagram, página de reservas. Pegue aquí los enlaces.' } },
      { id: 'timeline', type: 'choice', required: true,
        q: { en: 'When do you need it?', es: '¿Para cuándo lo necesita?' },
        options: [
          { en: 'As soon as possible', es: 'Lo antes posible' },
          { en: 'Within a month', es: 'En menos de un mes' },
          { en: 'In one to three months', es: 'Entre uno y tres meses' },
          { en: 'No fixed date', es: 'Sin fecha fija' },
        ] },
      { id: 'budget', type: 'choice',
        q: { en: 'What budget do you have in mind?', es: '¿Qué presupuesto tiene pensado?' },
        help: { en: 'USD. This only helps me suggest the right scope.', es: 'En dólares. Solo me sirve para proponerle el alcance adecuado.' },
        options: [
          { en: 'Under $1,500', es: 'Menos de $1,500' },
          { en: '$1,500 to $5,000', es: 'De $1,500 a $5,000' },
          { en: '$5,000 to $10,000', es: 'De $5,000 a $10,000' },
          { en: 'More than $10,000', es: 'Más de $10,000' },
          { en: 'A monthly plan', es: 'Un plan mensual' },
          { en: 'Not sure yet', es: 'Aún no lo sé' },
        ] },
      { id: 'approver', type: 'text',
        q: { en: 'Who gives final approval?', es: '¿Quién da el visto bueno final?' },
        help: { en: 'Name and role, if it is not you.', es: 'Nombre y puesto, si no es usted.' } },
      { id: 'notes', type: 'textarea',
        q: { en: 'Anything else I should know?', es: '¿Algo más que quiera contarme?' },
        help: { en: 'Optional.', es: 'Opcional.' } },
    ],
  },

  fixes: {
    title: { en: '5 free fixes', es: '5 mejoras gratis' },
    intro: {
      en: 'Send me your links. Within 48 hours I send back the five changes that will matter most for your ads, website and bookings. Free.',
      es: 'Mándeme sus enlaces y en 48 horas le envío los cinco cambios que más van a ayudar a sus anuncios, su sitio web y sus reservas. Sin costo.',
    },
    done: {
      en: 'You will have your five fixes within 48 hours, by email or WhatsApp. If I need anything else, I will ask.',
      es: 'En 48 horas le mando sus cinco mejoras por correo o WhatsApp. Si necesito algo más, le pregunto.',
    },
    questions: [
      { id: 'business', type: 'choice', required: true,
        q: { en: 'What kind of business is it?', es: '¿Qué tipo de negocio es?' },
        options: [
          { en: 'Hotel', es: 'Hotel' },
          { en: 'Wellness retreat', es: 'Retiro de bienestar' },
          { en: 'Restaurant or beach club', es: 'Restaurante o beach club' },
          { en: 'Real estate', es: 'Bienes raíces' },
          OTHER,
        ] },
      { id: 'links', type: 'textarea', required: true,
        q: { en: 'Where should I look?', es: '¿Dónde puedo ver su negocio?' },
        help: { en: 'Your website, Instagram and booking page. Paste the links.', es: 'Su sitio web, Instagram y página de reservas. Pegue aquí los enlaces.' } },
      { id: 'focus', type: 'multi',
        q: { en: 'What worries you most?', es: '¿Qué le gustaría mejorar primero?' },
        help: { en: 'Optional. Choose all that apply.', es: 'Opcional. Puede elegir varias.' },
        options: [
          { en: 'Ads that don\'t bring bookings', es: 'Anuncios que no traen reservas' },
          { en: 'Instagram', es: 'Instagram' },
          { en: 'The website', es: 'El sitio web' },
          { en: 'The booking page', es: 'La página de reservas' },
          { en: 'Not sure', es: 'Todavía no sé' },
        ] },
      { id: 'notes', type: 'textarea',
        q: { en: 'Anything I should know?', es: '¿Algo más que quiera contarme?' },
        help: { en: 'Optional.', es: 'Opcional.' } },
    ],
  },

  'kin-kakaw': {
    lang: 'es',
    client: 'K’in Kakaw',
    title: { en: 'K’in Kakaw · identity', es: 'K’in Kakaw · identidad' },
    intro: {
      en: 'Six questions to close the logo stage. About three minutes. Your answers come straight to me.',
      es: 'Seis preguntas para cerrar la etapa del logotipo. Unos tres minutos. Sus respuestas me llegan directamente.',
    },
    questions: [
      { id: 'approver', type: 'text', required: true,
        q: { en: 'Who gives final approval on the logo?', es: '¿Quién da la aprobación final del logotipo?' },
        help: { en: 'Name and email, please.', es: 'Nombre y correo, por favor.' } },
      { id: 'direction', type: 'choice', required: true,
        q: { en: 'Which direction do you prefer?', es: '¿Qué dirección prefieren?' },
        options: [
          { en: '01 Sol de cacao', es: '01 Sol de cacao' },
          { en: '02 Cacao en crayola', es: '02 Cacao en crayola' },
          { en: 'We need to see changes before deciding', es: 'Necesitamos ver ajustes antes de decidir', other: true },
        ] },
      { id: 'name-check', type: 'choice', required: true,
        q: { en: 'Has the spelling and meaning of K’in Kakaw been checked with a Yucatec Maya speaker, and the trademark with IMPI?', es: '¿Ya validaron la ortografía y el significado de K’in Kakaw con un hablante de maya yucateco, y el registro de marca ante el IMPI?' },
        options: [
          { en: 'Yes, both', es: 'Sí, ambos' },
          { en: 'No, we will do it', es: 'No, nosotros lo hacemos' },
          { en: 'No, please have the studio arrange it', es: 'No, que lo gestione el estudio' },
        ] },
      { id: 'copy', type: 'choice', required: true,
        q: { en: 'For the copy: which wording?', es: 'Para los textos: ¿qué frase usamos?' },
        options: [
          { en: '“café plant based”', es: '“café plant based”' },
          { en: '“café de cocina vegetal”', es: '“café de cocina vegetal”' },
          OTHER,
        ] },
      { id: 'applications', type: 'multi',
        q: { en: 'After the logo, which applications do you need?', es: 'Después del logotipo, ¿qué aplicaciones necesitan?' },
        help: { en: 'Choose all that apply. Add a date in the last box if you have one.', es: 'Elija todas las que apliquen. Agregue una fecha en la última casilla si la tienen.' },
        options: [
          { en: 'Cups and packaging', es: 'Vasos y empaques' },
          { en: 'Menus', es: 'Menús' },
          { en: 'Signage', es: 'Señalética' },
          { en: 'Instagram', es: 'Instagram' },
          { en: 'Other, or dates', es: 'Otro, o fechas', other: true },
        ] },
      { id: 'dates', type: 'choice', required: true,
        q: { en: 'Do these dates work: feedback Friday 20 November, second round Wednesday 25, final files Monday 30?', es: '¿Les funcionan estas fechas: comentarios el viernes 20 de noviembre, segunda ronda el miércoles 25 y archivos finales el lunes 30?' },
        options: [
          { en: 'Yes', es: 'Sí' },
          { en: 'We need other dates', es: 'Necesitamos otras fechas', other: true },
        ] },
    ],
  },
}
