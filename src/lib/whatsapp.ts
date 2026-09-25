/**
 * Enlaces a WhatsApp (wa.me). El número se lee de VITE_WHATSAPP_NUMBER (pública por
 * diseño: es un dato de contacto) y cae al respaldo de `src/data/site.ts`.
 *
 * Mientras no haya número, las funciones devuelven `null` y la UI enlaza a #contacto:
 * nunca se genera un wa.me sin destinatario.
 */
import { WHATSAPP_FALLBACK } from '../data/site';
import { formatearDuracion, formatearPrecio, DURACION_PENDIENTE, PRECIO_PENDIENTE } from './formato';
import type { Tratamiento } from '../types';

export const MENSAJE_RESERVA_GENERAL = 'Hola, quiero reservar una hora en Mys Spa.';

/** Deja solo dígitos: wa.me no acepta «+», espacios ni guiones. */
function normalizarNumero(valor: string): string {
  return valor.replace(/\D/g, '');
}

/** Número efectivo, o `null` si no está configurado. */
export function getWhatsAppNumber(): string | null {
  const desdeEntorno = normalizarNumero(import.meta.env.VITE_WHATSAPP_NUMBER ?? '');
  const numero = desdeEntorno.length > 0 ? desdeEntorno : normalizarNumero(WHATSAPP_FALLBACK);
  return numero.length > 0 ? numero : null;
}

/** URL de WhatsApp con el mensaje ya escrito, o `null` sin número configurado. */
export function buildWhatsAppUrl(mensaje: string = MENSAJE_RESERVA_GENERAL): string | null {
  const numero = getWhatsAppNumber();
  if (numero === null) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Nombre completo del tratamiento para el mensaje («Peeling químico»). */
export function nombreCompleto(tratamiento: Pick<Tratamiento, 'nombre' | 'nombreEnfasis'>): string {
  return tratamiento.nombreEnfasis
    ? `${tratamiento.nombre} ${tratamiento.nombreEnfasis}`
    : tratamiento.nombre;
}

/**
 * Mensaje de reserva de un tratamiento. Lleva el nombre en negrita (WhatsApp interpreta
 * los asteriscos) y, cuando existen, duración y precio, para que quien atiende sepa qué
 * vio el cliente. Los marcadores pendientes no se incluyen.
 */
export function buildMensajeTratamiento(tratamiento: Tratamiento): string {
  const detalles = [formatearDuracion(tratamiento.duracionMin), formatearPrecio(tratamiento.precio)]
    .filter((d) => d !== DURACION_PENDIENTE && d !== PRECIO_PENDIENTE)
    .join(' · ');
  const referencia = detalles ? ` (${detalles})` : '';
  return `Hola, quiero reservar *${nombreCompleto(tratamiento)}*${referencia}. ¿Qué horarios tienen disponibles?`;
}

/**
 * Mensaje del formulario de contacto.
 * @param servicio nombre del tratamiento elegido o de la evaluación.
 */
export function buildMensajeContacto(nombre: string, servicio: string, comentario: string): string {
  const quien = nombre.trim() ? `Hola, soy ${nombre.trim()}.` : 'Hola.';
  const extra = comentario.trim() ? ` ${comentario.trim()}` : '';
  return `${quien} Quiero reservar *${servicio}*.${extra} ¿Qué horarios tienen disponibles?`;
}
