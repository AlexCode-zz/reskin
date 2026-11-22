# Efectos (partículas, scroll, profundidad)

Los efectos son lo que separa un reskin "con otro color" de uno con vida. Se implementan con
**dos archivos sin dependencias** que se copian al proyecto:

```text
assets/effects/reskin-fx.js    → partículas, reveal, parallax, tilt, spot, glow, imán, scroll, progreso
assets/effects/reskin-fx.css   → estilos de efectos + imágenes animadas (Ken Burns, reveal, zoom, sheen) + utilidades
```

No tocan lógica: se controlan con atributos `data-*` (React no los pisa) y no capturan eventos.
Cumplen `prefers-reduced-motion`, pausan con la pestaña oculta y no ocultan contenido si fallan.

## Destino de los archivos (no negociable)

**Todo lo que el skill añade se copia dentro del proyecto, en la carpeta de código**: nunca en la
carpeta de la skill (`assets/`), nunca en la raíz del repo por comodidad.

| Pieza | Destino |
|---|---|
| `reskin-fx.css` + `reskin-fx.js` | `<src>/reskin/` |
| Imágenes provisionales | `<src>/reskin/images/` |
| Registro de imágenes | `<src>/reskin/RESKIN-IMAGES.md` |

Cómo se resuelve `<src>`:

1. Si el proyecto tiene `src/` → **`src/reskin/`**. Es el caso normal y el esperado por el usuario.
2. Si no hay `src/` pero hay `app/` o `pages/` → `app/reskin/` o `pages/reskin/` (Next sin `src/`).
3. HTML puro sin build → `reskin/` junto al `index.html` (no en otra carpeta del repo).

**Única excepción:** en Next.js los archivos que se cargan por URL van a `public/` por diseño del
framework. Allí solo `public/reskin/reskin-fx.js`; el CSS sigue en `src/reskin/` y se importa desde
`layout`. Nada más se escribe en `public/`.

Si el usuario pide otra ruta, usa la suya y anótala en el brief. Si ya existe una carpeta `reskin/`
en la raíz de un proyecto con `src/`, muévela a `src/reskin/` y actualiza los imports: es el error
que esta regla corrige.

## Instalación por framework (nivel B/C)

| Stack | CSS (`<src>/reskin/`) | JS |
|---|---|---|
| HTML puro | `<link rel="stylesheet" href="reskin/reskin-fx.css">` | `<script src="reskin/reskin-fx.js" defer></script>` |
| React (Vite/CRA) | `import "./reskin/reskin-fx.css"` en `src/main.jsx` | `import "./reskin/reskin-fx.js"` en `src/main.jsx` (efecto lateral) |
| Next.js App Router | `import "./reskin/reskin-fx.css"` en `app/layout.tsx` o `src/app/layout.tsx` | `<Script src="/reskin/reskin-fx.js" strategy="afterInteractive" />` (de `next/script`; archivo en `public/reskin/`) |
| Next.js Pages | `import` en `_app` | `<Script>` en `_app` (archivo en `public/reskin/`) |
| Tailwind v4 | `@import "./reskin/reskin-fx.css";` en el CSS global | igual que React/Next |

Activación (en `<html>`; en React/Next va en `index.html` o en `layout`):

```html
<html data-rs-fx="particles reveal spot magnet scroll"
      data-rs-particles="orbs"
      data-rs-reveal-auto=".rs-card, .rs-stat, .rs-hero > *">
```

`data-rs-reveal-auto` aplica el reveal a todo lo que coincida con el selector **sin editar cada
elemento**: así se cubre la app entera con una línea. Alternativa sin tocar `<html>`:
`window.RESKIN_FX = { fx: "particles reveal", particles: "dust", revealAuto: ".rs-card" }` antes del script.

## Catálogo

