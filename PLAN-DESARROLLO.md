# Mys Spa · plan de desarrollo del sitio

Fecha: 2026-09-24. Diseño aprobado: **Portada v3 · spa con parallax** en el canvas
<https://claude.ai/artifact/KWuwrgT23jv5gDCfu8ReqC> (página «Portada v3 · spa con parallax»).
Copia local de los marcos en `diseno/v2/` (`Main.dc.html` = móvil 390, `Escritorio.dc.html` = 1440).

Manda `../../ESTANDAR-INFRA.md` y `../CLAUDE.md`: código en un repo propio con remoto en GitHub,
infra en `clients-iac/sites/mys-spa/prod`, deploy con `gh-actions/deploy-static-site@v2.0.1`.

---

## 0. Decisiones que solo el cliente puede tomar (bloquean el arranque)

| # | Dato | Estado | Dónde va |
|---|---|---|---|
| D1 | **Dominio** (¿`mys-spa.cl`? ¿otro?) y quién lo registra | pendiente | `domain_name` del root de Terraform; zona Route 53 en `platform-iac/account` |
| D2 | Número de WhatsApp de reservas (formato `569XXXXXXXX`) | pendiente | `VITE_WHATSAPP_NUMBER` y `src/data/site.ts` |
| D3 | Horarios (L–V, sábado; ¿domingo?) | pendiente | `src/data/site.ts`, JSON-LD |
| D4 | Precios y duración de los 4 tratamientos | pendiente | `src/data/services.ts` |
| D5 | Piso / oficina en Luis Thayer Ojeda 157 | pendiente | `src/data/site.ts` |
| D6 | Instagram (@usuario) | pendiente | `src/data/site.ts` |
| D7 | Dra. Camila Carrazco: especialidad y N.º de registro (Superintendencia de Salud) | pendiente | sección Equipo |
| D8 | Mayrelis Alvarez: confirmar ortografía (se escribió también «Mairelys»), formación y años de experiencia | pendiente | sección Equipo |
| D9 | Fotos propias (ver §6). Mientras no existan, quedan las de referencia de Pexels con su crédito | pendiente | `public/img/` |
| D10 | Texto del manifiesto «La piel no se maquilla: se cuida. Lo demás es luz que llega sola.» ¿se mantiene? | propuesto | franja 3 |

Sin D1 no se puede aplicar Terraform. Todo lo demás se puede programar con `[CORCHETES]` y
reemplazar después: el sitio lee sus datos de `src/data/`.

---

## 1. Stack y estructura (igual que `mia-spa-web`, para reutilizar lo ya probado)

- **React 19 + Vite 7 + TypeScript**, `pnpm` (declarar `packageManager` en `package.json`: el
  workflow de deploy lo lee de ahí). Node ≥ 20.19.
- **Sin framer-motion ni lenis.** Todo el movimiento del diseño es CSS puro con animaciones
  ligadas al scroll (`animation-timeline: view()` / `scroll(root)`) y `@supports` como guardia.
  Menos bundle y el fallback es el sitio quieto, que es exactamente lo que se ve en Firefox.
- Tipografías por Google Fonts (`Cormorant Garamond` 300–600 + itálicas, `Jost` 300–600) con
  `preconnect`, como en `mia-spa-web/index.html`.
- Una sola página con anclas: `#inicio #metodo #servicios #espacio #equipo #ubicacion #contacto`.
  `enable_spa_fallback = false` en Terraform.

