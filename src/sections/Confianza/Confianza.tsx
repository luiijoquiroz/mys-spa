import type { ReactNode } from 'react';
import { IconoCheck, IconoEscudo, IconoPin } from '../../ui/Icono';
import { sitio } from '../../data/site';
import estilos from './Confianza.module.css';

interface Fila {
  icono: ReactNode;
  titulo: string;
  texto: string;
}

/** Tres razones para confiar, bajo el hero: evaluación, respaldo médico, dirección. */
export function Confianza() {
  const filas: Fila[] = [
    {
      icono: <IconoCheck tamano={22} strokeWidth={1.5} />,
      titulo: 'Evaluación previa',
      texto: 'en cada atención. Tu piel define el protocolo, no al revés.',
    },
    {
      icono: <IconoEscudo tamano={22} strokeWidth={1.5} />,
      titulo: 'Respaldo médico',
      texto: 'El ácido hialurónico lo aplica la Dra. Camila Carrazco.',
    },
    {
      icono: <IconoPin tamano={22} strokeWidth={1.5} />,
      titulo: sitio.direccion,
      texto: `${sitio.comuna}. A pasos del Metro Tobalaba.`,
    },
  ];

  return (
    <section className={`${estilos.confianza} seccion`} aria-label="Por qué Mys Spa">
      <ul className={`${estilos.lista} contenido`}>
        {filas.map((fila) => (
          <li key={fila.titulo} className={`${estilos.fila} entra`}>
            <span className={estilos.icono}>{fila.icono}</span>
            <p className={estilos.texto}>
              <span className={`${estilos.titulo} serif`}>{fila.titulo}</span>
              <span className={estilos.detalle}>{fila.texto}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
