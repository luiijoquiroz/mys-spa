import { Titulo } from '../../ui/Titulo/Titulo';
import { IconoFlecha } from '../../ui/Icono';
import { tratamientos } from '../../data/tratamientos';
import { formatearDuracion, formatearPrecio } from '../../lib/formato';
import { ancla, SECCIONES } from '../../lib/navegacion';
import { buildMensajeTratamiento, buildWhatsAppUrl } from '../../lib/whatsapp';
import estilos from './Tratamientos.module.css';

/** Lista editorial de los cuatro tratamientos, con filetes finos y sin tarjetas. */
export function Tratamientos() {
  return (
    <section id={SECCIONES.tratamientos} className={`${estilos.tratamientos} seccion`}>
      <div className={`${estilos.contenido} contenido`}>
        <div className={estilos.cabecera}>
          <Titulo etiqueta="Tratamientos" linea1="Cuatro tratamientos," linea2="un objetivo claro" />
          <p className={`${estilos.nota} parrafo`}>
            Los valores se confirman en la evaluación. Reserva directo por WhatsApp con el
            tratamiento ya escrito.
          </p>
        </div>

        <ul className={estilos.lista}>
          {tratamientos.map((t) => {
            const enlace = buildWhatsAppUrl(buildMensajeTratamiento(t)) ?? ancla(SECCIONES.contacto);
            return (
              <li key={t.id} className={`${estilos.fila} entra`}>
                <div className={estilos.encabezado}>
                  <span className={`${estilos.numero} serif`}>{t.numero}</span>
                  {t.esMedico ? (
                    <span className={`${estilos.medico} caps`}>Procedimiento médico</span>
                  ) : (
                    <span className={`${estilos.duracion} ${estilos.duracionMovil}`}>{formatearDuracion(t.duracionMin)}</span>
                  )}
                </div>
                <h3 className={`${estilos.nombre} serif`}>
                  {t.nombre}
                  {t.nombreEnfasis ? <em> {t.nombreEnfasis}</em> : null}
                </h3>
                <p className={`${estilos.descripcion} parrafo`}>
                  {t.descripcion}
                  <span className={`${estilos.duracion} ${estilos.duracionEscritorio}`}>
                    {formatearDuracion(t.duracionMin)}
                  </span>
                </p>
                <div className={estilos.pie}>
                  <span className={`${estilos.precio} serif`}>{formatearPrecio(t.precio)}</span>
                  <a
                    href={enlace}
                    className={`${estilos.reservar} caps`}
                    {...(enlace.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    Reservar <IconoFlecha tamano={16} />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