```
mys-spa/            (raíz del repo luiijoquiroz/mys-spa; PLAN-DESARROLLO.md y diseno/ viven aquí también)
├── index.html                  # meta, OG, JSON-LD (tipo BeautySalon o MedicalClinic, ver §4)
├── public/img/                 # fotos optimizadas (webp + jpg de respaldo), logo, og-image
├── src/
│   ├── data/site.ts            # identidad, dirección, horarios, whatsapp, redes, equipo
│   ├── data/services.ts        # los 4 tratamientos (nombre, descripción, precio, duración, esMedico)
│   ├── lib/whatsapp.ts         # copiar de mia-spa-web (wa.me con mensaje por tratamiento)
│   ├── styles/tokens.css       # paleta y tipografía del manual (ver §2)
│   ├── styles/motion.css       # .franja .lento .rapido .hero-foto .entra + reduced-motion
│   ├── components/
│   │   ├── Header/             # sticky, blur, menú móvil
│   │   ├── Hero/               # franja full-bleed con .hero-foto
│   │   ├── Trust/              # 3 filas: evaluación, respaldo médico, dirección
│   │   ├── PhotoBand/          # franja fotográfica reutilizable (foto, línea itálica, etiqueta)
│   │   ├── Method/             # 01 02 03
│   │   ├── Services/           # lista editorial; en escritorio grid de 5 columnas
│   │   ├── Space/              # dos planos (.lento + .rapido) + enlace Instagram
│   │   ├── Team/               # fondo #3C4F57, arco superior, marco doble
│   │   ├── Location/           # dirección real, horarios, mapa, «Cómo llegar»
│   │   ├── Contact/            # formulario que arma el mensaje de WhatsApp
│   │   └── Footer/
│   ├── App.tsx
│   └── main.tsx
└── .github/workflows/deploy.yml
```

## 2. Tokens del diseño (copiar tal cual a `tokens.css`)

```css
:root {
  --marmol: #F0EFED;  --marmol-2: #E8E7E5;  --blanco: #FAFAF8;
  --mineral: #7A9099; --mineral-sub: #89A2AB; --mineral-ink: #5B727C;
  --tinta: #33474F;   --tinta-suave: #4F6570; --gris-texto: #5A6A70;
  --profundo: #3C4F57; --linea: #C9D2D4; --linea-suave: #D9DEDF;
  --claro: #DCE3E5;   --claro-2: #A9BCC2;
  --serif: 'Cormorant Garamond', Garamond, Georgia, serif;
  --sans: 'Jost', 'Helvetica Neue', Arial, sans-serif;
}
```

Contraste: `#7A9099` solo para display ≥ 24 px, numerales y líneas. Texto corriente en
`--tinta` / `--tinta-suave`; texto pequeño gris en `--gris-texto` (4.5:1 sobre mármol).
El fondo de mármol es el `background-image` de `.marmol` en los `.dc.html`; se copia sin cambios.

## 3. Movimiento: la receta exacta

Regla: **solo se mueven las fotos; el texto se queda quieto.** Todo en `motion.css`, tomado de
`diseno/v2/*.dc.html` (bloque `/* Movimiento */`).

| Pieza | Cómo | Valores móvil / escritorio |
|---|---|---|
| Hero | `.franja` con `overflow: clip`; `<img>` 140 % de alto, `top: -20 %`; `animation-timeline: scroll(root)`, rango `0 700px` / `0 900px`, `translateY(0 → 130px / 180px)` | la foto baja más lento de lo que sube la página |
| Franjas fotográficas (3) | `<img>` 130 % de alto, `top: -15 %`; `animation-timeline: view()`, rango `cover 0% → 100%`, `translateY(-7% → 7%)` | igual en ambos |
| Dos planos (Espacio) | foto grande `.lento` (igual que franja); marco pequeño `.rapido` con `translateY(+44px → -44px)` / `(+64px → -64px)` | |
| Entradas de texto | `.entra`: `translateY(16px)` + opacidad, `view()` rango `entry 0% → 50%` | |
| Carga del hero | `.rev` (línea a línea) y `.aparece`, animaciones de tiempo, 1 s | |

Reglas técnicas que ya nos mordieron:

- **`overflow: clip`, nunca `overflow: hidden`** en un ancestro de un elemento con `view()`:
  `hidden` crea un contenedor de scroll y la animación queda congelada.
