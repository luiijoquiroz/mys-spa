import type { Paso, Tratamiento } from '../types';

/** Los cuatro tratamientos del diseño aprobado. Precio y duración: pendientes (D4). */
export const tratamientos: Tratamiento[] = [
  {
    id: 'limpieza-facial-profunda',
    numero: '01',
    nombre: 'Limpieza facial',
    nombreEnfasis: 'profunda',
    descripcion: 'Higiene, extracción, hidratación y protección según tu tipo de piel.',
    esMedico: false,
  },
  {
    id: 'exfoliacion',
    numero: '02',
    nombre: 'Exfoliación',
    descripcion: 'Retira células muertas y deja la piel lisa y receptiva a lo que viene después.',
    esMedico: false,
  },
  {
    id: 'peeling-quimico',
    numero: '03',
    nombre: 'Peeling',
    nombreEnfasis: 'químico',
    descripcion:
      'Renueva la superficie de la piel y unifica el tono. La profundidad se define en la evaluación.',
    esMedico: false,
  },
  {
    id: 'acido-hialuronico',
    numero: '04',
    nombre: 'Ácido',
    nombreEnfasis: 'hialurónico',
    descripcion:
      'Hidratación profunda y volumen natural. Lo realiza la Dra. Camila Carrazco, con evaluación médica previa.',
    esMedico: true,
  },
];

/** Opción extra del formulario para quien no sabe qué necesita. */
export const OPCION_EVALUACION = { id: 'evaluacion', nombre: 'No sé, quiero una evaluación' };

export const pasos: Paso[] = [
  {
    numero: '01',
    titulo: 'Evaluación',
    descripcion:
      'Miramos tu piel de cerca, con luz, y conversamos qué buscas. Sin compromiso de tratamiento.',
  },
  {
    numero: '02',
    titulo: 'Tratamiento',
    descripcion:
      'El protocolo se ajusta a lo que vimos. Cabina en calma, productos según tu tipo de piel.',
  },
  {
    numero: '03',
    titulo: 'Cuidado en casa',
    descripcion:
      'Te vas con indicaciones claras para los días siguientes. Ahí se sostiene el resultado.',
  },
];
