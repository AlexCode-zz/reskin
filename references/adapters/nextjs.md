# Adaptador: Next.js

## Detección

- `next` en `dependencies` → Next.js; `app/` → App Router, `pages/` → Pages Router.

## Dónde colocar la escena

- **App Router**: `app/globals.css` (o el CSS importado en el layout) + escena en
  `app/layout.tsx` (sobre el `<body>` o un wrapper). No crear layout nuevo si ya existe uno;
  usar el existente.
- **Pages Router**: `_app.tsx` + `pages/_app.tsx` equivalente o `styles/_app.css`.

## Reglas

- No usar `styled-jsx` nuevo (salvo que ya exista en el proyecto).
- Server Components: estilos solo vía CSS global/modules; no añadir `'use client'` solo por
  estilos.
- Tailwind v4: `@import "tailwindcss"` en el CSS global; tokens en `@theme`.
- Mantener `viewport`, metadata y layout intactos salvo lo estético.

## Checklist

- [ ] Escena en el lugar correcto (layout raíz).
- [ ] Solo estilos tocados.
- [ ] Fallback y reduced motion.

## Errores comunes

- Mover el `<body>` className sin tocar markup funcional.
- Agregar styled-jsx cuando el proyecto no lo usa.
- Romper el root layout al añadir tema.
