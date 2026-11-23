# Liquid Glass

**Una frase:** vidrio con cuerpo. Blur alto, saturación alta y un borde de luz (specular)
que hace que la superficie parezca cristal líquido.

No es glassmorphism con más blur: es un material distinto, pensado para **chrome flotante**
sobre escenas ricas. Si el brief pide superficies medianas y sobrias, usa glassmorphism.

## Cuándo usarlo

- Barra de navegación flotante, tab bar, dock, popovers, controles de media, widgets.
- Producto consumer premium, con poco contenido por pantalla.
- Modales sobre imágenes o video, siempre con scrim.

## Cuándo NO usarlo

- Tablas densas, dashboards operativos o pantallas con mucho texto.
- Dispositivos de gama baja como target principal: blur de 48px en varias capas cuesta.
- Preferencia `prefers-reduced-transparency`: el token file ya devuelve vidrio opaco.
- Si el brief pide sobriedad: glassmorphism.

## Tokens

Archivo: `assets/tokens/liquid-glass.css`. Todo el estilo se controla desde ahí.

| Token | Uso |
|---|---|
| `--rs-bg`, `--rs-scene`, `--rs-ink` | Lienzo, escena y texto |
| `--rs-accent`, `--rs-accent-ink` | CTA y foco |
| `--rs-glass`, `--rs-glass-strong` | Relleno translúcido |
| `--rs-glass-border`, `--rs-specular` | Borde y luz superior |
| `--rs-glass-blur` (48px), `--rs-glass-saturate` (180%) | Material |
| `--rs-glass-filter` | `blur() saturate()` listo para `backdrop-filter` |
| `--rs-shadow-1`, `--rs-shadow-2` | Sombras internas + exteriores |
| `--rs-radius-sm`, `--rs-radius-md`, `--rs-radius-lg`, `--rs-radius-pill` | Forma |
| `--rs-focus`, `--rs-focus-ring`, `--rs-dur-fast`, `--rs-dur`, `--rs-dur-slow` | Foco y movimiento |
| `--rs-glass-fallback` | Fondo opaco sin `backdrop-filter` |

**Con Tailwind:** mapea estos tokens en `@theme` (v4) o `theme.extend` (v3) y usa
utilidades. **Sin Tailwind:** pega los tokens en `:root` del CSS existente y usa clases
semánticas. En ambos casos: **no agregues una hoja CSS aparte**.

## Reglas del material

- Blur 40–60px, `saturate` 160–200%. Menos blur se ve como glassmorphism; más, como leche.
- El brillo del borde es **inner shadow** (`--rs-specular`), no un `border` grueso.
- Scrim siempre que haya texto: `background-image: var(--rs-scrim)`.
- Máximo 3–4 superficies con blur visibles. Los controles pequeños **no** llevan blur.
- No anides vidrio dentro de vidrio. Si necesitas una tarjeta interior, usa un tinte sólido.

## Componentes

> **Fuente de verdad:** `assets/components/liquid-glass.css` trae la biblioteca completa (app/escena,
> navbar, sidebar, card, métrica, botones, inputs, select, tabs, badges, tabla, modal,
> tooltip, toast, progreso, gráficos de terceros, fallbacks y movimiento). Los fragmentos de
> abajo son un resumen ilustrativo: si difieren, manda el archivo.

### Navbar flotante

```css
.nav-liquid {
  position: sticky;
  top: 12px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-pill);
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  box-shadow: var(--rs-shadow-1);
}
```

Si el proyecto ya tiene una barra fija, no cambies su `position`; solo el material.

### Card

```css
.card-liquid {
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-md);
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  box-shadow: var(--rs-shadow-1);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  color: var(--rs-ink);
}
```

### Botón

```css
.btn-liquid {
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: var(--rs-radius-pill);
  background: var(--rs-accent);
  color: var(--rs-accent-ink);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.45),
    0 12px 28px -16px rgb(0 0 0 / 0.65);
  transition: background-color var(--rs-dur-fast) var(--rs-ease);
}

.btn-liquid:hover { background: var(--rs-accent-strong); }

.btn-liquid:focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 3px;
}
```

El CTA va sólido, no con blur: el vidrio le quita fuerza y contraste.

### Input

```css
.field-liquid {
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-sm);
  background: var(--rs-glass);
  color: var(--rs-ink);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.10);
}

.field-liquid::placeholder {
  color: var(--rs-ink-muted);
  opacity: 1;
}

.field-liquid:focus-visible {
  outline: 2px solid var(--rs-focus);
  outline-offset: 2px;
}
```

Sin `backdrop-filter` en inputs: fondo translúcido, borde y foco.

### Modal

```css
.overlay-liquid {
  background: rgb(3 8 14 / 0.62);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.dialog-liquid {
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-lg);
  background-color: var(--rs-glass-strong);
  background-image: var(--rs-scrim);
  box-shadow: var(--rs-shadow-2);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  color: var(--rs-ink);
}
```

No cambies el focus trap ni el estado de apertura. Si el modal se renderiza en un portal,
déjalo así.

### Tabla

