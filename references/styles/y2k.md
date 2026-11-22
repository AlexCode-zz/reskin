# Retro Y2K

**Una frase:** colores saturados y nostalgia de los 2000: escritorio pastel con ventanas beige biseladas, barras de título azules y botones con brillo.

**Referencia visual:** escritorio rosa→lavanda con ventanas beige (tienda, reproductor tipo Winamp con pantalla LCD, chat), barras de título azul, botones amarillos y iconos de escritorio.

## Cuándo usarlo

- Portafolios y tiendas con nostalgia, páginas de marca juvenil, juegos, demos creativas.
- Apps con muchas "ventanas" (cada tarjeta es una).

## Cuándo NO usarlo

- Apps de datos serias o minimalistas.
- Si el usuario quiere arcade/CRT/synthwave: es el estilo `retro` (otro archivo).

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Escritorio (único) | (ninguno) | rosa→lavanda + beige + azul + amarillo |

Solo claro. **No confundir con `retro`** (oscuro, neón, pixel): Y2K es pastel, bisel y ventanas.

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Títulos Pixelify Sans con sombra doble (blanco + rosa) + Tahoma/Verdana en cuerpo; `VT323` en contadores LCD. |
| 2 | Forma | Esquinas casi rectas (2–4px), bordes de 2px de tinta. |
| 3 | Profundidad | Bisel `inset` claro/oscuro (relieve 90s) + sombra desplazada tenue. |
| 4 | Escena | Escritorio degradado rosa→lavanda con dos luces (rosa y celeste). |
| 5 | Material | Ventana: barra de título azul con 3 botones dibujados por gradiente (`.rs-card::before`), botones con gloss. |
| 6 | Movimiento | Pasos (`steps(3)`) en transiciones, botón que se hunde con bisel invertido. |
| 7 | Firma | `.rs-card` = ventana, `.rs-lcd`, `.rs-sparkle ✦`, tabs tipo carpeta, progreso por bloques azules. |

## Efectos (máximo 3)

`data-rs-fx="particles reveal"` · partículas `stars` (rosa/azul/amarillo, como destellos). Easing `steps()` para el aire digital.

## Imágenes (nivel C)

Fotos de producto/personas en marco biselado dentro de una ventana (`.rs-media` con padding 3px y borde). Placeholder: `placeholder-blocks.svg` con colores del estilo.

## Archivos y fuentes

- Tokens: `assets/tokens/y2k.css` · Componentes: `assets/components/_base.css` + `assets/components/y2k.css`
- Fuentes (brief aprobado, con fallback): Pixelify Sans + VT323 + Tahoma del sistema (`https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;700&family=VT323&display=swap`).
- Vista previa: `assets/preview.html?style=y2k`
- Variables clave: `--rs-bevel-out`, `--rs-bevel-in`, `--rs-titlebar`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-card:not(.rs-card--stat)::before { content: ""; display: block; height: 28px; margin: -22px -24px 16px; border-bottom: 2px solid var(--rs-border);
  background: linear-gradient(var(--rs-surface),var(--rs-surface)) right 8px center/16px 16px no-repeat, var(--rs-titlebar); }
.rs-btn { background-image: linear-gradient(180deg, rgb(255 255 255 / .65), rgb(255 255 255 / 0) 55%); box-shadow: var(--rs-bevel-out); }
```

## Accesibilidad

- Los botones de la barra de título son decorativos (no clicables); el cierre real lo gestiona la app.
- Tinta oscura sobre amarillo (11:1). Texto blanco solo sobre el azul de título.
- Easing `steps()` se anula con reduced-motion. Tooltip amarillo con tinta oscura.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Parece "retro arcade" | Fondo oscuro/neón | Pastel, beige y bisel; no oscuro |
| Sin identidad | Faltan las barras de título | `.rs-card::before` |
| Texto ilegible en cabecera | Blanco sobre azul claro | Título en el degradado oscuro→claro con borde |

## Qué NO hacer

- No mezclar con glass ni sombras suaves.
- No poner barra de título en tarjetas de métrica pequeñas (`--stat`).
- No usar emojis de color si desentonan; preferir ✦ y símbolos simples.