- Estado base = estado final. Sin soporte de scroll-timeline (Firefox) el sitio se ve quieto y
  completo. Envolver las reglas en `@supports (animation-timeline: view())`.
- `@media (prefers-reduced-motion: reduce)` apaga todo.
- Sin JS para el movimiento. No hay que instalar nada.

## 4. SEO, datos estructurados y mensajería

- `index.html`: title «Mys Spa | Estética facial y cosmetología en Providencia», description,
  Open Graph con `og-image.jpg` 1200×630 (foto + logo), `lang="es"`.
- JSON-LD tipo **`BeautySalon`** (los tratamientos son estéticos; si el cliente quiere destacar la
  parte médica se evalúa `MedicalClinic`, pero exige datos que hoy no tenemos). Copiar la
  estructura de `mia-spa-web/index.html` y reemplazar nombre, dirección, horarios, teléfono.
- WhatsApp: `buildServiceWhatsAppUrl(servicio)` de `mia-spa-web/src/lib/whatsapp.ts` genera
  «Hola, quiero reservar *Limpieza facial profunda* (60 min, $X). ¿Qué horarios tienen?». El
  formulario de Contacto solo arma ese mensaje; no envía nada a ningún servidor.
- Variables `VITE_*` son públicas. Solo `VITE_WHATSAPP_NUMBER`. Ninguna clave.

## 5. Accesibilidad y rendimiento (criterios de aceptación)

- Lighthouse móvil ≥ 90 en las cuatro categorías antes del primer deploy.
- Fotos en `webp` con `jpg` de respaldo, ≤ 250 KB cada una a 1600 px; el hero con `fetchpriority="high"`.
- Contraste 4.5:1 en todo texto; texto sobre foto siempre con el degradado `.sombra`.
- Botones y enlaces ≥ 44 px; `aria-label` en iconos; `<label>` en cada campo.
- `prefers-reduced-motion` respetado (ya en el CSS del diseño).

## 6. Fotografía (encargo al cliente)

Las seis fotos actuales son de referencia (Pexels, licencia libre, crédito en el pie). Para el
sitio real se necesitan, con luz natural y tonos fríos o neutros:

1. Cabina vacía, horizontal (franja «Cabina en calma»).
2. Detalle de manos aplicando producto, horizontal (hero o franja 2).
3. Retrato de la Dra. Camila Carrazco, vertical 4:5.
4. Retrato de Mayrelis Alvarez, vertical 4:5.
5. Textura de piel de cerca, horizontal (franja «Manifiesto»).
6. Recepción o detalle del espacio (toallas, productos), horizontal y una vertical.

Con fotos propias frías, el velo azul mineral (`.velo`, 35 %) se baja o se quita.

## 7. Infraestructura y despliegue (orden de ejecución)

Sigue al pie de la letra «Alta de un sitio nuevo» de `clients-iac/README.md`.

1. **Repo del sitio** `luiijoquiroz/mys-spa` (privado, rama `main`, remoto SSH `git@github.com:luiijoquiroz/mys-spa.git`, agregado el 2026-09-25).
   Anotar `owner_id` y `repo_id`: `gh api users/luiijoquiroz --jq .id` y
   `gh api repos/luiijoquiroz/mys-spa --jq .id`. Hacen falta para el `sub` inmutable del rol.