El blur va en el **contenedor**, nunca en cada fila. En tablas densas, desactívalo:

```css
.table-liquid-wrap {
  border: 1px solid var(--rs-glass-border);
  border-radius: var(--rs-radius-md);
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  box-shadow: var(--rs-shadow-1);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
  overflow: auto;
}

.table-liquid {
  width: 100%;
  border-collapse: collapse;
  color: var(--rs-ink);
}

.table-liquid th {
  background: var(--rs-bg-elevated);
  color: var(--rs-ink);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  text-align: left;
}

.table-liquid td {
  border-top: 1px solid var(--rs-glass-border);
}

.table-liquid tbody tr:hover {
  background: var(--rs-accent-soft);
}
```

Con muchas filas, usa `background: var(--rs-glass-fallback)` y elimina el
`backdrop-filter`. La legibilidad gana a la estética.

## Filtros SVG (solo mejora opcional)

Un `feTurbulence` + `feDisplacementMap` puede dar refracción. Reglas:

- Aplícalo **solo a capas decorativas**, nunca a texto, botones ni inputs.
- Debe existir un fallback: sin SVG, el estilo se ve completo.
- Nada de animar el filtro. Cuesta y marea.
- Si el proyecto soporta `prefers-reduced-transparency`, desactívalo.

```html
<svg aria-hidden="true" width="0" height="0">
  <filter id="liquid-warp">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012"
      numOctaves="2" seed="8" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
      xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```

## Accesibilidad

- Texto normal 4.5:1; texto grande y UI 3:1. Verifica sobre la zona **más clara** y la
  **más oscura** de la escena.
- El scrim es obligatorio en cualquier superficie con texto. Sin él, el contraste depende
  de lo que pase por detrás (video, scroll, imagen).
- No uses opacidad en el texto: usa `--rs-ink-muted`.
- Foco visible de 2px, offset 3px y 3:1 contra el entorno.
- `prefers-reduced-motion`: los tokens anulan las duraciones; añade `transform: none` en
  los hover que muevan.
- `prefers-reduced-transparency`: vidrio opaco (ya cubierto por los tokens).

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve "doble" | Vidrio sobre vidrio | Un solo material; interior con tinte sólido |
| Falta el brillo de cristal | No hay `--rs-specular` | Inner shadow superior |
| Se ve lechoso | Blur > 60px o alpha alto | Baja alpha; el blur no es el problema |
| Texto ilegible | Scrim insuficiente | `background-image: var(--rs-scrim)` |
| Va lento | Blur en muchas capas/filas | ≤ 3–4 superficies; tabla sin blur |
| No funciona en Safari | Falta prefijo | `-webkit-backdrop-filter` |
| Sin soporte, se rompe | No hay fallback | `--rs-glass-fallback` + `@supports` |
| Filtro SVG deforma el texto | Se aplicó a contenido | Solo a capas decorativas |

## Qué NO hacer

- No glass sobre glass.
- No filtros SVG en texto, botones ni inputs.
- No blur en controles pequeños ni en cada fila de tabla.
- No animar `backdrop-filter` ni `filter`.
- No usar el vidrio como excusa para bajar el contraste.
- No agregar una hoja CSS nueva si hay Tailwind.
- No cambiar el layout, los textos ni la lógica para que el material luzca.

## Checklist

- [ ] Blur 40–60px y saturate 160–200%.
- [ ] Specular superior presente.
- [ ] Scrim en toda superficie con texto.
- [ ] ≤ 3–4 superficies con blur.
- [ ] Tabla/lista densa sin blur (o con fallback opaco).
- [ ] Fallback sin `backdrop-filter` y sin transparencia reducida.
- [ ] Contraste AA en el peor caso.
- [ ] Foco visible y `prefers-reduced-motion`.
- [ ] Sin filtros SVG sobre contenido.

## v2 · Ingredientes obligatorios (regla de los 6 de `design-depth.md`)

El vidrio solo luce si hay **algo que desenfocar detrás**. Antes de aplicarlo, revisa que exista escena.

| # | Ingrediente | Receta |
|---|---|---|
| 1 | Tipografía | Display grande y apretado (`.rs-display`, tracking −0.04em) en Plus Jakarta Sans / Inter. |
| 2 | Forma | Radios 16–32px; chrome flotante en píldora. |
| 3 | Profundidad | Borde de luz + sombra larga; superficies con blur (≤ 6, ≤ 4 en liquid). |
| 4 | Escena | `--rs-scene` en `:root` (ya en la hoja, §13) + luces de color; en liquid, mejor sobre una foto o gradiente intenso. |
| 5 | Material | Vidrio con fallback opaco; controles pequeños sin blur. |
| 6 | Movimiento | Partículas `orbs`, spotlight que sigue al cursor, reveal escalonado. |
| 7 | Firma | brillo especular en `.rs-media`, tilt en 2–3 tarjetas; imagen detrás del vidrio (nivel C). |

- Efectos: `data-rs-fx="particles reveal spot"`, `data-rs-particles="orbs"` (máximo 3).
- Imágenes (nivel C): una foto/gradiente intenso detrás del cristal; ver `references/images.md`.
