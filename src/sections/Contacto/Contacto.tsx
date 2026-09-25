import { useState } from 'react';
import type { FormEvent } from 'react';
import { Titulo } from '../../ui/Titulo/Titulo';
import { Boton } from '../../ui/Boton/Boton';
import { IconoWhatsApp } from '../../ui/Icono';
import { OPCION_EVALUACION, tratamientos } from '../../data/tratamientos';
import { sitio } from '../../data/site';
import { SECCIONES } from '../../lib/navegacion';
import { buildMensajeContacto, buildWhatsAppUrl, nombreCompleto } from '../../lib/whatsapp';
import estilos from './Contacto.module.css';

const opciones = [
  ...tratamientos.map((t) => ({ id: t.id, nombre: nombreCompleto(t) })),
  OPCION_EVALUACION,
];

/**
 * Formulario que arma el mensaje y abre WhatsApp. No envía nada a ningún servidor:
 * el sitio es estático y la conversación ocurre en el chat.
 */
export function Contacto() {
  const [nombre, setNombre] = useState('');
  const [servicioId, setServicioId] = useState(opciones[0]?.id ?? '');
  const [comentario, setComentario] = useState('');
  const [aviso, setAviso] = useState<string | null>(null);

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const servicio = opciones.find((o) => o.id === servicioId)?.nombre ?? OPCION_EVALUACION.nombre;
    const url = buildWhatsAppUrl(buildMensajeContacto(nombre, servicio, comentario));
    if (url === null) {
      setAviso('El número de WhatsApp aún no está configurado. Escríbenos por Instagram mientras tanto.');
      return;
    }
    setAviso(null);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id={SECCIONES.contacto} className={`${estilos.contacto} seccion`}>
      <div className={`${estilos.contenido} contenido`}>
        <Titulo
          etiqueta="Reserva tu hora"
          linea1="Cuéntanos"
          linea2="qué necesitas"
          descripcion={`Al enviar, se abre WhatsApp con tu mensaje listo. Respondemos en horario de atención al ${sitio.whatsappVisible}.`}
        />

        <form className={`${estilos.formulario} entra`} onSubmit={enviar} noValidate>
          <div className={estilos.campo}>
            <label htmlFor="contacto-nombre" className={`${estilos.rotulo} caps`}>
              Tu nombre
            </label>
            <input
              id="contacto-nombre"
              className={estilos.entrada}
              type="text"
              name="nombre"
              autoComplete="name"
              placeholder="Nombre y apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={estilos.campo}>
            <label htmlFor="contacto-servicio" className={`${estilos.rotulo} caps`}>
              Tratamiento
            </label>
            <select
              id="contacto-servicio"
              className={estilos.entrada}
              name="servicio"
              value={servicioId}
              onChange={(e) => setServicioId(e.target.value)}
            >
              {opciones.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className={`${estilos.campo} ${estilos.ancho}`}>
            <label htmlFor="contacto-mensaje" className={`${estilos.rotulo} caps`}>
              Mensaje (opcional)
            </label>
            <textarea
              id="contacto-mensaje"
              className={`${estilos.entrada} ${estilos.area}`}
              name="mensaje"
              rows={3}
              placeholder="Horario que te acomoda, dudas sobre tu piel…"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          <div className={`${estilos.envio} ${estilos.ancho}`}>
            <Boton type="submit" icono={<IconoWhatsApp />}>
              Enviar por WhatsApp
            </Boton>
          </div>

          {aviso ? (
            <p className={`${estilos.aviso} ${estilos.ancho}`} role="status">
              {aviso}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
