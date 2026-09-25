import type { SVGProps } from 'react';

type IconoProps = SVGProps<SVGSVGElement> & { tamano?: number };

function base({ tamano = 18, ...resto }: IconoProps) {
  return {
    width: tamano,
    height: tamano,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...resto,
  };
}

export function IconoWhatsApp(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 18.9z" />
      <path d="M9.5 9.5c.3 2 2 3.8 4 4.2l1.2-1.2 2 1c-.4 1.4-1.6 2-3 1.6a8 8 0 0 1-5-5c-.4-1.4.2-2.6 1.6-3l1 2z" />
    </svg>
  );
}

export function IconoInstagram(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function IconoFlecha(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconoCheck(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

export function IconoEscudo(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  );
}

export function IconoPin(props: IconoProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function IconoMenu(props: IconoProps) {
  return (
    <svg {...base({ strokeWidth: 1.5, ...props })}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconoCerrar(props: IconoProps) {
  return (
    <svg {...base({ strokeWidth: 1.5, ...props })}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
