import estilos from './Marcador.module.css';

interface MarcadorProps {
  /** Texto del marcador («Foto», «Mapa · Luis Thayer Ojeda 157»). */
  children: string;
  oscuro?: boolean;
}

/** Hueco visible para una imagen que aún no existe. Ocupa el marco que lo contiene. */
export function Marcador({ children, oscuro = false }: MarcadorProps) {
  return (
    <div className={[estilos.marcador, oscuro ? estilos.oscuro : undefined].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
