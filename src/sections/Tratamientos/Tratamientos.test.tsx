import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Tratamientos } from './Tratamientos';
import { tratamientos } from '../../data/tratamientos';

describe('Tratamientos', () => {
  it('muestra los cuatro tratamientos con su marcador de precio mientras no hay datos', () => {
    render(<Tratamientos />);
    const filas = screen.getAllByRole('listitem');
    expect(filas).toHaveLength(tratamientos.length);
    expect(screen.getAllByText('[PRECIO]')).toHaveLength(tratamientos.length);
  });

  it('etiqueta el ácido hialurónico como procedimiento médico', () => {
    render(<Tratamientos />);
    const fila = screen.getByRole('heading', { name: /hialurónico/i }).closest('li');
    expect(fila).not.toBeNull();
    if (fila) {
      expect(within(fila).getByText(/procedimiento médico/i)).toBeInTheDocument();
    }
  });

  it('sin número de WhatsApp, «Reservar» lleva al formulario de contacto', () => {
    render(<Tratamientos />);
    const enlaces = screen.getAllByRole('link', { name: /reservar/i });
    for (const enlace of enlaces) {
      expect(enlace).toHaveAttribute('href', '#contacto');
    }
  });
});
