import { Titulo } from '../../ui/Titulo/Titulo';
import { pasos } from '../../data/tratamientos';
import { SECCIONES } from '../../lib/navegacion';
import estilos from './Metodo.module.css';

/** Cómo trabajamos: evaluación, tratamiento, cuidado en casa. */
export function Metodo() {
  return (
    <section id={SECCIONES.metodo} className={`${estilos.metodo} seccion`}>
      <div className={`${estilos.contenido} contenido`}>
        <Titulo etiqueta="Cómo trabajamos" linea1="Tres pasos," linea2="ningún atajo" />
        <ol className={estilos.pasos}>
          {pasos.map((paso) => (
            <li key={paso.numero} className={`${estilos.paso} entra`}>
              <span className={`${estilos.numero} serif`}>{paso.numero}</span>
              <div className={estilos.texto}>
                <h3 className={`${estilos.titulo} serif`}>{paso.titulo}</h3>
                <p className="parrafo">{paso.descripcion}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
