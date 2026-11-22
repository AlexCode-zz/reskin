# Adaptador: Next.js

Next.js ya incluye React: este archivo cubre ambos. No cargues `react.md` en un proyecto
Next.

> **Componentes:** las recetas completas del estilo están en `assets/components/<estilo>.css`
> (mismos nombres de clase en los tres estilos). Gráficos y widgets de terceros:
> `references/charts-and-widgets.md`.

## Detección

- `framework: nextjs`; `router: app | pages`; `styling` y `typescript` según el script.
- `src/` es opcional: `src/app` y `src/pages` equivalen a `app` y `pages`.

## App Router

| Qué | Dónde |
|---|---|
| Tokens | El CSS global que importa `app/layout.tsx` (`app/globals.css` o equivalente) |
| Escena | `body` en el layout raíz, desde el CSS global o con `className` |
| Componentes | Utilidades Tailwind o el `.module.css` que ya importa el componente |
| Modales/menús | El portal y el focus trap existentes; no los muevas |

- **No añadas `"use client"` por estilos.** Un Server Component acepta `className`, CSS
  global y CSS Modules.
- No crees otro layout, provider ni tema. Si el proyecto ya tiene toggle de tema, usa sus
  atributos o clases.
- Mantén `metadata`, `viewport`, `lang`, estructura del `<body>` y orden de providers.
  Solo cambia `className`/`style` visual.
- No agregues `next/font` ni fuentes nuevas. Si ya existe una variable de fuente, apunta
  `--rs-font-*` a ella desde el CSS.

## Pages Router

| Qué | Dónde |
|---|---|
| Tokens | `styles/globals.css` o el CSS que importa `pages/_app.tsx` |
| Escena | El wrapper de `_app.tsx` o `body` desde el CSS global |
| Componentes | Utilidades Tailwind o el `.module.css` existente |

- `_document.tsx` solo si ya existe y el fondo debe ir en `<html>`/`<body>`. No lo crees de
  cero.
- No cambies `_app.tsx` fuera de `className`/`style` y del import de CSS que ya existía.

## Rama A — Tailwind (v4 o v3)

- **v4:** pega los tokens en el CSS global que ya hace `@import "tailwindcss"` y mapéalos
  en `@theme`. Aplica con utilidades. Detalle en `tailwind-v4.md`.
- **v3:** pega los tokens en el CSS global con directivas `@tailwind` y mapéalos en
  `theme.extend` de `tailwind.config.*`. Detalle en `tailwind-v3.md`.
- No crees `globals-extra.css`, `theme.css` ni CSS de componentes.
- No toques `content`, `plugins`, `presets` ni la estrategia de dark mode.

## Rama B — CSS Modules o CSS puro

- Tokens en `:root` del CSS global existente.
- Edita el `.module.css` del componente; no renombres las clases exportadas ni cambies
  `styles.foo` en el JSX.
- Si no hay CSS global, usa `:global(:root)` en el módulo raíz que ya se importa; no crees
  una hoja nueva solo para tokens.

## Server Components y movimiento

- Hover, foco, transiciones, responsive y `prefers-reduced-motion` se resuelven con CSS,
  no con estado ni `"use client"`.
- Nada de `useEffect`, `useState` ni `window` para aplicar el tema o animaciones.
- Las animaciones de entrada no deben depender de JS ni bloquear el render.

## Verificación

- Ejecuta el script de build existente (`next build` o `npm run build`). Si ya fallaba,
  anota el baseline y no lo arregles.
- Revisa `git diff`: solo clases, CSS y tokens.
- Comprueba que no hay cambios de hidratación: ni `Date`, ni `Math.random`, ni clases
  calculadas en render.

## Checklist

- [ ] Router respetado (`app/` o `pages/`).
- [ ] Tokens en el CSS global existente; nada de hojas nuevas.
- [ ] Cero `"use client"` añadidos por estilos.
- [ ] `metadata`, `viewport`, providers y estructura intactos.
- [ ] Server Components sin lógica nueva.
- [ ] Fallback y `prefers-reduced-motion`.
- [ ] Build ejecutado o baseline anotado.

## Errores comunes

| Error | Arreglo |
|---|---|
| Añadir `"use client"` para un hover | CSS (`:hover`, `:focus-visible`) |
| Crear `app/theme.css` | Tokens en el `globals.css` existente |
| Convertir un Server Component en cliente | Estilar con clases/CSS, sin estado |
| Tocar `metadata` o `viewport` | Solo estética |
| Crear un `ThemeProvider` nuevo | Usar el mecanismo existente o tokens estáticos |
| Cambiar `_document.tsx` sin necesidad | Fondo desde el CSS global |
| Editar el focus trap del modal | Dejarlo como está; solo cambiar clases |
