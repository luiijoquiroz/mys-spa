import type { Profesional } from '../types';

/**
 * Equipo publicado con nombre por decisión del cliente (2026-09-24).
 * Pendientes: especialidad y N.º de registro de la doctora (D7); formación y años de
 * experiencia de la cosmetóloga (D8, ortografía «Mayrelis» por confirmar); retratos.
 */
export const equipo: Profesional[] = [
  {
    id: 'camila-carrazco',
    nombre: 'Dra. Camila Carrazco',
    cargo: '[ESPECIALIDAD · N.º DE REGISTRO]',
    descripcion: 'Realiza los procedimientos médicos: ácido hialurónico y evaluaciones que lo requieran.',
  },
  {
    id: 'mayrelis-alvarez',
    nombre: 'Mayrelis Alvarez',
    cargo: 'Cosmetóloga',
    descripcion:
      'Atiende en cabina las limpiezas faciales, exfoliaciones y peelings. [FORMACIÓN Y AÑOS DE EXPERIENCIA]',
  },
];
