# mys-spa

Sitio de una sola página de **Mys Spa**, estética facial y cosmetología en Providencia,
Santiago. Diseño aprobado el 2026-09-24 («Portada v3 · spa con parallax», canvas en
`diseno/v2/`). Plan completo en `PLAN-DESARROLLO.md`.

Sitio estático (React 19 + Vite + TypeScript) que se sirve desde S3 + CloudFront; la
infraestructura vive en `clients-iac/sites/mys-spa/prod` y el deploy en el workflow
reutilizable `gh-actions/deploy-static-site`.

## Desarrollo

```bash
pnpm install
cp .env.example .env     # opcional: VITE_WHATSAPP_NUMBER
pnpm dev                 # http://localhost:5173
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

Node ≥ 20.19, pnpm 11 (`packageManager` en `package.json`).

## Dónde está cada cosa

```
src/
├── data/        site.ts (identidad, dirección, horarios, fotos) · tratamientos.ts · equipo.ts
├── lib/         whatsapp.ts (wa.me con mensaje) · formato.ts · navegacion.ts
├── styles/      tokens.css (manual de marca) · global.css · motion.css (parallax)
├── ui/          Boton · Foto · PhotoBand · Marco · Marcador · Titulo · Icono   (sin negocio)
├── layout/      Header · Footer
└── sections/    Hero · Acciones · Confianza · Metodo · Tratamientos · Espacio · Equipo · Ubicacion · Contacto
```

Todo lo que va entre `[CORCHETES]` es dato real pendiente del cliente; se cambia en
`src/data/`. Las fotos de `public/img/` son de referencia (Pexels) y se reemplazan por fotos
propias con los mismos nombres de archivo.

## Movimiento

Regla del diseño: **solo se mueven las fotos**. Todo es CSS ligado al scroll
(`animation-timeline`) en `src/styles/motion.css`, sin librerías. En navegadores sin soporte
(Firefox) y con «reducir movimiento» el sitio se ve completo y quieto.

Cuidado con `overflow: hidden` en un ancestro de una foto con parallax: crea un contenedor
de scroll y congela la animación. Se usa `overflow: clip`.

## Seguridad

- Ninguna clave en el código ni en variables `VITE_*` (quedan en el bundle público). La única
  variable es el número de WhatsApp, que es público.
- El formulario no envía datos a ningún servidor: arma el mensaje y abre WhatsApp.
- Cabeceras de seguridad, TLS y WAF los pone la infraestructura (`clients-iac`).
