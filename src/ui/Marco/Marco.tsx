import type { CSSProperties, ReactNode } from 'react';
import estilos from './Marco.module.css';

interface MarcoProps {
  /** Radio del marco: «arco» redondea arriba, «arco-suave» menos, «recto» apenas. */
  forma?: 'arco' | 'arco-suave' | 'recto';
  /** Proporción cuando no se fija altura (ej. «4 / 5»). */
  proporcion?: string;
  altura?: number;
  ancho?: number;
  className?: string;
  style?: CSSProperties;
  /** Anillo exterior separado del marco, como en el hero del diseño. */
  anillo?: boolean;
  children: ReactNode;
}

/** Contenedor de una foto o marcador. Define tamaño y forma; el contenido lo llena. */
export function Marco({
  forma = 'arco',
  proporcion,
  altura,
  ancho,
  className,
  style,
  anillo = false,
  children,
}: MarcoProps) {
  const estilo: CSSProperties = {
    ...(proporcion ? { aspectRatio: proporcion } : {}),
    ...(altura ? { height: altura } : {}),
    ...(ancho ? { width: ancho } : {}),
    ...style,
  };
  return (
    <div className={[estilos.marco, estilos[forma], className].filter(Boolean).join(' ')} style={estilo}>
      {anillo ? <div className={estilos.anillo} aria-hidden /> : null}
      <div className={estilos.interior}>{children}</div>
    </div>
  );
}
