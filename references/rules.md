# Reglas de reskin

Estas reglas mandan sobre el estilo elegido y sobre cualquier preferencia estética. Si el estilo pide algo que las viola, **el estilo se adapta; la regla no se rompe**.

## 1. Superficie, no comportamiento

Un reskin cambia la piel. La lógica queda intacta.

| Permitido | Prohibido |
|---|---|
| `className`, `class`, `style` con propiedades visuales | Estados, hooks, `useEffect`, refs, handlers, condiciones |
| CSS, tokens, keyframes y media queries en el entrypoint existente | Props, API de componentes, rutas, fetching, validación, tests |
| Colores, tipografía, radios, sombras, espaciado, movimiento | Textos, `key` de listas, `aria-*`, roles, orden de tabulación |
| Overrides visuales de la librería de UI (tema, `sx`, variantes) | Dependencias, versiones, lockfiles, configuración de build (salvo tokens del theme de Tailwind: ver §2) |
| Una capa decorativa fija si es imprescindible (ver abajo) | Reestructurar el DOM, añadir wrappers de layout, cambiar elementos semánticos |

**Capa decorativa:** solo si no hay otra forma de aplicar la escena. Una sola, en la raíz, `aria-hidden="true"`, `pointer-events: none`, `position: fixed`, sin afectar el flujo. Si hay que envolver contenido, no lo hagas: busca el fondo del shell existente.

**Textos:** no los reescribas para que "quepan". Si el nuevo estilo necesita menos palabras, señálalo en el brief y deja la decisión al usuario.

## 2. Respeta el sistema de estilos que ya existe

No introduzcas un segundo sistema. Si hay Tailwind, se usan utilidades de Tailwind; no se agrega CSS de componentes aparte.

| El proyecto usa | Haz esto | No hagas esto |
|---|---|---|
| Tailwind v3/v4 | Utilidades + tokens al theme (`@theme` v4 / `theme.extend` v3) | Crear otra hoja, styled-components, CSS Modules nuevos |
| CSS Modules | Edita el `.module.css` que ya usa el componente | Renombrar clases exportadas (el JS las referencia) |
| CSS plano | Edita la hoja existente; tokens en `:root` | Añadir un framework CSS |
| styled-components / Emotion | Tokens en el theme o en el template existente | Mezclar con una hoja CSS nueva |
| shadcn/ui | Edita los strings de `cva`; conserva variantes y `asChild` | Cambiar nombres de variantes o la API |
| MUI / Chakra / Mantine | `sx`, theme o clases del componente | Reemplazar el componente por un `div` |
| Bootstrap / Bulma | Variables y clases del framework | Pelear con overrides globales |

**Tailwind, en concreto:**

- Usa valores arbitrarios con tokens: `bg-[var(--rs-glass)]`, `border-[var(--rs-glass-border)]`, `[backdrop-filter:var(--rs-glass-filter)]`.
- No borres clases funcionales: `sr-only`, `hidden`, `print:*`, `dark:*`, `motion-reduce:*`, `group`, `peer`, variantes `data-*`.
- No uses `!important` para resolver conflictos. Ajusta la utilidad o usa `tailwind-merge` **solo si ya está en el proyecto**. Única excepción: pisar `style` inline de una librería de terceros (tooltip de Recharts, etc.); ver `charts-and-widgets.md`.
- `@apply` solo si el proyecto ya lo usa.
- Lleva los tokens al theme: v4 → `@theme` en el CSS global existente; v3 → `theme.extend` en `tailwind.config.*`. Es la vía correcta para que existan `bg-rs-*`, `rounded-rs-*`, etc.
- No añadas plugins ni presets ni cambies `content` o la estrategia de dark mode. El theme solo recibe tokens del estilo.

## 2b. Widgets de terceros y tipografía

- **Gráficos, tooltips, selects, calendarios y toasts de librerías se restilizan siempre.**
  Si no, quedan con el aspecto por defecto (tooltip blanco, ejes grises) y rompen el estilo.
  Ver `references/charts-and-widgets.md`.
- **Nunca `text-transform: capitalize` ni la clase `capitalize` en títulos en español**: pone
  en mayúscula "De", "Del", "Y". Usa `uppercase`, `normal-case` o respeta el texto original.
- Los colores de serie de un gráfico salen de `--rs-chart-1..5`; el mismo concepto (gastos,
  ingresos) usa siempre el mismo token en barras, montos y badges. No mezcles tonos.
- La categoría que tiene color en un gráfico lo conserva en su badge (`.rs-badge--c1..c5`).

## 3. Clases condicionales y props

La condición se conserva; solo cambian las clases de cada rama.

```jsx
// Antes
<button className={active ? "tab active" : "tab"} onClick={onSelect}>

// Después
<button
  className={
    active
      ? "tab tab--active rounded-[var(--rs-radius-sm)] bg-[var(--rs-glass-strong)] text-[var(--rs-ink)]"
      : "tab rounded-[var(--rs-radius-sm)] text-[var(--rs-ink-muted)] hover:bg-[var(--rs-glass)]"
  }
  onClick={onSelect}
>
```

- No inviertas condiciones (`!active`), no extraigas lógica a variables nuevas, no conviertas un ternario en estado.
- Si el componente recibe `className` desde fuera, **añade** al final; no la sobrescribas.
- No añadas props nuevas (`className`, `style`, `variant`) a componentes que no las aceptan. Eso cambia la API. Usa el mecanismo de tema de la librería o edita sus clases internas.
- No cambies el orden de los props ni elimines `disabled`, `type`, `name`, `value`, `onChange`, `aria-label`.
- En listas, no toques `key`; en formularios, no toques `name`, `id` ni el tipo de input.

