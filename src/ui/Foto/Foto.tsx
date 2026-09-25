import type { CSSProperties } from 'react';
import estilos from './Foto.module.css';

export type Movimiento = 'lento' | 'hero' | 'ninguno';

export interface FotoProps {
  /** Nombre base dentro de /img: existe <base>.webp y <base>.jpg. */
  base: string;
  alt: string;
  ancho: number;
  alto: number;
  /** object-position de la imagen. */
  posicion?: string;
  /** Ajuste de color para que las fotos convivan con la paleta. false en blanco y negro. */
  tono?: boolean;
  /** Opacidad del velo azul mineral. 0 lo quita. */
  velo?: number;
  /** Parallax: la imagen es más alta que el marco y se mueve con el scroll. */
  movimiento?: Movimiento;
  /** Degradado oscuro al pie para que el texto blanco lea encima. */
  sombra?: boolean;
  prioridad?: boolean;
}

/**
 * Imagen con parallax interior. El contenedor la recorta con `overflow: clip` (nunca
 * `hidden`: congelaría la animación ligada al scroll). Se coloca dentro de un marco con
 * `position: relative` y tamaño propio.
 */
export function Foto({
  base,
  alt,
  ancho,
  alto,
  posicion = '50% 50%',
  tono = true,
  velo = 0.35,
  movimiento = 'lento',
  sombra = false,
  prioridad = false,
}: FotoProps) {
  const claseMovimiento =
    movimiento === 'lento' ? 'lento' : movimiento === 'hero' ? 'hero-foto' : undefined;
  const clases = [estilos.imagen, tono ? estilos.tono : undefined, claseMovimiento]
    .filter(Boolean)
    .join(' ');
  const estilo: CSSProperties = { objectPosition: posicion };

  return (
    <div className={[estilos.recorte, movimiento === 'hero' ? estilos.recorteHero : undefined].filter(Boolean).join(' ')}>
      <picture>
        <source srcSet={`/img/${base}.webp`} type="image/webp" />
        <img
          className={clases}
          src={`/img/${base}.jpg`}
          alt={alt}
          width={ancho}
          height={alto}
          style={estilo}
          loading={prioridad ? 'eager' : 'lazy'}
          fetchPriority={prioridad ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>
      {velo > 0 ? <div className={estilos.velo} style={{ opacity: velo }} aria-hidden /> : null}
      {sombra ? <div className={estilos.sombra} aria-hidden /> : null}
    </div>
  );
}
