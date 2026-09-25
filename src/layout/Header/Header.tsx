import { useState } from 'react';
import { IconoCerrar, IconoMenu, IconoWhatsApp } from '../../ui/Icono';
import { Boton } from '../../ui/Boton/Boton';
import { sitio } from '../../data/site';
import { ancla, MENU, SECCIONES } from '../../lib/navegacion';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import estilos from './Header.module.css';

/** Cabecera fija con desenfoque, línea de progreso de scroll y menú móvil. */
export function Header() {
  const [abierto, setAbierto] = useState(false);
  const reserva = buildWhatsAppUrl() ?? ancla(SECCIONES.contacto);
  const esExterno = reserva.startsWith('http');

  return (
    <header className={estilos.cabecera}>
      <span className={`${estilos.progreso} progreso`} aria-hidden />
      <div className={`${estilos.barra} contenido`}>
        <a href={ancla(SECCIONES.inicio)} className={estilos.marca} aria-label={`${sitio.nombre}, inicio`}>
          <img
            className={estilos.monograma}
            src="/img/monograma-192.png"
            alt=""
            width={36}
            height={36}
            decoding="async"
          />
          <span className={estilos.nombres}>
            <span className={`${estilos.nombre} serif`}>MYS SPA</span>
            <span className={`${estilos.tagline} caps`}>{sitio.tagline}</span>
          </span>
        </a>

        <nav className={estilos.menuEscritorio} aria-label="Secciones">
          {MENU.map((item) => (
            <a key={item.id} href={ancla(item.id)} className="caps">
              {item.etiqueta}
            </a>
          ))}
        </nav>

        <div className={estilos.acciones}>
          <Boton
            href={reserva}
            externo={esExterno}
            variante="contorno"
            className={estilos.reservar}
            icono={<IconoWhatsApp tamano={16} />}
          >
            Reservar
          </Boton>
          <button
            type="button"
            className={estilos.hamburguesa}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <IconoCerrar tamano={24} /> : <IconoMenu tamano={24} />}
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        className={[estilos.menuMovil, abierto ? estilos.menuAbierto : undefined].filter(Boolean).join(' ')}
        aria-label="Secciones"
        hidden={!abierto}
      >
        {MENU.map((item) => (
          <a key={item.id} href={ancla(item.id)} className="serif" onClick={() => setAbierto(false)}>
            {item.etiqueta}
          </a>
        ))}
        <a href={ancla(SECCIONES.contacto)} className="serif" onClick={() => setAbierto(false)}>
          Reserva tu hora
        </a>
      </nav>
    </header>
  );
}
