import { Foto } from '../../ui/Foto/Foto';
import { Boton } from '../../ui/Boton/Boton';
import { IconoWhatsApp } from '../../ui/Icono';
import { FOTO_HERO, sitio } from '../../data/site';
import { ancla, SECCIONES } from '../../lib/navegacion';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import estilos from './Hero.module.css';

/**
 * Portada a todo el ancho. La foto baja despacio mientras la página sube (parallax de
 * hero); el titular se revela línea a línea al cargar y después se queda quieto.
 */
export function Hero() {
  const reserva = buildWhatsAppUrl() ?? ancla(SECCIONES.contacto);

  return (
    <section id={SECCIONES.inicio} className={estilos.hero}>
      <Foto {...FOTO_HERO} movimiento="hero" sombra prioridad />

      <div className={estilos.contenido}>
        <div className={estilos.titular}>
          <p className={`${estilos.etiqueta} caps rev`}>
            <span style={{ animationDelay: '0.2s' }}>Estética facial · {sitio.comuna}</span>
          </p>
          <h1 className={`${estilos.h1} serif`}>
            <span className="rev">
              <span style={{ animationDelay: '0.35s' }}>Piel sana,</span>
            </span>
            <span className="rev">
              <span className={estilos.italica} style={{ animationDelay: '0.5s' }}>
                luz propia
              </span>
            </span>
          </h1>
        </div>

        <div className={`${estilos.lateral} aparece`}>
          <p className={`${estilos.descripcion} rev`}>
            <span style={{ animationDelay: '0.65s' }}>{sitio.descripcionCorta}</span>
          </p>
          <div className={estilos.acciones}>
            <Boton href={reserva} externo={reserva.startsWith('http')} icono={<IconoWhatsApp />}>
              Reservar por WhatsApp
            </Boton>
            <Boton href={ancla(SECCIONES.tratamientos)} variante="contorno-claro">
              Ver tratamientos
            </Boton>
          </div>
        </div>
      </div>

      <span className={estilos.credito}>Foto de referencia · reemplazar</span>
    </section>
  );
}
