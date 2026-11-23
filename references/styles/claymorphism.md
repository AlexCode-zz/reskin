# Claymorfismo

**Una frase:** formas suaves e infladas, como si fueran de plastilina: volumen blando, pasteles saturados y esquinas enormes.

**Referencia visual:** app financiera lavanda con tarjetas redondeadas, iconos-botón de colores con volumen, gráfico de barras tipo píldora y barra inferior inflada.

## Cuándo usarlo

- Apps de consumo, educación, finanzas amigables, onboarding, dashboards personales.
- Estudiantes y productos juveniles: cálido y táctil.

## Cuándo NO usarlo

- Interfaces densas de datos o administración seria.
- Contextos que requieran formalidad.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Claro (único) | (ninguno) | lavanda + blanco + rosa, amarillo y menta |

Solo claro: la plastilina necesita luz. Si el usuario elige Oscuro, anótalo como "Claymorfismo claro (por diseño)".

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Display redondeado (Baloo 2) a 800 + Nunito para el cuerpo. |
| 2 | Forma | Radios 18–40px, botones píldora, iconos en cuadrados redondeados. |
| 3 | Profundidad | Triple sombra: exterior suave tintada + luz interior arriba + sombra interior abajo. |
| 4 | Escena | Lavanda con tres manchas radiales (rosa, celeste, lila). |
| 5 | Material | Plastilina: `.rs-card--pink/mint/sun/lilac/sky`, progreso con brillo, tabla en filas-píldora. |
| 6 | Movimiento | Hover con rebote (easing con overshoot), botón que se aplasta al pulsar. |
| 7 | Firma | `.rs-icon-bubble` (+ `--c2..c4`), tabs hundidas, filas-píldora. |

## Efectos (máximo 3)

`data-rs-fx="particles reveal"` · partículas `bubbles` (rosa/amarillo/menta) · reveal `pop` · `.rs-float` en las burbujas de icono.

## Imágenes (nivel C)

Ilustración 3D tipo plastilina o foto con fondo pastel; radio 40px y sombra inflada. Placeholder: `placeholder-soft.svg` sobre un fondo `--rs-accent-2`.

## Archivos y fuentes

- Tokens: `assets/tokens/claymorphism.css` · Componentes: `assets/components/_base.css` + `assets/components/claymorphism.css`
- Fuentes (brief aprobado, con fallback): Baloo 2 + Nunito (`https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Nunito:wght@500;700;800&display=swap`).
- Variables útiles: `--rs-clay-hi`, `--rs-clay-lo` (las dos luces de la plastilina), `--rs-shadow-btn`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-card { border: 0; box-shadow: 0 16px 28px -12px rgb(78 52 200 / .38), inset 0 -8px 14px rgb(106 77 240 / .16), inset 0 8px 14px rgb(255 255 255 / .95); }
.rs-icon-bubble { width: 56px; height: 56px; border-radius: 20px; display: grid; place-items: center; box-shadow: var(--rs-shadow-btn); }
```

## Accesibilidad

- El volumen es decorativo: los campos llevan borde `--rs-input-border` además de la sombra interior.
- Texto sobre pasteles: `--rs-ink` (#26195a) ≥ 9:1. No texto blanco sobre rosa/amarillo/menta.
- `.rs-btn--pink/sun/mint` ya traen tinta oscura.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve "flat" | Falta la sombra interior | Las tres capas de `--rs-shadow` |
| Bordes duros | Se conservaron los del proyecto | `border: 0` y radios ≥ 18px |
| Neón/saturación excesiva | Colores fuera del pastel | Paleta de los tokens |

## Qué NO hacer

- No usar bordes oscuros ni sombras duras.
- No mezclar con glass (el blur rompe la plastilina).
- No más de 4 colores pasteles en pantalla.
