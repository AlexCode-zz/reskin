# Ilustrativo / Doodle

**Una frase:** dibujos hechos a mano que le dan personalidad: bordes de tinta temblorosos, papel con puntos y cuaderno de apuntes.

**Referencia visual:** onboarding cálido con ilustraciones de plastilina/papel en durazno y naranja, botones píldora naranja y tarjetas blancas suaves; llevado a un cuaderno con trazo de lápiz.

## Cuándo usarlo

- Apps de estudio, productividad personal (como TaskFlow), educación, infantil, onboarding.
- Marcas cercanas, humanas y juguetonas.

## Cuándo NO usarlo

- Finanzas serias, B2B corporativo.
- Cuando se requiere un look pulcro y minimalista.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Papel (único) | (ninguno) | crema + tinta marrón + naranja, menta y amarillo |

Solo claro (papel). Si piden oscuro, anotar "Doodle claro (por diseño)".

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Display manuscrito (Caveat Brush) + cuerpo Patrick Hand a 18px (se ve pequeña). |
| 2 | Forma | Radios asimétricos que simulan trazo a mano (`24px 14px 26px 12px / 14px 26px 12px 24px`). |
| 3 | Profundidad | Sombra de lápiz desplazada 4–5px, sin blur. |
| 4 | Escena | Papel crema con puntos y un resplandor cálido en la esquina. |
| 5 | Material | Tinta de 2.5px, cinta washi (`.rs-card--taped`), subrayado ondulado (`.rs-squiggle`). |
| 6 | Movimiento | Giros de ±1° en hover (botón, tab activa), reveal con rebote. |
| 7 | Firma | `.rs-media--polaroid`, `.rs-sticker--star`, `.rs-sticker--arrow`, tarjetas en tintas pastel. |

## Efectos (máximo 3)

`data-rs-fx="particles reveal"` · partículas `dust` (motas de papel naranja/menta/amarillo) · reveal `pop`. Giro de tarjetas con `rotate` (no choca con tilt).

## Imágenes (nivel C)

Ilustraciones 3D/papel cálidas o fotos con borde de tinta; `.rs-media--polaroid` rotada −2°. Placeholder: `placeholder-soft.svg` sobre fondo durazno.

## Archivos y fuentes

- Tokens: `assets/tokens/doodle.css` · Componentes: `assets/components/_base.css` + `assets/components/doodle.css`
- Fuentes (brief aprobado, con fallback): Caveat Brush + Patrick Hand (`https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Patrick+Hand&display=swap`).
- Variables útiles: `--rs-squiggle` (subrayado SVG), `--rs-radius` (asimétrico), `--rs-shadow-btn`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-card { border: 2.5px solid var(--rs-border); border-radius: 24px 14px 26px 12px / 14px 26px 12px 24px; box-shadow: 4px 5px 0 var(--rs-border); rotate: var(--rs-tilt, 0deg); }
.rs-card:nth-child(3n+1) { --rs-tilt: -.5deg; }
.rs-squiggle::after { content: ""; display: block; width: 220px; height: 8px; background: var(--rs-squiggle) repeat-x; }
```

## Accesibilidad

- Naranja de relleno con **tinta oscura** (#2a1100, 7:1); nunca texto blanco sobre naranja.
- Texto de acento sobre crema: `--rs-accent-text` (#a83a08).
- Las rotaciones se anulan con reduced-motion; el texto rotado ≤ 1.5° para no marear.
- Fuente manuscrita solo en display y botones; el cuerpo en Patrick Hand ≥ 18px.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Parece "Comic Sans" barato | Todo en manuscrita | Display manuscrita, cuerpo legible y bordes de tinta |
| Se ve torcido | Rotaciones grandes | ±0.5–1.5° |
| Bordes perfectos | Radio simétrico | Radios asimétricos de los tokens |

## Qué NO hacer

- No más de dos fuentes ni rotar párrafos.
- No mezclar con blur ni degradados fríos.
- No convertir cada elemento en pegatina: 1–2 piezas firma por pantalla.
