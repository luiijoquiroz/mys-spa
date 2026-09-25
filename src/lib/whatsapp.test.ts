import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildMensajeContacto,
  buildMensajeTratamiento,
  buildWhatsAppUrl,
  getWhatsAppNumber,
} from './whatsapp';
import type { Tratamiento } from '../types';

const peeling: Tratamiento = {
  id: 'peeling-quimico',
  numero: '03',
  nombre: 'Peeling',
  nombreEnfasis: 'químico',
  descripcion: '',
  esMedico: false,
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getWhatsAppNumber', () => {
  it('devuelve null cuando no hay número configurado', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '');
    expect(getWhatsAppNumber()).toBeNull();
  });

  it('normaliza el número del entorno dejando solo dígitos', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '+56 9 1234 5678');
    expect(getWhatsAppNumber()).toBe('56912345678');
  });
});

describe('buildWhatsAppUrl', () => {
  it('no genera un enlace sin destinatario', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '');
    expect(buildWhatsAppUrl('hola')).toBeNull();
  });

  it('arma la URL de wa.me con el mensaje codificado', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '56912345678');
    expect(buildWhatsAppUrl('Hola, ¿tienen hora?')).toBe(
      'https://wa.me/56912345678?text=Hola%2C%20%C2%BFtienen%20hora%3F',
    );
  });
});

describe('buildMensajeTratamiento', () => {
  it('omite precio y duración mientras estén pendientes', () => {
    expect(buildMensajeTratamiento(peeling)).toBe(
      'Hola, quiero reservar *Peeling químico*. ¿Qué horarios tienen disponibles?',
    );
  });

  it('incluye duración y precio cuando existen', () => {
    expect(buildMensajeTratamiento({ ...peeling, duracionMin: 45, precio: 45000 })).toContain(
      '*Peeling químico* (45 min · $45.000)',
    );
  });
});

describe('buildMensajeContacto', () => {
  it('se presenta con el nombre y el tratamiento elegido', () => {
    expect(buildMensajeContacto('Ana', 'Exfoliación', 'Prefiero por la tarde')).toBe(
      'Hola, soy Ana. Quiero reservar *Exfoliación*. Prefiero por la tarde ¿Qué horarios tienen disponibles?',
    );
  });

  it('funciona sin nombre ni comentario', () => {
    expect(buildMensajeContacto('  ', 'Exfoliación', '')).toBe(
      'Hola. Quiero reservar *Exfoliación*. ¿Qué horarios tienen disponibles?',
    );
  });
});
