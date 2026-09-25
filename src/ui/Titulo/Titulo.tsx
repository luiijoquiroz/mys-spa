import type { ReactNode } from 'react';
import estilos from './Titulo.module.css';

interface TituloProps {
  etiqueta: string;
  /** Primera línea del título, en serif regular. */
  linea1: string;
  /** Segunda línea, en itálica fina y color mineral. */
  linea2?: string;
  descripcion?: ReactNode;
  claro?: boolean;
  className?: string;
}

/** Cabecera de sección del diseño: etiqueta en versalitas + título en dos líneas. */
export function Titulo({ etiqueta, linea1, linea2, descripcion, claro = false, className }: TituloProps) {
  return (
    <div className={[estilos.cabecera, claro ? estilos.claro : undefined, 'entra', className].filter(Boolean).join(' ')}>
      <p className="etiqueta">{etiqueta}</p>
      <h2 className="titulo">
        {linea1}
        {linea2 ? (
          <>
            <br className={estilos.salto} /> <em>{linea2}</em>
          </>
        ) : null}
      </h2>
      {descripcion ? <p className="parrafo">{descripcion}</p> : null}
    </div>
  );
}
