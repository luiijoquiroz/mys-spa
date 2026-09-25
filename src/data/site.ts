/**
 * Identidad, contacto y ubicación. Todo lo que va entre [CORCHETES] es dato real
 * pendiente del cliente (ver PLAN-DESARROLLO.md §0).
 */
import type { Foto, Franja, SitioInfo } from '../types';

/**
 * Número de WhatsApp de respaldo cuando VITE_WHATSAPP_NUMBER no está definido.
 * Vacío mientras el cliente no lo entregue: los botones llevan entonces a #contacto.
 */
export const WHATSAPP_FALLBACK = '';

export const sitio: SitioInfo = {
  nombre: 'Mys Spa',
  tagline: 'Estética & Cosmetología',
  descripcionCorta:
    'Limpiezas faciales, exfoliaciones y peelings con evaluación previa. Los procedimientos médicos, con la Dra. Camila Carrazco.',

  // Mismo edificio que Mía Spa (dato tomado de mia-spa-web).
  direccion: 'Luis Thayer Ojeda 157',
  comuna: 'Providencia',
  ciudad: 'Santiago',
  referenciaMetro: 'Metro Tobalaba, salida D, en sentido contrario al Costanera Center.',
  pisoOficina: '[PISO / OFICINA]',
  mapaUrl:
    'https://www.google.com/maps/search/?api=1&query=Luis+Thayer+Ojeda+157,+Providencia,+Santiago',

  instagram: '[@INSTAGRAM]',
  instagramUrl: '#',
  whatsappVisible: '[WHATSAPP]',

  horarios: [
    { id: 'semana', dias: 'Lunes a viernes', horario: '[HORARIO]' },
    { id: 'sabado', dias: 'Sábado', horario: '[HORARIO]' },
  ],
};

/** Foto del hero. */
export const FOTO_HERO: Foto = {
  base: 'hero',
  alt: 'Aplicación de sérum con gotario sobre el rostro de una clienta',
  posicion: '30% 50%',
  ancho: 1600,
  alto: 1067,
};

/** Las tres franjas fotográficas entre secciones, en el orden de la página. */
export const FRANJAS: Record<'cabina' | 'piel' | 'manifiesto', Franja> = {
  cabina: {
    base: 'cabina',
    alt: 'Cabina de tratamiento con arco iluminado y camilla',
    posicion: '50% 60%',
    etiqueta: 'El espacio',
    linea: 'Cabina en calma.',
    ancho: 1600,
    alto: 2133,
  },
  piel: {
    base: 'tratamiento',
    alt: 'Clienta recostada durante un tratamiento facial con aparatología',
    posicion: '50% 40%',
    etiqueta: 'Salud de la piel',
    linea: 'Limpia, hidratada, luminosa.',
    ancho: 1600,
    alto: 2400,
  },
  manifiesto: {
    base: 'piel',
    alt: 'Gotas de agua sobre la piel, en blanco y negro',
    posicion: '50% 50%',
    tono: false,
    velo: 0.5,
    etiqueta: 'Manifiesto',
    linea: 'La piel no se maquilla: se cuida.',
    ancho: 1600,
    alto: 1067,
  },
};

/** Dos planos de «El espacio»: el grande va lento, el pequeño rápido. */
export const FOTOS_ESPACIO = {
  grande: {
    base: 'toallas',
    alt: 'Toallas enrolladas en una cesta',
    posicion: '50% 50%',
    ancho: 1600,
    alto: 1067,
  } satisfies Foto,
  pequena: {
    base: 'manos',
    alt: 'Manos con guantes durante un procedimiento facial',
    posicion: '55% 50%',
    ancho: 1600,
    alto: 1068,
  } satisfies Foto,
};

/** Crédito obligatorio mientras las fotos sean las de referencia. */
export const CREDITO_FOTOS = 'Fotos de referencia: Pexels.';
