import { Header } from './layout/Header/Header';
import { Footer } from './layout/Footer/Footer';
import { Hero } from './sections/Hero/Hero';
import { Acciones } from './sections/Acciones/Acciones';
import { Confianza } from './sections/Confianza/Confianza';
import { Metodo } from './sections/Metodo/Metodo';
import { Tratamientos } from './sections/Tratamientos/Tratamientos';
import { Espacio } from './sections/Espacio/Espacio';
import { Equipo } from './sections/Equipo/Equipo';
import { Ubicacion } from './sections/Ubicacion/Ubicacion';
import { Contacto } from './sections/Contacto/Contacto';
import { PhotoBand } from './ui/PhotoBand/PhotoBand';
import { FRANJAS } from './data/site';

/**
 * Portada de una sola página. El orden reproduce el diseño aprobado (Portada v3):
 * las tres franjas fotográficas van entre secciones y son lo único que se mueve
 * al hacer scroll.
 */
export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Acciones />
        <Confianza />
        <PhotoBand {...FRANJAS.cabina} />
        <Metodo />
        <Tratamientos />
        <PhotoBand {...FRANJAS.piel} />
        <Espacio />
        <Equipo />
        <PhotoBand {...FRANJAS.manifiesto} />
        <Ubicacion />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
