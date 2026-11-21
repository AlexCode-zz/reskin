# Glassmorphism

**Una frase:** vidrio sobre una escena controlada. El 70% del resultado es la escena; el vidrio solo la revela.

No es "tarjetas blancas semitransparentes sobre un gradiente violeta". Es un material con profundidad, borde de luz y una paleta que pertenece al producto.

## Cuándo usarlo

- Productos con superficies claras: dashboards, SaaS, herramientas creativas, landings de producto.
- Interfaces con tarjetas, paneles, nav flotante o modales.
- Marcas tecnológicas, de datos, audio, clima, finanzas o movilidad.

## Cuándo no

- Tablas densas o pantallas 100% operativas: el blur compite con la lectura.
- Sitios con imágenes de fondo cambiantes sin control (el contraste se vuelve una lotería).
- Dispositivos de gama baja como único target: `backdrop-filter` cuesta.
- Si el proyecto ya tiene un lenguaje visual fuerte (Material, Bootstrap): imponer vidrio lo rompe. En ese caso, refina su paleta y su tipografía, no lo disfraces.

## La escena

La escena se aplica **una vez** en el fondo del shell. Tres luces como máximo: dos frías y una cálida de contrapunto. Sin arcoíris, sin blobs animados, sin ruido encima del contenido.

```css
body {
  background-color: var(--rs-bg);
  background-image: var(--rs-scene);
  color: var(--rs-ink);
}
```

Si el proyecto tiene un shell propio, mejor una capa fija que no participe del scroll:

```css
.app-shell {
  position: relative;
  isolation: isolate; /* mantiene la capa detrás del contenido */
}

.app-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: var(--rs-scene);
}
```

Grano opcional: si lo usas, que sea una textura SVG sutil (≤ 3% de opacidad) **dentro de la escena**, nunca una capa encima de botones o texto.

## Jerarquía: 3 niveles, no 10

| Nivel | Ejemplos | Tratamiento |
|---|---|---|
| Chrome | nav, sidebar | Tinte bajo, blur 20–28px, borde solo en el lado que toca el contenido |
| Superficie | cards, paneles, listas | Tinte medio, blur 16–18px, borde 1px, sombra suave |
| Overlay | modales, popovers, menús | Tinte fuerte, blur 24–28px, sombra profunda y scrim detrás |

Los controles pequeños (botones, inputs, badges) **no llevan blur**: usan relleno translúcido y borde. El blur se reserva para superficies grandes. Máximo ~6 superficies con blur visibles a la vez.

## Intensidad

| Señal | Sutil | Equilibrada | Marcada |
|---|---:|---:|---:|
| `--rs-surface-alpha` (oscuro) | 0.05 | 0.075 | 0.11 |
| `--rs-surface-alpha` (claro) | 0.38 | 0.55 | 0.68 |
| `--rs-glass-blur` | 12px | 18px | 26px |
| `--rs-line-alpha` | 0.12 | 0.18 | 0.26 |
| Uso típico | dashboards densos | la mayoría | landing / hero |

Aplícalo en el bloque del tema activo, no en un selector global nuevo:

```css
:root {
  --rs-surface-alpha: 0.05;
  --rs-surface-alpha-strong: 0.08;
  --rs-line-alpha: 0.12;
  --rs-glass-blur: 12px;
}
```

## Con Tailwind

Lleva los tokens a `@theme` (v4) o a `theme.extend` (v3) y aplica las recetas con
utilidades; **no crees una hoja CSS nueva ni dupliques las recetas en CSS**. El detalle
está en `references/adapters/tailwind-v4.md` y `tailwind-v3.md`.

## Recetas

### Superficie base

```css
.glass-panel {
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-md);
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  box-shadow: var(--rs-shadow-1);
  color: var(--rs-ink);
}
```

