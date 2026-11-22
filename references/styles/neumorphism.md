# Neumorfismo

**Una frase:** relieve suave, como botones presionados en la misma superficie: dos sombras (clara y oscura) y ninguna línea.

**Referencia visual:** panel lavanda grisáceo con botones circulares, interruptores y barras con volumen sutil, campos hundidos y un único acento violeta.

## Cuándo usarlo

- Paneles de control, domótica, música/reproductores, calculadoras, ajustes.
- Interfaces con pocos controles y mucho carácter táctil.

## Cuándo NO usarlo

- Tablas densas, formularios largos o apps con muchas acciones: el contraste de bordes es frágil.
- Cuando la accesibilidad es crítica (es el estilo más difícil de hacer accesible).

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Claro (default) | (ninguno) | gris-lavanda + violeta |
| Oscuro | `data-theme="dark"` | gris azulado oscuro + lila |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Montserrat 600–800: geométrica y limpia. |
| 2 | Forma | Radios 16–32px, círculos para acciones. |
| 3 | Profundidad | Dos sombras (`--rs-neu-dark`/`--rs-neu-light`); hundido con `inset`. |
| 4 | Escena | Degradado de 145° casi imperceptible del mismo color que la superficie. |
| 5 | Material | Superficie = fondo; sin bordes; el relieve es el único límite. |
| 6 | Movimiento | Transiciones de sombra de 180ms: sobresale → hundido al pulsar. |
| 7 | Firma | `.rs-card--inset`, `.rs-btn--round`, campos hundidos, tabs hundidas con pestaña elevada. |

## Efectos (máximo 3)

`data-rs-fx="reveal"` y nada más: el relieve ya es el efecto. Sin partículas ni tilt.

## Imágenes (nivel C)

Imagen con marco elevado de la misma superficie, sin borde; preferir ilustraciones suaves o 3D claros. Placeholder: `placeholder-soft.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/neumorphism.css` · Componentes: `assets/components/_base.css` + `assets/components/neumorphism.css`
- Fuentes (brief aprobado, con fallback): Montserrat (`https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap`).
- Vista previa: `assets/preview.html?style=neumorphism`
- Variables clave: `--rs-neu-dark`, `--rs-neu-light`, `--rs-shadow`, `--rs-shadow-sm`, `--rs-shadow-in`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-card { background: var(--rs-surface); box-shadow: 9px 9px 18px var(--rs-neu-dark), -9px -9px 18px var(--rs-neu-light); }
.rs-field { background: var(--rs-surface); box-shadow: inset 6px 6px 12px var(--rs-neu-dark), inset -6px -6px 12px var(--rs-neu-light); }
.rs-btn:active { box-shadow: inset 4px 4px 8px rgb(0 0 0 / .28), inset -3px -3px 6px rgb(255 255 255 / .18); }
```

## Accesibilidad

- **El relieve no comunica nada por sí solo.** Estado activo = color de acento + peso + marca de forma (punto). Ya está resuelto en `.rs-nav-item` y `.rs-tab`.
- Texto e iconos ≥ 4.5:1 (`--rs-ink`, `--rs-accent-text`). Las sombras no cuentan para el contraste.
- Foco: outline sólido de 3px (no solo cambio de sombra).
- Si hay muchos controles, avisar en el brief que el estilo no es el ideal.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| "Todo se ve plano" | Superficie y fondo de distinto color | Mismo color en `--rs-bg` y `--rs-surface` |
| Bordes sucios | Sombras demasiado oscuras | `--rs-neu-dark` apenas más oscuro que el fondo |
| Estado activo invisible | Solo relieve | Color + punto + peso |

## Qué NO hacer

- No añadir bordes de color ni sombras negras puras.
- No usar blur ni transparencias.
- No usar neumorfismo en listas/tablas largas.
