# Retro

**Una frase:** pixel, terminal CRT o synthwave. No simula la nostalgia: la usa como material.

## Direcciones

Elegir una en el brief. Si el usuario mezcla, preguntar cuál predomina.

| Dirección | Selector | Paleta | Tipografía | Detalle |
|---|---|---|---|---|
| Arcade pixel | (ninguno) | Negro/violeta + menta, rosa, amarillo | Pixel en display, mono en cuerpo | Sombras duras, radios 0 |
| CRT terminal | `[data-retro="crt"]` | Fósforo verde sobre negro | Mono | Scanlines, glow |
| Synthwave | `[data-retro="synth"]` | Magenta/cian/púrpura | Pixel + mono | Grid, sol, glow |

## Cuándo usarlo

- Portafolio, landing, juego, demo, dashboard con alma retro.
- Campañas o micrositios con una referencia pop fuerte.

## Cuándo NO usarlo

- B2B corporativo o apps de datos serias (salvo petición explícita).
- Si la app ya tiene una estética vintage distinta que se debe preservar.
- Si la legibilidad de tablas densas es crítica: arcade puro no es la mejor herramienta.

## Tokens

Archivo: `assets/tokens/retro.css`. Default arcade + variantes CRT y synthwave.

| Token | Uso |
|---|---|
| `--rs-bg`, `--rs-surface`, `--rs-surface-2` | Fondo y paneles planos |
| `--rs-ink`, `--rs-ink-muted` | Texto (AA ya verificado) |
| `--rs-accent`, `--rs-accent-2`, `--rs-accent-3` | Paleta de acción |
| `--rs-accent-soft` | Hover/selección de filas |
| `--rs-border`, `--rs-border-width` | Bordes duros |
| `--rs-shadow-hard`, `--rs-shadow-hard-lg` | Sombras de offset sólido |
| `--rs-glow`, `--rs-glow-text` | Glow (opcional, nunca único indicador) |
| `--rs-radius`, `--rs-radius-sm`, `--rs-radius-md`, `--rs-radius-lg` | 0–6px según dirección |
| `--rs-scanline` | Textura CRT (capa decorativa) |
| `--rs-font-display`, `--rs-font-mono` | Tipografía |
| `--rs-focus`, `--rs-focus-ring` | Foco visible |

**Con Tailwind:** tokens a `@theme` (v4) o `theme.extend` (v3), utilidades, sin hoja nueva.
**Sin Tailwind:** tokens en `:root` y clases semánticas en el CSS existente.

## Reglas del material

- Radios 0 en arcade; 2–6px en CRT; nunca `rounded-2xl`.
- Sombras duras: offset sólido, sin blur. `6px 6px 0 #000`.
- Bordes de 2–3px. Nada de hairline.
- Glow con moderación: no reemplaza el contraste ni el foco.
- Una fuente pixel solo para display. El cuerpo va en mono legible (15–16px).
- Scanlines **detrás** del contenido, nunca encima de texto o controles.

## Componentes

### Navbar

```css
.nav-retro {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 20px;
  border-bottom: var(--rs-border-width) solid var(--rs-border);
  background: var(--rs-bg);
  font-family: var(--rs-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-retro a[aria-current="page"] {
  color: var(--rs-accent);
  box-shadow: inset 0 -3px 0 var(--rs-accent);
  text-shadow: var(--rs-glow-text);
}
```

### Card

```css
.card-retro {
  padding: 20px;
  border: var(--rs-border-width) solid var(--rs-border);
  border-radius: var(--rs-radius);
  background: var(--rs-surface);
  box-shadow: var(--rs-shadow-hard);
  color: var(--rs-ink);
}

.card-retro:hover {
  transform: translate(-1px, -1px);
  box-shadow: var(--rs-shadow-hard-lg);
}
```

### Botón

```css
.btn-retro {
  min-height: 44px;
  padding: 12px 18px;
  border: var(--rs-border-width) solid #000;
  border-radius: var(--rs-radius);
  background: var(--rs-accent);
  color: var(--rs-accent-ink);
  font-family: var(--rs-font-display);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: var(--rs-shadow-hard);
  transition: transform var(--rs-dur-fast) var(--rs-ease),
    box-shadow var(--rs-dur-fast) var(--rs-ease);
}

.btn-retro:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--rs-shadow-hard-lg);
}

.btn-retro:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000;
}

.btn-retro:focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 3px;
}
```

### Input