```html
<article class="rounded-[var(--rs-radius-md)] border border-[var(--rs-glass-border)] bg-[var(--rs-glass)] bg-[image:var(--rs-scrim)] shadow-[var(--rs-shadow-1)] [backdrop-filter:var(--rs-glass-filter)] [-webkit-backdrop-filter:var(--rs-glass-filter)]">
```

El `background-image` (scrim) va **encima** del color del vidrio. Es lo que salva el contraste cuando la tarjeta cae sobre una zona clara de la escena.

### Barra de navegación

```css
.glass-chrome {
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  border-bottom: 1px solid var(--rs-glass-border);
}
```

Si la barra flota, entonces sí: borde completo, `--rs-radius-lg` y sombra. Nunca borde completo + borde inferior a la vez.

### Botón primario

El acento es sólido. El vidrio no se usa para el CTA principal: pierde fuerza y contraste.

```css
.btn-primary {
  background: var(--rs-accent);
  color: var(--rs-accent-ink);
  border: 1px solid rgb(255 255 255 / 0.18);
  box-shadow: 0 1px 0 rgb(255 255 255 / 0.25) inset,
    0 10px 24px -14px rgb(0 0 0 / 0.6);
  transition: background-color var(--rs-dur-fast) var(--rs-ease),
    transform var(--rs-dur-fast) var(--rs-ease);
}

.btn-primary:hover {
  background: var(--rs-accent-strong);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 3px;
}
```

### Botón secundario e input

```css
.btn-secondary,
.field {
  color: var(--rs-ink);
  background: var(--rs-glass);
  border: 1px solid var(--rs-glass-border);
  transition: background-color var(--rs-dur-fast) var(--rs-ease),
    border-color var(--rs-dur-fast) var(--rs-ease);
}

.btn-secondary:hover,
.field:hover {
  background: var(--rs-glass-strong);
  border-color: var(--rs-ink-muted);
}

.field::placeholder {
  color: var(--rs-ink-muted);
  opacity: 1;
}

:is(.btn-secondary, .field):focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 2px;
}
```

No uses `outline: none` ni reemplaces el foco por un cambio de color sutil.

### Modal / popover

```css
.overlay {
  background: rgb(3 10 9 / 0.58);
}

.dialog {
  background-color: var(--rs-glass-strong);
  background-image: var(--rs-scrim);
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-lg);
  box-shadow: var(--rs-shadow-2);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
}
```

El modal no vive dentro de otra superficie con blur: usa un portal si el proyecto ya lo hace. No cambies el focus trap ni el estado de apertura.

## Tipografía y color

- **Una sola voz tipográfica** por defecto (`--rs-font-sans`). Si la marca es editorial, cambia `--rs-font-display` a una serif del sistema; no mezcles tres familias.
- Display: `var(--rs-text-display)`, `line-height: 1.02`, `letter-spacing: -0.035em`, `text-wrap: balance`.
- Cuerpo: 15–17px, `line-height: 1.55–1.65`, máximo 68ch.
- Datos: `font-variant-numeric: tabular-nums`.
- Un solo acento. Debe ocupar menos del 10% de la pantalla: acciones, selección, foco. Nunca titulares completos en degradado.
- No uses `opacity` en el texto para crear jerarquía: usa `--rs-ink-muted`, que ya cumple AA.
- El borde del vidrio es **luz**, no gris: usa `--rs-glass-border`, no `gray-300`.
- Sombras: una luz superior, una sombra inferior. Nada de neón ni de `box-shadow` de color saturado.

## Movimiento

- 140–200ms para hover/foco; 200–320ms para overlays.
- Anima `background-color`, `border-color`, `opacity`, `transform` y `box-shadow`. **Nunca** `backdrop-filter` ni `filter`.
- Hover: eleva 1px como máximo. Nada de flotar, rotar o escalar tarjetas.
- Sin movimiento ambiental infinito. Si hay una animación de entrada, que sea una sola y breve.
- Respeta `prefers-reduced-motion`: los tokens ya ponen las duraciones a cero; además, elimina los `transform` de hover.