| Efecto | Atributo | Resultado | Notas |
|---|---|---|---|
| Partículas | `data-rs-fx="particles"` + `data-rs-particles="stars\|dust\|bubbles\|pixels\|confetti\|orbs"` | Canvas fijo detrás del contenido; color de `--rs-fx-p1..3` | ≤ 90 partículas; 30 fps; con reduced-motion dibuja un frame estático |
| Reveal al scroll | `data-rs-reveal="up\|down\|left\|right\|scale\|pop\|fade"` o `data-rs-reveal-auto` | Entrada con fade + desplazamiento; escalonado automático (`--rs-i`) | Usa `translate`/`scale`, no pisa `transform` |
| Parallax | `data-rs-fx="parallax"` + `data-rs-parallax="0.12"` | La capa se mueve a otra velocidad | No combinar con reveal en el mismo elemento |
| Tilt 3D | `data-rs-fx="tilt"` + `data-rs-tilt="6"` | Inclinación hacia el puntero | Solo punteros finos; no combinar con hover que use `transform` |
| Spotlight | `data-rs-fx="spot"` + `data-rs-spot` | Foco de luz que sigue al cursor dentro de la tarjeta | Color con `--rs-spot` |
| Luz global | `data-rs-fx="glow"` | `--rs-cx/--rs-cy` en `<html>` para `body::after` | Aurora, spatial |
| Scroll | `data-rs-fx="scroll"` | Publica `--rs-scroll` (0–1) en `<html>` para mover luces y gradientes de la escena | Sin barra ni DOM; úsalo con `body::before` |
| Progreso | `data-rs-fx="progress"` | Barra de lectura arriba (también publica `--rs-scroll`) | Landings largas |
| Imán | `data-rs-fx="magnet"` + `data-rs-magnet="8"` | El botón/icono se acerca al cursor y vuelve a su sitio | Cuenta como **momento firma**, no como ambiental; solo punteros finos; máximo 2 por vista |
| Marquee | `.rs-marquee > .rs-marquee__track` (contenido duplicado) | Cinta infinita | Nivel C; texto decorativo `aria-hidden` |
| Flotar / girar | `.rs-float`, `.rs-spin-slow` | Elementos decorativos | Solo en piezas decorativas |
| Ken Burns | `.rs-img-kb` en el `.rs-media` | La imagen respira (zoom lento) | Nivel B/C; se pausa al hover; ver `images.md` |
| Reveal de imagen | `.rs-img-reveal` | La imagen se descubre con cortinilla al entrar en pantalla | Nivel C; usa el observer de reskin-fx.js; una por vista |
| Zoom al hover | `.rs-media--zoom` | Acerca la imagen 6% al pasar el cursor | Seguro en tarjetas y galerías |
| Barrido de luz | `.rs-sheen` | Reflejo diagonal que cruza la superficie al hover | Nivel B/C; solo sobre imagen o superficie decorativa, nunca sobre texto ni en contenedores con popovers |

## Receta por estilo (activa como máximo 3 de estos efectos)

| Estilo | `data-rs-fx` | Partículas | Extra de CSS |
|---|---|---|---|
| Glassmorphism | `particles reveal spot` | `orbs` | `.rs-card--glow` |
| Liquid Glass | `particles reveal tilt` | `orbs` | brillo especular en `.rs-media` |
| Retro | `particles reveal` | `pixels` (arcade) · `stars` (synth) · ninguna (CRT) | glitch en hover del título, cursor `█` |
| Brutalism | `reveal` (`pop`) + `parallax` en imagen | ninguna o `confetti` en `pop` | `.rs-ticker`, `.rs-blocks` |
| Minimalism | `reveal` + `parallax` suave | ninguna | reveal lento y corto (≤ 24px) |
| Claymorphism | `particles reveal` | `bubbles` | `.rs-float` en burbujas de icono |
| Neumorphism | `reveal` | ninguna | sin efectos agresivos: el relieve ya es el efecto |
| Spatial | `particles reveal tilt glow` | `stars` | `.rs-depth-1/2` con tilt, `.rs-card--grabber` |
| Doodle | `particles reveal` | `dust` | giros ±1°, cinta `.rs-card--taped` |
| Y2K | `particles reveal` | `stars` (destellos) | ventanas `.rs-card`, `.rs-lcd`, `.rs-sparkle` |
| Aurora | `particles reveal spot glow` | `orbs` | `.rs-aurora-band`, `.rs-gradient-text` |

