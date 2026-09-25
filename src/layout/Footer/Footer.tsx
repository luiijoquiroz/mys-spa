import { IconoInstagram, IconoWhatsApp } from '../../ui/Icono';
import { CREDITO_FOTOS, sitio } from '../../data/site';
import { ancla, SECCIONES } from '../../lib/navegacion';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import estilos from './Footer.module.css';

export function Footer() {
  const whatsapp = buildWhatsAppUrl() ?? ancla(SECCIONES.contacto);
  const anio = new Date().getFullYear();

  return (
    <footer className={estilos.pie}>
      <div className="marco-doble" aria-hidden />
      <div className={`${estilos.contenido} contenido`}>
        <div className={estilos.marca}>
          <picture>
            <source srcSet="/img/logo-mys-spa.webp" type="image/webp" />
            <img
              className={estilos.logo}
              src="/img/logo-mys-spa.jpg"
              alt=""
              width={68}
              height={68}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className={estilos.nombres}>
            <span className={`${estilos.nombre} serif`}>MYS SPA</span>
            <span className={`${estilos.tagline} caps`}>{sitio.tagline}</span>
          </div>
        </div>

        <p className={estilos.datos}>
          {sitio.direccion} · {sitio.comuna}, {sitio.ciudad}
          <br />
          {sitio.whatsappVisible} · {sitio.instagram}
        </p>

        <div className={estilos.redes}>
          <div className={estilos.iconos}>
            <a href={sitio.instagramUrl} aria-label="Instagram" className={estilos.icono}>
              <IconoInstagram tamano={22} strokeWidth={1.5} />
            </a>
            <a
              href={whatsapp}
              aria-label="WhatsApp"
              className={estilos.icono}
              {...(whatsapp.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <IconoWhatsApp tamano={22} strokeWidth={1.5} />
            </a>
          </div>
          <p className={estilos.legal}>
            © {anio} {sitio.nombre}. Estética facial y cosmetología en {sitio.comuna}. {CREDITO_FOTOS}
          </p>
        </div>
      </div>
    </footer>
  );
}
