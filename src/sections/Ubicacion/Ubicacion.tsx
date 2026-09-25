import { Titulo } from '../../ui/Titulo/Titulo';
import { Marco } from '../../ui/Marco/Marco';
import { Marcador } from '../../ui/Marcador/Marcador';
import { Boton } from '../../ui/Boton/Boton';
import { IconoFlecha } from '../../ui/Icono';
import { sitio } from '../../data/site';
import { SECCIONES } from '../../lib/navegacion';
import estilos from './Ubicacion.module.css';

/** Dónde estamos: dirección real, horarios (pendientes) y enlace a Google Maps. */
export function Ubicacion() {
  const [calle, numero] = separarNumero(sitio.direccion);

  return (
    <section id={SECCIONES.ubicacion} className={`${estilos.ubicacion} seccion`}>
      <div className={`${estilos.contenido} contenido`}>
        <div className={estilos.texto}>
          <Titulo
            etiqueta="Dónde estamos"
            linea1={calle}
            linea2={numero}
            descripcion={`${sitio.comuna}, ${sitio.ciudad}. ${sitio.referenciaMetro} ${sitio.pisoOficina}`}
          />
          <dl className={estilos.horarios}>
            {sitio.horarios.map((bloque) => (
              <div key={bloque.id} className={estilos.bloque}>
                <dt className={`${estilos.dias} caps`}>{bloque.dias}</dt>
                <dd className={`${estilos.horas} serif`}>{bloque.horario}</dd>
              </div>
            ))}
          </dl>
          <Boton href={sitio.mapaUrl} externo variante="contorno" className={estilos.llegar} icono={<IconoFlecha tamano={16} />}>
            Cómo llegar
          </Boton>
        </div>

        <Marco forma="arco-suave" className={`${estilos.mapa} entra`} anillo>
          <Marcador>{`Mapa · ${sitio.direccion}`}</Marcador>
        </Marco>
      </div>
    </section>
  );
}

/** «Luis Thayer Ojeda 157» → ['Luis Thayer', 'Ojeda 157'] para el título en dos líneas. */
function separarNumero(direccion: string): [string, string] {
  const partes = direccion.split(' ');
  if (partes.length < 3) return [direccion, ''];
  const corte = Math.ceil(partes.length / 2);
  return [partes.slice(0, corte).join(' '), partes.slice(corte).join(' ')];
}
