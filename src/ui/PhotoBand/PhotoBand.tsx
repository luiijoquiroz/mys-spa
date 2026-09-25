import { Foto } from '../Foto/Foto';
import type { FotoProps } from '../Foto/Foto';
import estilos from './PhotoBand.module.css';

export interface PhotoBandProps extends Omit<FotoProps, 'movimiento' | 'sombra'> {
  /** Una sola línea en serif itálica sobre la foto. */
  linea: string;
  /** Etiqueta pequeña en versalitas. */
  etiqueta: string;
  /** Crédito al pie mientras la foto sea de referencia. */
  credito?: string;
}

/**
 * Franja fotográfica a todo el ancho entre secciones. La foto se mueve más lento que la
 * página; el texto se queda quieto. Es la pieza central del parallax del diseño.
 */
export function PhotoBand({ linea, etiqueta, credito = 'Foto de referencia · reemplazar', ...foto }: PhotoBandProps) {
  return (
    <section className={estilos.franja} aria-label={etiqueta}>
      <Foto {...foto} movimiento="lento" sombra />
      <div className={estilos.texto}>
        <p className={`${estilos.linea} serif`}>{linea}</p>
        <p className={`${estilos.etiqueta} caps`}>{etiqueta}</p>
      </div>
      {credito ? <span className={estilos.credito}>{credito}</span> : null}
    </section>
  );
}
