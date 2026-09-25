/**
 * Contratos de datos del sitio. La UI solo conoce estas formas; los valores viven en
 * `src/data/` y se reemplazan cuando el cliente entregue los datos reales.
 */

export interface Tratamiento {
  /** Identificador estable; key de React y valor del selector del formulario. */
  id: string;
  /** Numeral que se muestra («01»…). */
  numero: string;
  nombre: string;
  /** Parte del nombre que va en itálica fina, si la hay («profunda», «químico»). */
  nombreEnfasis?: string;
  descripcion: string;
  /** Duración en minutos. Ausente => se muestra el marcador pendiente. */
  duracionMin?: number;
  /** Precio en pesos chilenos, entero. Ausente => se muestra el marcador pendiente. */
  precio?: number;
  /** Lo realiza una médica; se etiqueta como procedimiento médico. */
  esMedico: boolean;
}

export interface Paso {
  numero: string;
  titulo: string;
  descripcion: string;
}

export interface Profesional {
  id: string;
  nombre: string;
  /** Línea en versalitas bajo el nombre: cargo o especialidad y registro. */
  cargo: string;
  descripcion: string;
  /** Ruta pública del retrato, cuando exista. */
  foto?: string;
  fotoAlt?: string;
}

export interface BloqueHorario {
  id: string;
  dias: string;
  horario: string;
}

export interface Foto {
  /** Nombre base dentro de /img: existe <base>.webp y <base>.jpg. */
  base: string;
  alt: string;
  /** object-position de la imagen. */
  posicion?: string;
  /** false para fotos en blanco y negro, que no llevan el ajuste de color. */
  tono?: boolean;
  /** Opacidad del velo azul mineral (0 a 1). */
  velo?: number;
  ancho: number;
  alto: number;
}

export interface Franja extends Foto {
  linea: string;
  etiqueta: string;
}

export interface SitioInfo {
  nombre: string;
  tagline: string;
  descripcionCorta: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  referenciaMetro: string;
  pisoOficina: string;
  mapaUrl: string;
  instagram: string;
  instagramUrl: string;
  whatsappVisible: string;
  horarios: BloqueHorario[];
}