```css
.field-retro {
  min-height: 44px;
  padding: 12px 14px;
  border: 2px solid var(--rs-border);
  border-radius: var(--rs-radius-sm);
  background: #000;
  color: var(--rs-ink);
  font-family: var(--rs-font-mono);
}

.field-retro::placeholder {
  color: var(--rs-ink-muted);
  opacity: 1;
}

.field-retro:focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 2px;
  box-shadow: var(--rs-glow);
}
```

### Modal

```css
.overlay-retro {
  background: rgb(0 0 0 / 0.78);
}

.dialog-retro {
  border: var(--rs-border-width) solid var(--rs-accent);
  border-radius: var(--rs-radius);
  background: var(--rs-surface);
  box-shadow: var(--rs-shadow-hard-lg);
  color: var(--rs-ink);
  font-family: var(--rs-font-mono);
}
```

Sin blur, sin transparencia: retro es sólido. No toques el focus trap ni el estado.

### Tabla

```css
.table-retro {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--rs-font-mono);
  color: var(--rs-ink);
}

.table-retro th {
  padding: 10px 12px;
  border: 2px solid var(--rs-border);
  background: var(--rs-surface-2);
  color: var(--rs-accent);
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.table-retro td {
  padding: 10px 12px;
  border: 1px solid var(--rs-border);
}

.table-retro tbody tr:nth-child(even) {
  background: rgb(255 255 255 / 0.04);
}

.table-retro tbody tr:hover {
  background: var(--rs-accent-soft);
}
```

## Scanlines (solo CRT)

Las scanlines van **dentro de la escena**, detrás del contenido y sin capturar eventos. La
forma segura es sumarlas como una capa más del fondo del `body` (o del wrapper que ya tiene
la escena). Evita un `::before` con `z-index: -1`: si el `body` tiene fondo, la capa puede
quedar detrás y desaparecer.

```css
body {
  background-color: var(--rs-bg);
  background-image: var(--rs-scanline), var(--rs-scene);
}
```

Si el proyecto ya usa una capa fija para la escena, añade `var(--rs-scanline)` como primera
imagen de esa capa. Nunca las pongas por encima de texto, modales o botones: reducen el
contraste y marean.

## Accesibilidad

- AA: texto 4.5:1; UI y texto grande 3:1. Los tokens ya están calculados; si cambias la
  paleta, vuelve a medir.
- El glow no es un indicador de estado por sí solo. Añade texto, subrayado o forma.
- Foco visible de 2px, offset 2–3px, 3:1 contra el entorno.
- Pixel font: solo display, mínimo 16px y textos cortos. El cuerpo siempre en mono.
- Scanlines con opacidad ≤ 0.10 y detrás del contenido.
- `prefers-reduced-motion`: sin flicker, sin scanlines animadas, sin `translate` en hover.
  Los tokens ya anulan las duraciones; añade `transform: none` a los hover que muevan.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| "Web 2.0 con pixel font" | Radios, blur o sombras suaves | Radios 0, sombras duras |
| CRT ilegible | Scanlines encima del texto | Capa detrás, opacidad ≤ 0.10 |
| Paleta ruidosa | 6+ colores o degradados | 3–4 colores + fondo |
| Pixel font cortada | Tamaño pequeño o sin fallback | ≥ 16px display, `monospace` |
| Contraste bajo | Fósforo tenue | Subir luminosidad del texto |
| Foco invisible | Glow como único foco | Outline sólido + offset |
| Se siente "moderno" | `border-radius` alto | 0–6px según dirección |

## Qué NO hacer

- No mezclar glassmorphism, blur o neumorfismo: retro es plano y duro.
- No usar `border-radius` grandes para "suavizar".
- No animar scanlines, flicker ni glitch de forma constante.
- No poner glow en párrafos completos.
- No usar más de una fuente display.
- No cambiar el layout ni los textos para que el pixel font quepa.
- No agregar un framework CSS nuevo si el proyecto no lo tiene.

## Checklist

- [ ] Dirección elegida: arcade, CRT o synthwave.
- [ ] Radios 0–6px y sombras duras.
- [ ] Paleta ≤ 4 colores + fondo.
- [ ] Pixel font solo display, con fallback y ≥ 16px.
- [ ] Scanlines detrás del contenido (si aplica).
- [ ] Contraste AA verificado.
- [ ] Foco visible y `prefers-reduced-motion`.
- [ ] Sin blur ni transparencias tipo glass.
