# Detección: framework + capa de estilos

Dos ejes independientes. **Tailwind no es un framework: es una capa de estilos.**

- **Framework:** `react` | `nextjs` | `html-puro`
- **Capa de estilos:** `tailwind-v4` | `tailwind-v3` | `css-modules` | `css-puro`

## 1. Framework

| Evidencia (package.json / estructura) | Resultado |
|---|---|
| `next` en dependencies | `nextjs` |
| `react` o `react-dom`, sin `next` | `react` |
| Sin framework en deps + `index.html` | `html-puro` |
| Sin package.json y sin `index.html` | No detectado: preguntar |

Si están `next` y `react`, gana `nextjs` (React viene incluido).

## 2. Capa de estilos

### Tailwind v4 — señales

- Dependencia `@tailwindcss/postcss` o `@tailwindcss/vite`.
- CSS con `@import "tailwindcss";` (comillas simples o dobles).
- CSS con `@theme { ... }`.
- **Puede no tener `tailwind.config.js`.** No lo exijas.

### Tailwind v3 — señales

- `tailwind.config.js` / `.ts` / `.cjs` / `.mjs`.
- CSS con `@tailwind base;`, `@tailwind components;` o `@tailwind utilities;`.
- `tailwindcss` en deps y **sin** señales de v4.

### CSS Modules

- Archivos `*.module.css` (o `*.module.scss`) en `src/`, `app/` o `components/`.

### CSS puro

- Hojas `.css` sin Tailwind ni módulos.

**Si conviven Tailwind y CSS Modules**, la capa principal es Tailwind: se aplica con
utilidades y los módulos existentes se respetan. No se añade CSS de componentes.

## 3. Next.js: router

| Evidencia | Router |
|---|---|
| `app/layout.*` o `src/app/layout.*` | `app` |
| `pages/_app.*` o `src/pages/_app.*` | `pages` |
| Ambos | mixto: confirmar en el brief |

Solo aplica a `nextjs`. En React o HTML puro, `router: none`.

## 4. TypeScript

- `tsconfig.json` o archivos `.tsx` → `typescript: true`.
- Si no, `false`.

## 5. Entrypoints que debes localizar

- **Tailwind v4:** CSS global importado por el layout (`app/globals.css`,
  `src/app/globals.css`, `styles/globals.css`). Ahí van los tokens con `@theme`.
- **Tailwind v3:** `tailwind.config.*` + el CSS global con directivas `@tailwind`.
- **CSS Modules:** el `.module.css` del componente; tokens en el CSS global.
- **CSS puro:** la hoja principal (`styles.css`, `index.css`, la del `<link>`).

No escanees `node_modules`, `.next`, `dist` ni `build`.

## 6. Regla de aplicación (no negociable)

**Si hay Tailwind:**

1. Aplica el estilo con **clases utilitarias**.
2. Lleva los tokens al theme:
   - v4: `@theme` en el CSS global existente.
   - v3: `theme.extend` en `tailwind.config.*`.
3. **No agregues archivos CSS aparte** ni CSS de componentes. Nada de otro sistema.

**Si no hay Tailwind:**

1. Usa CSS normal con variables de `assets/tokens/<estilo>.css`.
2. Los tokens van en `:root` del CSS existente (global o módulo).
3. No introduzcas un framework CSS nuevo.

## Ficha resultante

```json
{
  "framework": "nextjs",
  "styling": "tailwind-v4",
  "router": "app",
  "typescript": true,
  "entryCss": "app/globals.css",
  "source": "package-json"
}
```

En el brief se muestra en lenguaje natural:
`Detecté Next.js (App Router) + Tailwind v4 + TypeScript.`

## Script opcional

```bash
bash scripts/detect-stack.sh
```

Imprime `framework`, `styling`, `router` y `typescript`. Si no está, no es ejecutable o
falla, el agente lee `package.json`, los configs y la estructura a mano. **El script no
es una dependencia.**

## No adivinar

- No deduzcas Next.js por la carpeta `app/` sola: confirma `next` en deps.
- No deduzcas Tailwind v3 por tener `tailwindcss` en deps: revisa el CSS.
- Si hay señales contradictorias (config v3 + `@import "tailwindcss"`), gana la señal del
  CSS y anótalo en el brief.
- Si no hay evidencia suficiente, pregunta una sola vez. No rellenes con suposiciones.

## Detección extra para efectos y escena (nivel B/C)

Anota también, para decidir dónde van los efectos y la escena:

| Dato | Cómo | Para qué |
|---|---|---|
| Entrypoint de CSS global | `src/index.css`, `src/App.css`, `app/globals.css`, `styles/globals.css` | Dónde pegar tokens y `@import` de `reskin-fx.css` |
| Entrypoint de JS | `src/main.jsx\|tsx`, `src/index.js`, `app/layout.tsx`, `pages/_app.*` | Dónde importar `reskin-fx.js` |
| Elemento `<html>` | `index.html`, `app/layout.tsx` | Dónde poner `data-rs-fx`, `data-rs-particles`, `data-theme` |
| Wrappers con fondo opaco | `#root`, `.app`, `main`, `body` con `background` | Hay que dejarlos transparentes para ver escena y partículas |
| Librerías de animación ya presentes | `gsap`, `framer-motion`, `lenis`, `tsparticles` | Si existen, se usan en vez de `reskin-fx` |
| Páginas tipo landing vs. dashboard | Rutas, hero, secciones | Sugerir nivel B (apps) o C (landings) |
