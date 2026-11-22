# Brutalismo moderno

**Una frase:** tipografía gigante, bloques planos, bordes gruesos y contraste máximo: directo, sin adornos y con mucha personalidad.

**Referencia visual:** estudio digital en blanco roto con titular condensado en negro, franja de bloques negros con uno lima, foto arquitectónica en B/N y botón de contorno; y la versión *pop* con tarjetas lima, amarillo y coral sobre violeta con bordes negros y sombras duras.

## Cuándo usarlo

- Marcas creativas, portafolios disruptivos, startups atrevidas, landings de campaña.
- Dashboards con identidad fuerte (funciona muy bien en tablas y tarjetas de métricas).

## Cuándo NO usarlo

- Bancos, salud, legal o cualquier contexto que pida sobriedad suave.
- Si la app ya tiene una identidad cálida y delicada que se debe preservar.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Mono (default) | (ninguno) | blanco roto + negro + lima |
| Pop (neo-brutalismo) | `data-brutal="pop"` | violeta + lima + amarillo + coral |
| Oscuro | `data-theme="dark"` | negro + blanco roto + lima |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Display condensado en mayúsculas (Anton) a tamaño enorme; cuerpo grotesca (Archivo). `uppercase`, nunca `capitalize`. |
| 2 | Forma | Radio 0 (pop: 14–32px), borde de 3px negro en todo. |
| 3 | Profundidad | Sombra de offset sólido sin blur (6px / 10px); el botón "se hunde" al pulsar. |
| 4 | Escena | Fondo blanco roto con cuadrícula de papel milimetrado (pop: puntos sobre violeta). |
| 5 | Material | Bloques planos de color: `.rs-card--lime`, `--invert`, `--coral`; tabla con cabecera negra. |
| 6 | Movimiento | Reveal `pop` escalonado; botones que se desplazan 2–4px; sin suavizados. |
| 7 | Firma | `.rs-blocks` (franja de bloques), `.rs-ticker`, asterisco `.rs-sticker--asterisk`, foto en B/N de alto contraste. |

## Efectos (máximo 3)

`data-rs-fx="reveal parallax"` · `data-rs-reveal="pop"` en tarjetas · `data-rs-parallax="0.08"` en la imagen del hero. Opcional: `.rs-ticker` con `.rs-marquee`. Sin partículas (salvo `confetti` en la variante pop).

## Imágenes (nivel C)

Foto en B/N de alto contraste (arquitectura, objetos, textura), recorte rectangular, borde 3px y sombra dura. En *pop*, sin filtro y sobre bloque de color. Placeholder: `assets/placeholders/placeholder-blocks.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/brutalism.css` · Componentes: `assets/components/_base.css` + `assets/components/brutalism.css`
- Fuentes (brief aprobado, con fallback): Anton + Archivo (`https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;800&display=swap`); pop usa Space Grotesk.
- Vista previa: `assets/preview.html?style=brutalism`
- Variables útiles: `--rs-shadow`, `--rs-shadow-lg`, `--rs-radius` (0), `--rs-accent` (lima).

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-blocks { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; border: 3px solid var(--rs-border); }
.rs-blocks > * { padding: 22px; background: var(--rs-ink); color: var(--rs-bg); font-family: var(--rs-font-display); text-transform: uppercase; }
.rs-blocks > :last-child { background: var(--rs-accent); color: var(--rs-accent-ink); }  /* el bloque lima */
```

## Accesibilidad

- El lima NO es color de texto sobre claro: usa `--rs-accent-text` (negro). El lima va como relleno con texto negro.
- Foco negro de 3px; en oscuro lima. Sombra dura no es indicador de foco.
- Titulares enormes: `text-wrap: balance` y `clamp()`; a 200% de zoom no deben desbordar.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve "web normal" | Radios o sombras suaves | Radio 0 y sombra de offset |
| Titular chico | Se conservó el tamaño original | `.rs-display` con `clamp()` hasta 9rem |
| Lima ilegible | Texto lima sobre blanco | Lima solo de relleno, texto negro |
| Foto a color | Falta el filtro | `grayscale(1) contrast(1.15)` |

## Qué NO hacer

- No suavizar con blur, degradados ni radios en la variante mono.
- No usar más de 3 colores de bloque por pantalla.
- No reducir la tipografía para que "quepa": señálalo en el brief.
