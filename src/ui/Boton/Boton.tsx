import type { ReactNode } from 'react';
import estilos from './Boton.module.css';

type Variante = 'primario' | 'contorno' | 'contorno-claro';

interface BotonBase {
  variante?: Variante;
  icono?: ReactNode;
  children: ReactNode;
  className?: string;
}

type BotonEnlace = BotonBase & { href: string; externo?: boolean; type?: never };
type BotonAccion = BotonBase & { href?: never; type?: 'submit' | 'button' };

export type BotonProps = BotonEnlace | BotonAccion;

function clases(variante: Variante, className?: string): string {
  return [estilos.boton, estilos[variante], className].filter(Boolean).join(' ');
}

/** Píldora del diseño: rellena en mineral oscuro o de contorno. Enlace o botón según props. */
export function Boton(props: BotonProps) {
  const { variante = 'primario', icono, children, className } = props;
  const contenido = (
    <>
      {icono}
      <span>{children}</span>
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const externo = props.externo === true;
    return (
      <a
        className={clases(variante, className)}
        href={props.href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {contenido}
      </a>
    );
  }

  return (
    <button className={clases(variante, className)} type={props.type ?? 'button'}>
      {contenido}
    </button>
  );
}
