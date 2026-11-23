# UI espacial

**Una frase:** profundidad y movimiento en 3D, como si los paneles flotaran: vidrio, sombras largas, capas y reacción al puntero.

**Referencia visual:** interfaz tipo visionOS: paneles translúcidos curvos flotando delante de un entorno, con tarjetas de contenido, lista de mensajes y barra de agarre inferior.

## Cuándo usarlo

- Productos premium, presentaciones, apps multimedia, dashboards "de película".
- Experiencias donde el movimiento y la profundidad cuentan.

## Cuándo NO usarlo

- Dispositivos muy modestos (blur y 3D pesan).
- Apps de datos muy densas.

## Variantes y tema

| Variante | Selector | Paleta |
|---|---|---|
| Oscuro (default) | (ninguno) | entorno azul/violeta/verde profundo + vidrio blanco |
| Claro | `data-theme="light"` | entorno claro + vidrio blanco |

## Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Inter/SF 500–600, tracking −0.035em, titulares grandes y limpios. |
| 2 | Forma | Radios 18–48px, navbar flotante en píldora con margen. |
| 3 | Profundidad | Sombras largas + borde especular superior (`inset 0 1px 0`) + `translateZ`. |
| 4 | Escena | Tres luces radiales de colores (el "entorno") + luz que sigue al cursor. |
| 5 | Material | Vidrio: `blur(36px) saturate(1.5)`, fallback opaco con `@supports`. |
| 6 | Movimiento | Tilt 3D al puntero, hover que eleva 6px, parallax por capas. |
| 7 | Firma | `.rs-card--grabber` (barra de agarre), `.rs-depth-1/2`, navbar píldora, punto luminoso del ítem activo. |

## Efectos (máximo 3)

`data-rs-fx="particles reveal tilt glow"` · partículas `stars` · `data-rs-tilt="5"` solo en 2–4 tarjetas grandes · `glow` para la luz del cursor.

## Imágenes (nivel C)

Foto o render como entorno detrás (en `body::before` o como imagen de fondo del hero) y paneles de vidrio encima. Marco de vidrio con radio 48px. Placeholder: `placeholder-aurora.svg`.

## Archivos y fuentes

- Tokens: `assets/tokens/spatial.css` · Componentes: `assets/components/_base.css` + `assets/components/spatial.css`
- Fuentes (brief aprobado, con fallback): Inter (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`).
- Variables clave: `--rs-glass`, `--rs-glass-strong`, `--rs-glass-border`, `--rs-glass-edge`, `--rs-blur`. `--rs-surface` es el fallback opaco.

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3) y utilidades con valores arbitrarios; `_base.css` y esta hoja se traducen a utilidades, sin hoja nueva (salvo `reskin-fx.*`).
**Sin Tailwind:** tokens en `:root` y clases semánticas `.rs-*` en el CSS existente.

## Piezas firma

```css
.rs-card { background: var(--rs-glass); border: 1px solid var(--rs-glass-border); backdrop-filter: blur(36px) saturate(1.5);
  box-shadow: 0 30px 60px -24px rgb(0 0 0 / .6), inset 0 1px 0 var(--rs-glass-edge); }
.rs-depth-1 { transform: translateZ(24px); }   /* dentro de [data-rs-tilt] */
```

## Accesibilidad

- Contraste sobre vidrio: medir en el punto más claro del entorno. Los tokens ya usan tinta blanca sobre entorno oscuro.
- ≤ 6 superficies con `backdrop-filter`; tarjetas anidadas sin blur (ya resuelto con `.rs-card .rs-card`).
- Tilt solo con puntero fino y sin reduced-motion; sin él, tarjetas planas.
- `backdrop-filter` crea containing block: revisar modales/menús `position: fixed`.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Vidrio "sucio"/ilegible | Entorno sin contraste detrás | Entorno oscuro y saturado; tinta blanca |
| Lag al scrollear | Demasiadas superficies con blur | ≤ 6; sin blur en filas, badges ni inputs |
| Se ve plano | Sin tilt ni capas | `data-rs-tilt` + `.rs-depth-*` |

## Qué NO hacer

- No más de 6 blur visibles ni blur sobre contenedores que scrollean.
- No tilt en tablas ni formularios.
- No mezclar con sombras duras.
