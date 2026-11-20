# Detección de stack

Objetivo: saber con qué se está trabajando para no recomendar lo que no aplica.

## Orden de lectura (rápido)

1. `package.json` — dependencias clave.
2. Archivos de config: `tsconfig.json`, `vite.config.*`, `next.config.*`,
   `tailwind.config.*`, `postcss.config.*`, `*.config.js`, `*.config.ts`.
3. Estructura: `src/`, `app/` (Next), `pages/`, `components/`, `styles/`, `public/`.
4. Si es puro: index.html, styles, scripts.

## Preguntas a responder internamente

| Señal | Stack detectado |
|---|---|
| `react` o `react-dom` en deps | React |
| `next` en deps | Next.js (¿app router o pages? por `app/` vs `pages/`) |
| `@tailwindcss/*` v3 o v4 (`tailwindcss` + `@tailwindcss/postcss`) | Tailwind |
| `@emotion/react` / `@emotion/styled` / `@mui/material` / `@chakra-ui` / `@mantine/core` / `styled-components` | CSS-in-JS del proyecto |
| Sin framework en `dependencies`, pero hay `index.html` + CSS | HTML/CSS puro |
| `@vitejs/plugin-react` | Vite (contexto React) |
| Svelte en deps | Svelte (deuda mínima: adaptar tokens a `.svelte` scoped) |
| Vue en deps | Vue (deuda mínima: tokens a clases utilitarias) |

## Cómo leerlo con seguridad

- `next` en `dependencies` → Next.js. Mira `app/` o `pages/`.
- Tailwind v4: suele venir como `tailwindcss` + `@tailwindcss/postcss` (PostCSS) o como
  plugin de Vite. En v4 los estilos base van en CSS plano con `@import "tailwindcss"`.
- Tailwind v3: presencia de `tailwind.config.*` o de `@tailwind` directives en CSS.
- Si hay ambas, revisar versiones exactas en `package.json` antes de decidir.

## Si no está claro

- Si `package.json` está ausente o no da versión/estado, se asume HTML/CSS puro y se
  confirma en la entrevista.
- Si hay framework pero no CSS: se procede como "framework con estilos por defecto" y
  la decisión queda documentada en el resumen del brief.

## Formato del resultado (interno)

Emitir un bloque así en el resumen y las decisiones del brief:

```json
{
  "framework": "react | next | html | css-only | ...",
  "uiLibrary": "tailwind | mui | chakra | mantine | emotion | styled-components | none | css-modules",
  "cssApproach": "tailwind-v3 | tailwind-v4 | css-modules | styled-components | plain-css | theme-ui | none",
  "hasGlobalStyles": true,
  "router": "app | pages | none",
  "stateManagement": "...",
  "componentsDir": "src/components | app/components | components | src | app | none"
}
```

## Checklist de detección

- [ ] framework identificado con confianza
- [ ] uiLibrary y cssApproach identificados
- [ ] router / estructura leídos
- [ ] Si falta algo relevante para el estilo propuesto (p. ej. tiene `tailwind.config`
      para mapear tokens): registrar como requisito en el brief.

## No se detecta

No preguntar más allá de lo detectado. Si el usuario dice "no es nada de esto", el
resultado es HTML/CSS puro y el brief lo confirma.