```css
@media (prefers-reduced-motion: reduce) {
  .btn-primary:hover,
  .glass-panel:hover {
    transform: none;
  }
}
```

## Tema claro

No reutilices los tokens oscuros sobre fondo claro. El tema claro ya está en `assets/tokens/glassmorphism.css`:

- Escena porcelana con luces jade/azul/ámbar muy bajas.
- Vidrio blanco al 55–72%, texto `#10201C`, borde oscuro al 16%.
- Acento latón profundo (`#7A4E12`), no el latón claro del tema oscuro.
- Sombras cortas y tintadas; una sombra negra fuerte sobre blanco se ve sucia.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve gris o sucio | Blanco puro al 5% sobre un fondo apagado | Tinte con el color de la escena + scrim; sube la escena, no el blanco |
| El texto no se lee | Vidrio demasiado transparente o texto con opacidad | Scrim, sube `--rs-surface-alpha`, usa `--rs-ink-muted` |
| Parece plástico | Borde de 2px + brillo interno fuerte + radio enorme | Borde 1px, highlight suave, radios por jerarquía |
| Va lento al scrollear | Blur en muchas superficies o en contenedores grandes | Menos superficies, blur ≤ 18px, sin blur en controles |
| No se nota el vidrio | La escena es plana | Añade 2–3 luces y un contrapunto cálido |
| Parece una plantilla | Mesh violeta + tarjetas blancas + Inter | Paleta de marca, escena asimétrica, tipografía con carácter |
| Se rompe un modal | `backdrop-filter` crea containing block para `fixed` | Portal fuera del vidrio; no anides `fixed` dentro de glass |
| Falla en Safari | Falta el prefijo | Incluye `-webkit-backdrop-filter` |
| Ilegible en claro | Tokens oscuros en tema claro | Usa el bloque light y revisa contraste |
| Todo tiene el mismo peso | Mismo radio, sombra y tinte en todos los niveles | 3 niveles, 3 radios, 2 sombras |

## Qué NO hacer

- **No glass sobre glass.** Si necesitas una tarjeta dentro de un panel, usa un tinte sólido, no otro blur.
- **No blur en texto, iconos, botones pequeños ni inputs.** Solo superficies.
- **No uses un mesh gradient arcoíris.** Es el sello de la plantilla genérica.
- **No uses `text-white/50` ni texto con opacidad.** Falla AA sobre vidrio.
- **No animes `backdrop-filter`.** Repinta cada frame y se siente barato.
- **No entregues sin fallback.** Sin `backdrop-filter`, el vidrio debe ser opaco y legible.
- **No pongas bordes de 2–3px "para que se vea el vidrio".** El vidrio se ve por la escena y la luz.
- **No confundas glassmorphism con neumorphism.** Nada de botones hundidos y sombras internas dobles.
- **No elimines el foco** ni lo cambies por un borde de 1px.
- **No cambies el layout, los tamaños ni los textos** para que "quepa" el efecto.
- **No uses `!important`** para ganar conflictos de utilidades. Ajusta la clase, no la guerra.
- **No agregues una librería de animación** ni un paquete de componentes para lograr esto.

## Checklist

- [ ] La escena existe una sola vez y tiene 2–3 luces, no un arcoíris.
- [ ] Solo hay 2–3 niveles de vidrio y ≤ 6 superficies con blur visibles.
- [ ] Los controles pequeños no tienen blur.
- [ ] El texto cumple AA sobre la zona más clara y la más oscura de la escena.
- [ ] Hay scrim en toda superficie que lleve texto.
- [ ] Existe fallback opaco sin `backdrop-filter`.
- [ ] `:focus-visible` es visible y tiene 3:1 contra el entorno.
- [ ] `prefers-reduced-motion` elimina transforms y duraciones.
- [ ] Se ve bien a 360px y el blur no ahoga la lectura.
- [ ] El diff solo contiene clases, CSS y tokens.
