# Aurora UI

**Una frase:** gradientes borrosos tipo aurora boreal detrás de interfaces limpias: luz de color, tipografía negra apretada y sombras en capas.

**Referencia visual:** sitio de pagos con banda diagonal de colores (naranja → magenta → violeta → azul), titular negro muy compacto y panel de producto blanco flotando encima.

## Cuándo usarlo

- Landings SaaS, fintech, herramientas de desarrollo, dashboards modernos, páginas de lanzamiento.
- Cuando se quiere un look "premium tech".

## Cuándo NO usarlo

- Marcas muy austeras o brutalistas.
- Contenido muy denso donde el color de fondo distrae.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Claro (default) | (ninguno) | blanco + aurora naranja/violeta/cian + acento índigo |
| Oscuro | `data-theme="dark"` | azul noche + aurora brillante |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Plus Jakarta Sans 800, tracking −0.04em; énfasis con `.rs-gradient-text` (solo ≥ 24px). |
| 2 | Forma | Radios 12–28px, botones píldora. |
| 3 | Profundidad | Sombras en dos capas (grande tintada + cercana neutra); bordes con degradado en `.rs-card--glow`. |
| 4 | Escena | Cuatro manchas radiales (naranja, violeta, cian, rosa) + grano sutil; banda diagonal opcional (`.rs-aurora-band`). |
| 5 | Material | Tarjetas blancas limpias, botón con degradado índigo y sombra de color. |
| 6 | Movimiento | `orbs` que derivan lentos, spotlight en tarjetas, luz que sigue al cursor. |
| 7 | Firma | `.rs-aurora-band` (corte diagonal), `.rs-gradient-text`, `.rs-card--glow`, progreso arcoíris. |

## Efectos (máximo 3)

`data-rs-fx="particles reveal spot glow"` · partículas `orbs` (naranja/violeta/cian) · `data-rs-spot` en 2–3 tarjetas. Si hace falta recortar: sin `glow`.

## Imágenes (nivel C)

Capturas de producto o renders limpios en tarjeta flotante (radio 28px, sombra en capas) sobre la aurora. Placeholder: `assets/placeholders/placeholder-aurora.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/aurora.css` · Componentes: `assets/components/_base.css` + `assets/components/aurora.css`
- Fuentes (brief aprobado, con fallback): Plus Jakarta Sans (`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;800&display=swap`).
- Vista previa: `assets/preview.html?style=aurora`
- Variables clave: `--rs-aurora` (las manchas), `--rs-accent-grad`, `--rs-spot`.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
:root { --rs-scene: var(--rs-aurora), linear-gradient(#fbfbff, #f5f6ff); }
.rs-gradient-text { background: linear-gradient(90deg,#e0561a,#c026a3 50%,#4a3fd8); -webkit-background-clip: text; color: transparent; }  /* solo títulos grandes */
.rs-aurora-band { position: absolute; inset: 0 0 auto; height: 70vh; z-index: -1; background: var(--rs-aurora); clip-path: polygon(0 0,100% 0,100% 66%,0 100%); }
```

## Accesibilidad

- Medir el texto contra la zona **más intensa** de la aurora: el contenido va en tarjetas sólidas, no directo sobre la mancha.
- `.rs-gradient-text` solo en títulos ≥ 24px (3:1) y con color de respaldo.
- Orbs y glow se apagan con reduced-motion (queda un frame estático).
- Acento índigo con texto blanco ≥ 4.5:1 (verificado).

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Aurora sucia/gris | Manchas con baja saturación o sin fondo claro | Tokens de `--rs-aurora` sobre `#fbfbff` |
| Texto ilegible sobre mancha | Texto directo sobre el gradiente | Superficie sólida o `color-mix` de la tarjeta |
| Pesada | Demasiado blur animado | Aurora estática + 5 orbs en canvas |

## Qué NO hacer

- No animar `filter: blur` ni usar más de 5 orbs.
- No poner párrafos directamente sobre la aurora.
- No mezclar con sombras duras ni bordes gruesos.
