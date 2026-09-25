/** Marcadores visibles mientras el cliente no entregue el dato. */
export const PRECIO_PENDIENTE = '[PRECIO]';
export const DURACION_PENDIENTE = '[DURACIÓN]';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/** «$45.000» o el marcador si aún no hay precio. */
export function formatearPrecio(precio: number | undefined): string {
  return typeof precio === 'number' && Number.isFinite(precio)
    ? formatoCLP.format(precio)
    : PRECIO_PENDIENTE;
}

/** «60 min» o el marcador si aún no hay duración. */
export function formatearDuracion(minutos: number | undefined): string {
  return typeof minutos === 'number' && minutos > 0 ? `${minutos} min` : DURACION_PENDIENTE;
}
