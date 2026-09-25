import { Titulo } from '../../ui/Titulo/Titulo';
import { Marco } from '../../ui/Marco/Marco';
import { Foto } from '../../ui/Foto/Foto';
import { IconoInstagram } from '../../ui/Icono';
import { FOTOS_ESPACIO, sitio } from '../../data/site';
import { SECCIONES } from '../../lib/navegacion';
import estilos from './Espacio.module.css';

/**
 * El espacio, en dos planos: la foto grande se mueve lento y la pequeña, superpuesta,
 * va más rápido y en sentido contrario. Es el único momento de profundidad del sitio.
 */
export function Espacio() {
  return (
    <section id={SECCIONES.espacio} className={`${estilos.espacio} seccion`}>
      <div className={`${estilos.contenido} contenido`}>
        <div className={estilos.texto}>
          <Titulo
            etiqueta="El espacio"
            linea1="Cabina, calma"
            linea2="y detalle"
            descripcion={
              <span className={estilos.soloEscritorio}>
                Luz tenue, toallas tibias y una cabina pensada para que el tiempo pase más lento.
              </span>
            }
          />
          <a href={sitio.instagramUrl} className={`${estilos.instagram} caps`}>
            {sitio.instagram} en Instagram <IconoInstagram tamano={16} />
          </a>
        </div>

        <div className={estilos.planos}>
          <Marco className={estilos.grande} forma="arco">
            <Foto {...FOTOS_ESPACIO.grande} movimiento="lento" />
          </Marco>
          <div className={`${estilos.pequena} rapido`}>
            <Marco forma="recto" className={estilos.pequenaMarco}>
              <Foto {...FOTOS_ESPACIO.pequena} movimiento="ninguno" />
            </Marco>
          </div>
        </div>
      </div>
    </section>
  );
}
