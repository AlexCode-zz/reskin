# Minimalismo

**Una frase:** menos ruido, más claridad: espacio en blanco, jerarquía tipográfica y un solo acento.

**Referencia visual:** portafolio blanco con navegación mínima, titular serif/sans grande, un botón negro píldora y una foto suave de objeto con mucha luz; y las pantallas editoriales con manchas orgánicas negras y puntos.

## Cuándo usarlo

- Portafolios, agencias, marcas premium, blogs y documentación elegante.
- Dashboards que quieren calma: pocas superficies, mucho aire.

## Cuándo NO usarlo

- Apps de datos muy densas (el aire las alarga) salvo que el usuario lo pida.
- Marcas que necesitan energía o color intenso.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Claro (default) | (ninguno) | blanco cálido + negro + un azul de acento |
| Oscuro | `data-theme="dark"` | casi negro + blanco cálido |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Serif de display (Instrument Serif) con cursiva para el énfasis + Inter para el cuerpo; tracking −0.025em. |
| 2 | Forma | Radios generosos (10–24px), bordes hairline de 1px. |
| 3 | Profundidad | Casi plana: una sombra larguísima y tenue solo al hover. |
| 4 | Escena | Fondo liso (`--rs-scene: none`); el "diseño" es el espacio. |
| 5 | Material | Papel: sin gradientes; blob negro orgánico y retícula de puntos como únicos adornos. |
| 6 | Movimiento | Reveal lento (≤ 24px, 700ms) y parallax suave en la foto. |
| 7 | Firma | Botón píldora negro, `.rs-btn--link` con flecha ↗, `.rs-blob`, `.rs-dots`, tabs con subrayado. |

## Efectos (máximo 3)

`data-rs-fx="reveal parallax"` · parallax `0.06` en la imagen. **Sin partículas por diseño.** Menos es más: un solo efecto bien hecho.

## Imágenes (nivel C)

Foto limpia con luz natural, fondo neutro, un solo sujeto, `saturate(.85)`, radio 24px, sin borde ni sombra. Placeholder: `assets/placeholders/placeholder-soft.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/minimalism.css` · Componentes: `assets/components/_base.css` + `assets/components/minimalism.css`
- Fuentes (brief aprobado, con fallback): Instrument Serif + Inter (`https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600&display=swap`).
- Variables útiles: `--rs-hairline`, `--rs-input-border` (3:1, los campos NO usan el borde hairline).

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-btn--link { background: transparent; color: var(--rs-ink); padding-inline: 0; min-height: 0; box-shadow: inset 0 -1px 0 var(--rs-ink); }
.rs-btn--link::after { content: "↗"; }
.rs-blob { aspect-ratio: 1; background: var(--rs-ink); border-radius: 58% 42% 61% 39% / 47% 55% 45% 53%; }
```

## Accesibilidad

- El borde hairline (#e2e2dc) NO identifica un campo: los inputs usan `--rs-input-border` (≥ 3:1).
- Texto secundario `--rs-ink-muted` (5.9:1); nunca gris claro por "elegancia".
- Foco azul de 3px visible.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve vacío/aburrido | Falta jerarquía | Un titular serif grande y un solo botón primario |
| Todo gris | Texto con opacidad | Usar `--rs-ink-muted`, no `opacity` |
| Campos invisibles | Borde hairline | `--rs-input-border` |

## Qué NO hacer

- No añadir sombras, degradados ni más de un color de acento.
- No llenar el espacio: el aire es el diseño.
- No usar partículas ni más de un efecto.