Si una fila trae 4, elige 3: `glow` y `spot` compiten entre sí según el estilo. Si el momento firma es
el **botón imantado**, sustituye uno de los ambientales por `magnet`: el presupuesto es 3 ambientales +
2 momentos, no 4 efectos corriendo a la vez.

## Escena y capas (por qué las partículas "desaparecen")

El canvas va en `z-index:-1`. Se ve **solo si** el fondo está en `<html>` y los wrappers son
transparentes. Si un contenedor (`#root`, `.app`, `main`) tiene fondo opaco, tápalo → quita ese
fondo (es una declaración visual, está permitido) o usa `data-rs-particles-layer="front"`
(partículas al frente con opacidad baja).

## Momentos firma (lo que hace que el usuario diga "¿y esto?")

Un **momento firma** es una pieza visual nueva que no existía en el proyecto y que solo tiene
sentido con este estilo. No es un efecto ambiental: es algo que se ve y se recuerda. En nivel B/C
añade **al menos uno** por vista principal (máximo 2 por página) además de los efectos.

| Momento | Cómo se hace | Estilos donde brilla |
|---|---|---|
| **Ticker / cinta infinita** | `.rs-marquee` con el contenido duplicado y `aria-hidden` | brutalism, retro, y2k, doodle |
| **Botón imantado con flecha** | `data-rs-fx="magnet"` en el `.rs-btn--arrow` primario | aurora, liquid-glass, spatial |
| **Tarjeta héroe con tilt + spotlight** | `data-rs-tilt` + `data-rs-spot` en la tarjeta destacada | glassmorphism, spatial, liquid-glass |
| **Capas de profundidad** | 2–3 `.rs-depth-1/2` con `translateZ` y parallax distinto | spatial, aurora |
| **Ventana / polaroid con sticker** | `.rs-media--polaroid` + `.rs-sticker` + `aria-hidden` | doodle, y2k, claymorphism |
| **Número o palabra gigante de fondo** | pseudo-elemento `content` decorativo detrás del hero | brutalism, minimalism |
| **Imagen que respira** | `.rs-img-kb` + scrim del estilo sobre la foto del hero | todos; ver `images.md` |
| **Sección que cambia de luz** | `body::before` con gradiente que se mueve con `--rs-scroll` (efecto `scroll`) | aurora, spatial, retro |
| **Aparición en cascada** | `data-rs-reveal-auto` sobre las tarjetas de una sección | todos |

Reglas de los momentos:

- Son **presentación**: nada de estado, props, handlers ni texto informativo nuevo. Texto decorativo,
  `aria-hidden="true"` y `pointer-events: none` cuando no se interactúa.
- No tapan contenido, no secuestran el scroll, no bloquean el puntero ni el teclado.
- Se apagan con `prefers-reduced-motion` y se ven completos sin JS.
- Un momento por viewport: si dos compiten, sobra uno.
- Los momentos de imagen no cuentan como efecto ambiental: Ken Burns, zoom y sheen son CSS; el reveal
  (`.rs-img-reveal`) lo activa el observer de `reskin-fx.js`, y sin script la imagen se ve completa.

## Reglas

- Máximo **3 efectos ambientales** por estilo + **2 momentos firma** por página; ninguno en tablas densas ni formularios.
- Todo efecto debe seguir la regla de movimiento de `rules.md §4–5` (reduced-motion, pausa, sin ocultar contenido).
- Prueba siempre con `prefers-reduced-motion: reduce` y con JS de efectos desactivado: la app debe verse completa.
- Si la app ya usa GSAP/Framer/Lenis/tsparticles, úsalos en su lugar en vez de reskin-fx.
