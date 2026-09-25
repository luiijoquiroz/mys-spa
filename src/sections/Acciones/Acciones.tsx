import { Boton } from '../../ui/Boton/Boton';
import { IconoWhatsApp } from '../../ui/Icono';
import { ancla, SECCIONES } from '../../lib/navegacion';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import estilos from './Acciones.module.css';

/** Botones principales bajo el hero. Solo en móvil: en escritorio van dentro del hero. */
export function Acciones() {
  const reserva = buildWhatsAppUrl() ?? ancla(SECCIONES.contacto);
  return (
    <div className={`${estilos.acciones} seccion aparece`}>
      <Boton href={reserva} externo={reserva.startsWith('http')} icono={<IconoWhatsApp />}>
        Reservar por WhatsApp
      </Boton>
      <Boton href={ancla(SECCIONES.tratamientos)} variante="contorno">
        Ver tratamientos
      </Boton>
    </div>
  );
}
