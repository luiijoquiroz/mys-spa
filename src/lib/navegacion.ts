/** Anclas de la portada. Una sola fuente para el menú, los botones y los ids de sección. */
export const SECCIONES = {
  inicio: 'inicio',
  metodo: 'metodo',
  tratamientos: 'tratamientos',
  espacio: 'espacio',
  equipo: 'equipo',
  ubicacion: 'ubicacion',
  contacto: 'contacto',
} as const;

export type SeccionId = (typeof SECCIONES)[keyof typeof SECCIONES];

export const MENU: ReadonlyArray<{ id: SeccionId; etiqueta: string }> = [
  { id: SECCIONES.tratamientos, etiqueta: 'Tratamientos' },
  { id: SECCIONES.metodo, etiqueta: 'Cómo trabajamos' },
  { id: SECCIONES.equipo, etiqueta: 'Equipo' },
  { id: SECCIONES.ubicacion, etiqueta: 'Dónde estamos' },
];

export function ancla(id: SeccionId): string {
  return `#${id}`;
}