## 4. Accesibilidad por defecto

No es opcional y no se negocia por estética.

### Contraste

- Texto normal: **4.5:1** mínimo. Texto grande (≥ 24px, o ≥ 18.66px bold) y UI: **3:1**.
- Ejes, leyendas y etiquetas de gráficos son texto: usan `--rs-chart-axis` (= `--rs-ink-muted`), nunca un gris fijo.
- Sobre vidrio, comprueba el peor caso: la zona **más clara** y la **más oscura** de la escena. No midas solo contra el fondo base.
- No uses opacidad en el texto. `--rs-ink-muted` está calculado para AA; `text-white/50` no.
- El placeholder es texto: también necesita contraste.
- El color no puede ser el único indicador de estado. Añade texto, icono o forma.

### Foco

- `:focus-visible` visible, mínimo 2px, con offset, y 3:1 contra el entorno.
- No elimines el outline. No lo sustituyas por un cambio de color de 1px.
- No ocultes el foco con `overflow: hidden` ni con `clip-path`.

### Movimiento

- Respeta `prefers-reduced-motion`. Los tokens ya ponen las duraciones a cero; añade `transform: none` en los hover que muevan.
- Nada de movimiento infinito, parallax automático ni autoplay que no se pueda pausar.
- No escondas contenido detrás de una animación de entrada.
- `transition-all` está prohibido: anima solo las propiedades necesarias.

### Formularios y targets

- Mantén labels asociados, textos de error visibles y el mensaje de error junto al campo.
- No desactives el zoom (`maximum-scale=1`, `user-scalable=no`).
- Target táctil: 44×44px recomendado; 24×24px es el mínimo WCAG 2.2. No encojas botones para "afinar" el diseño.
- A 200% de zoom no debe haber scroll horizontal ni contenido cortado.

## 5. Movimiento

- Microinteracciones: 120–200ms. Overlays: 200–320ms. Easing: `var(--rs-ease)`.
- Anima `color`, `background-color`, `border-color`, `opacity`, `transform`, `box-shadow`. No animes `width`, `height`, `top`, `left`, `filter` ni `backdrop-filter`.
- Hover: 1–2px de elevación como máximo. No escales tarjetas enteras ni rotes iconos decorativos.
- `will-change` solo durante una animación y retíralo después. Mejor no usarlo.
- Sin librerías de animación nuevas.

## 6. Responsive y layout

- Conserva los breakpoints y las utilidades de visibilidad del proyecto.
- No cambies el layout para que el efecto quepa. Si algo no cabe, el problema es el estilo, no la estructura.
- Prueba 360, 768 y 1280px. Sin scroll horizontal.
- No uses alturas fijas para "alinear" tarjetas con texto variable.
- No bajes el cuerpo por debajo de 14px ni el texto secundario de 13px.
- En móvil, reduce el blur (`--rs-glass-blur: 12px`) antes que quitar contenido.

## 7. Rendimiento

- `backdrop-filter` es caro: máximo ~6 superficies visibles y nunca en contenedores que scrollean.
- No apliques blur a botones, inputs, badges ni filas de tabla.
- `backdrop-filter` crea un containing block: los hijos `position: fixed` se posicionan respecto al vidrio. Revisa modales y menús; si el proyecto usa un portal, no lo cambies.
- Entrega siempre el fallback opaco (`@supports not (backdrop-filter: ...)`).
- Evita `background-attachment: fixed` en iOS; usa una capa fija o deja el fondo en el body.
- No uses imágenes gigantes para la escena: gradientes CSS pesan cero.

## 8. Disciplina de cambio

- Antes de editar, escribe la lista exacta de archivos y qué cambia en cada uno. Está en el brief.
- No reformatees archivos completos, no renombres, no borres código muerto, no actualices dependencias, no toques el lockfile.
- No hagas commits ni `git checkout` sin permiso.
- Un archivo con lógica se edita **solo** en sus atributos de clase/estilo. Si el diff muestra otra cosa, revierte esa parte.
- Revisa con `git diff --word-diff` que solo cambian clases, CSS y tokens.
- No arregles errores preexistentes de build/lint. Anótalos como baseline.

## 9. Cuándo parar y preguntar

Detente si:

- El estilo requiere mover o envolver DOM, cambiar props o añadir estado.
- La librería de UI no permite estilizar sin cambiar su API.
- El contraste AA es imposible sin cambiar textos, layout o tema.
- Haría falta una dependencia, un paquete de fuentes o un plugin.
- El build falla por algo que ya fallaba antes y no puedes verificar tu cambio.
- El usuario pide además cambiar copy, lógica o rutas: es otro trabajo, no un reskin.

## 10. Definición de terminado

- [ ] El brief aprobado está implementado.
- [ ] El diff no contiene lógica, props, estado, textos, rutas ni dependencias.
- [ ] Contraste AA verificado en el peor caso (texto y UI).
- [ ] Foco visible y navegación por teclado intacta.
- [ ] `prefers-reduced-motion` respetado y probado.
- [ ] 360 / 768 / 1280px sin scroll horizontal ni contenido cortado.
- [ ] Build/lint/typecheck ejecutados (o baseline anotado si ya fallaban).
- [ ] Fallback sin `backdrop-filter` comprobado.
- [ ] Resumen final: archivos tocados, decisiones, checks y riesgos.
