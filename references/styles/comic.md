# Cómic

**Una frase:** historieta pop: papel crema, entintado negro grueso, trama de puntos, rótulos en mayúsculas, globos de diálogo y ráfagas de onomatopeya.

**Referencia visual:** una portada de cómic moderno: titular amarillo con contorno negro y sombra dura, rayos de acción saliendo de una esquina, viñetas con borde grueso y sombra desplazada, una ráfaga roja "¡POW!" junto al titular y un globo de diálogo con el mensaje clave. Ver `references/style-playbook.md § Comic`.

## Cuándo usarlo

- Apps de estudio, juegos, comunidades, portafolios creativos, eventos, tiendas con carácter, landings de campaña.
- Dashboards con personalidad (las tarjetas funcionan como viñetas; las métricas, como rótulos).

## Cuándo NO usarlo

- Bancos, salud, legal, B2B serio o cualquier contexto que pida sobriedad.
- Interfaces muy densas de texto largo (los rótulos en mayúsculas cansan).

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Papel (default) | (ninguno) | crema + negro + amarillo / rojo / azul |
| Noche de ciudad | `data-theme="dark"` | azul marino + crema + amarillo; sombra negra |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Bangers para rótulos (mayúsculas) y Comic Neue para el cuerpo. `uppercase`, nunca `capitalize`. |
| 2 | Forma | Radio 4–10px, borde negro de 3px en todo. |
| 3 | Profundidad | Sombra de offset sólido sin blur (6px / 9px); el botón se levanta con giro y se hunde al pulsar. |
| 4 | Escena | Papel con trama de puntos rojos y azules desfasados + rayos de acción desde la esquina superior derecha. |
| 5 | Material | Panel con halftone opcional (`.rs-card--halftone`), cebra de papel en tablas, imágenes con trama de puntos. |
| 6 | Movimiento | Reveal `pop` con rebote corto; hover con giro de −1.5°; sin suavizados. |
| 7 | Firma | `.rs-burst` (¡POW!), `.rs-bubble` (globo), `.rs-caption` (caja de narración), `.rs-panels` (viñetas), `.rs-ticker`, `.rs-speedlines`. |

## Efectos (máximo 3)

`data-rs-fx="reveal"` con `data-rs-reveal="pop"` en tarjetas. Opcional: `parallax` en la imagen del héroe y `.rs-marquee` dentro de `.rs-ticker`. Partículas: ninguna por defecto; `confetti` solo para un momento (CTA o logro).

## Imágenes (nivel C)

Foto con más contraste y saturación, trama de puntos encima (viene en `.rs-media::after`), borde negro de 3px y sombra dura. Fotos de ciudad, acción o texturas pop, o ilustración plana. Protocolo de enlace en `images.md`. Placeholder: `assets/placeholders/placeholder-blocks.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/comic.css` · Componentes: `assets/components/_base.css` + `assets/components/comic.css`
- Fuentes (brief aprobado, con fallback): `https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap`
- Vista previa: `assets/preview.html?style=comic`
- Variables útiles: `--rs-outline` (negro de entintado), `--rs-accent` (amarillo), `--rs-accent-2` (rojo), `--rs-accent-3` (azul), `--rs-dots` (trama de puntos), `--rs-shadow`, `--rs-shadow-lg`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`). Para `clip-path` de la ráfaga y los degradados de la escena, usa `[clip-path:var(...)]` o conserva el bloque en el CSS global ya existente.
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```html
<!-- Ráfaga decorativa junto al titular -->
<span class="rs-burst" aria-hidden="true">¡POW!</span>

<!-- Globo de diálogo con el mensaje clave (texto real, accesible) -->
<p class="rs-bubble">Tu semana, sin ruido.</p>

<!-- Caja de narración pegada a la esquina de un panel -->
<article class="rs-card"><span class="rs-caption" aria-hidden="true">Capítulo 1</span> …</article>

<!-- Collage de viñetas: la primera ocupa 2×2 -->
<div class="rs-panels"> <div class="rs-card rs-media">…</div> <div class="rs-card">…</div> <div class="rs-card">…</div> </div>
```

Los textos de `.rs-burst`, `.rs-caption` y `.rs-ticker` son decorativos y cortos: `aria-hidden`, nunca información que el usuario necesite.

## Accesibilidad

- El titular `.rs-display` es amarillo con contorno negro: legible por el contorno, pero **no lo uses para párrafos**; el texto corrido va en tinta negra sobre papel/blanco (AA).
- El amarillo no es color de texto sobre claro: usa `--rs-accent-text` (rojo oscuro) o tinta. Va como relleno con texto negro.
- Foco azul de 3px (amarillo en oscuro). La sombra dura no es indicador de foco.
- Rótulos en mayúsculas solo en titulares, botones, pestañas y etiquetas; párrafos en minúscula normal.
- `prefers-reduced-motion`: sin giros, sin rebotes, sin Ken Burns.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve "web normal" | Radios suaves o sombras con blur | Radio 4–10px y sombra de offset sólido |
| Titular sin contorno | `paint-order` no soportado o falta el `@supports` | Conserva el bloque `@supports (paint-order…)` de `.rs-display` |
| Todo en mayúsculas, ilegible | Párrafos con `uppercase` | Mayúsculas solo en rótulos |
| Demasiadas ráfagas | `.rs-burst` en cada tarjeta | Máximo 2 por página |
| Rayos tapan el texto | Escena muy opaca | Alfa ≤ 0.22 en `--rs-scene` y tinta sobre superficies sólidas |
| Fuente sistema en rótulos | Falta el `<link>` o el fallback | Cargar Bangers/Comic Neue y mantener `Impact` de respaldo |

## Qué NO hacer

- No usar blur, degradados suaves ni radios grandes (el estilo es de tinta y papel).
- No más de 3 colores de panel por pantalla.
- No imitar personajes, logos ni páginas de editoriales o franquicias existentes: el estilo es genérico.
- No poner texto informativo dentro de ráfagas ni de pseudoelementos.