2. **Root Terraform** `clients-iac/sites/mys-spa/prod`, copiado de `sites/mia-spa/prod`:
   - `backend.tf`: key `clients-iac/mys-spa/prod/terraform.tfstate` en `tfstate-448049794713`.
   - `terraform.tfvars`: `project = "mys-spa"`, `client = "mys-client"`, `domain_name` = D1,
     `route53_zone_id` = la zona que `platform-iac/account` cree para el dominio (o vacío y DNS
     manual), `github_subjects = ["repo:luiijoquiroz@<owner_id>/mys-spa@<repo_id>:ref:refs/heads/main"]`,
     `enable_spa_fallback = false`, WAF en modo conteo, `geo_restriction_countries = []`.
   - Módulos por tag: `static_site`, `waf`, `github_deploy_role`. Usar el último tag que ya
     consuma un root en verde (`brivark/prod` está en v1.1.0).
   - Verificación sin credenciales: `terraform fmt -check -recursive` y
     `terraform -chdir=sites/mys-spa/prod init -backend=false && terraform validate`.
   - `terraform plan` con backend real **solo desde una sesión** y con el usuario avisado.
     **El `apply` lo ejecuta Luis.** Outputs necesarios: `github_deploy_role_arn`,
     `site_bucket_name`, `distribution_id`.
3. **Dominio y DNS.** Si D1 es un dominio nuevo: registrarlo, crear la zona en
   `platform-iac/account` (única fuente de zonas), y pasar `route53_zone_id` al root. El
   certificado ACM lo valida el módulo por DNS.
4. **Workflow** `.github/workflows/deploy.yml` en `mys-spa`, copia del de `mia-spa-web`:
   `uses: luiijoquiroz/gh-actions/.github/workflows/deploy-static-site.yaml@v2.0.1`,
   `aws-role-arn: ${{ vars.AWS_DEPLOY_ROLE_ARN }}`, `s3-bucket` y `cloudfront-distribution-id`
   con los outputs del apply. Variable de repo: `gh variable set AWS_DEPLOY_ROLE_ARN --body <arn>`.
5. **Primer deploy** por push a `main`. Verificar: `https://<dominio>` con HTTPS, cabeceras de
   seguridad, `assets/*` con `max-age=31536000, immutable`, `index.html` sin caché.
6. **Cierre**: fila nueva en `ESTANDAR-INFRA.md` §6 (mapa proyecto → infra) y en la tabla de
   `clients-iac/README.md`, con fecha.

Costo estimado del sitio: el mismo que mia-spa.cl (S3 + CloudFront PriceClass_All + WAF en
conteo + ACM). Si el presupuesto aprieta, `waf` puede ir apagado como en brivark, decisión
documentada en el tfvars.

## 8. Avance

| Fecha | Paso | Estado |
|---|---|---|
| 2026-09-25 | Código creado (primero en `mys-spa-web/`, movido a la raíz del repo el mismo día) (React 19 + Vite 7 + TS estricto, pnpm, CSS Modules, Vitest). Portadas móvil y escritorio portadas completas desde `diseno/v2/`; parallax en CSS puro; fotos de referencia optimizadas en webp + jpg; formulario que abre WhatsApp; JSON-LD `BeautySalon`. `typecheck`, `lint`, `test` (11) y `build` en verde; `pnpm audit` sin vulnerabilidades. Git en `main` | ✓ código local |
| — | Revisión visual en navegador (Chrome móvil y escritorio, Firefox para el fallback) y Lighthouse | pendiente |
| — | Remoto `git@github.com:luiijoquiroz/mys-spa.git` agregado el 2026-09-25 (repositorio vacío en GitHub); primer commit y push | pendiente |
| — | Terraform, dominio, workflow, primer deploy | pendiente de D1 |

## 9. Orden de trabajo sugerido (una sesión por paso)

1. Scaffold React + Vite + TS, tokens, fuentes, `motion.css`, datos con
   corchetes. Portar sección por sección desde `diseno/v2/Main.dc.html` (móvil primero) y
   `Escritorio.dc.html` (media query ≥ 1024 px). Commit por sección.
2. Optimizar fotos de referencia a webp y montar el hero y las tres franjas. Probar el parallax
   en Chrome móvil y escritorio, y el fallback en Firefox.
3. Lighthouse, accesibilidad, JSON-LD. Remoto en GitHub y primer push.
4. Terraform (root + plan). Apply por Luis. Workflow y primer deploy.
5. Reemplazar corchetes y fotos a medida que el cliente entregue D1–D10.
