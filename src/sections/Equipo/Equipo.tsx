import { Titulo } from '../../ui/Titulo/Titulo';
import { Marco } from '../../ui/Marco/Marco';
import { Marcador } from '../../ui/Marcador/Marcador';
import { equipo } from '../../data/equipo';
import { SECCIONES } from '../../lib/navegacion';
import estilos from './Equipo.module.css';

/** Quién te atiende. Fondo profundo con arco superior y marco doble. */
export function Equipo() {
  return (
    <section id={SECCIONES.equipo} className={estilos.equipo}>
      <div className="marco-doble" aria-hidden />
      <div className={`${estilos.contenido} contenido`}>
        <Titulo
          etiqueta="Quién te atiende"
          linea1="Respaldo médico"
          linea2="donde importa"
          claro
          descripcion={
            <span className={estilos.soloEscritorio}>
              Los procedimientos médicos los realiza una médica. Para todo lo demás, la evaluación
              previa define qué necesita tu piel y qué no.
            </span>
          }
        />

        <ul className={estilos.lista}>
          {equipo.map((persona) => (
            <li key={persona.id} className={`${estilos.persona} entra`}>
              <Marco forma="arco" className={estilos.retrato}>
                {persona.foto ? (
                  <img src={persona.foto} alt={persona.fotoAlt ?? persona.nombre} loading="lazy" decoding="async" />
                ) : (
                  <Marcador oscuro>Foto</Marcador>
                )}
              </Marco>
              <div className={estilos.datos}>
                <h3 className={`${estilos.nombre} serif`}>{persona.nombre}</h3>
                <p className={`${estilos.cargo} caps`}>{persona.cargo}</p>
                <p className={estilos.descripcion}>{persona.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
