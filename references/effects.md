# Efectos (partículas, scroll, profundidad)

Los efectos son lo que separa un reskin "con otro color" de uno con vida. Se implementan con
**dos archivos sin dependencias** que se copian al proyecto:

```text
assets/effects/reskin-fx.js    → partículas, reveal, parallax, tilt, spot, glow, progreso
assets/effects/reskin-fx.css   → estilos de los efectos + utilidades (.rs-float, .rs-marquee, grano)
```

No tocan lógica: se controlan con atributos `data-*` (React no los pisa) y no capturan eventos.
Cumplen `prefers-reduced-motion`, pausan con la pestaña oculta y no ocultan contenido si fallan.

## Instalación por framework (nivel B/C)

| Stack | CSS | JS |
|---|---|---|
| HTML puro | `<link rel="stylesheet" href="reskin/reskin-fx.css">` | `<script src="reskin/reskin-fx.js" defer></script>` |
| React (Vite/CRA) | `import "./reskin/reskin-fx.css"` en `main.jsx` | `import "./reskin/reskin-fx.js"` en `main.jsx` (efecto lateral) |
| Next.js App Router | `import "./reskin/reskin-fx.css"` en `app/layout.tsx` | `<Script src="/reskin/reskin-fx.js" strategy="afterInteractive" />` (de `next/script`; archivo en `public/reskin/`) |
| Next.js Pages | `import` en `_app` | `<Script>` en `_app` |
| Tailwind v4 | `@import "./reskin/reskin-fx.css";` en el CSS global | igual que React/Next |

Activación (en `<html>`; en React/Next va en `index.html` o en `layout`):

```html
<html data-rs-fx="particles reveal spot"
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
| Progreso | `data-rs-fx="progress"` | Barra de lectura arriba | Landings largas |
| Marquee | `.rs-marquee > .rs-marquee__track` (contenido duplicado) | Cinta infinita | Nivel C; texto decorativo `aria-hidden` |
| Flotar / girar | `.rs-float`, `.rs-spin-slow` | Elementos decorativos | Solo en piezas decorativas |

## Receta por estilo (máximo 3 efectos; elige estos y no más)

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

## Escena y capas (por qué las partículas "desaparecen")

El canvas va en `z-index:-1`. Se ve **solo si** el fondo está en `<html>` y los wrappers son
transparentes. Si un contenedor (`#root`, `.app`, `main`) tiene fondo opaco, tápalo → quita ese
fondo (es una declaración visual, está permitido) o usa `data-rs-particles-layer="front"`
(partículas al frente con opacidad baja).

## Reglas

- Máximo **3 efectos** por estilo y ninguno en tablas densas ni formularios.
- Todo efecto debe seguir la regla de movimiento de `rules.md §4–5` (reduced-motion, pausa, sin ocultar contenido).
- Prueba siempre con `prefers-reduced-motion: reduce` y con JS de efectos desactivado: la app debe verse completa.
- Si la app ya usa GSAP/Framer/Lenis/tsparticles, úsalos en su lugar en vez de reskin-fx.
