# Adaptador: React (glassmorphism)

Cómo aplicar los tokens y recetas de `references/styles/glassmorphism.md` al stack React.

## Precondición detectada

Confirmar al final de la detección que se trata de React (con o sin Next.js) y qué CSS usa.
Si el stack resultante es React + Tailwind → este adapter se combina con el adapter
`tailwind-v4` o `tailwind-v3`. Si es React + CSS Modules / plain CSS → se edita el CSS
existente. Si es React + Emotion / styled-components → se aplican los mismos tokens en el
sistema existente.

## Objetivo del diff

- **Sin cambios en** componentes que ya compilan: solo se refuerza la cadena de clases.
- **En** el CSS global existente: tokens + escena + fallback. O en el entrypoint de estilos
  que ya existe (no crear hoja nueva).

## Tailwind (cuando aplique)

- Tokens: CSS variables en el CSS global (o en `@theme` si Tailwind v4 lo exige por su
  arquitectura). Los nombres del skill (`--rs-*`) se mapean con `--color-rs-glass: var(--rs-glass);`
  si se prefiere la convención Tailwind, o arbitrario: `bg-[var(--rs-glass)]`.
- Vidrio: `[background-color:var(--rs-glass)] [background-image:var(--rs-scrim)] [backdrop-filter:var(--rs-glass-filter)] [-webkit-backdrop-filter:var(--rs-glass-filter)]`.
- Borde: `border-[var(--rs-glass-border)]`.
- Radio: `rounded-[var(--rs-radius-md)]`.
- Sombras: `shadow-[var(--rs-shadow-1)]`.
- Hover/foco: usa los estilos nativos (`hover:`, `focus-visible:`) combinados con los
  tokens. Nunca `transition-all`; usa `transition-[background-color,border-color,box-shadow]`.

```jsx
// Tarjeta existente
<article className="glass-panel">
  {/* solo se espera que la clase exista; si no existe, agregar al template */}
</article>
```

Si la clase `.glass-panel` no existe, **añadirla en el CSS del proyecto** con las recetas
de la referencia de estilos, usando los tokens. No duplicar estilos inline por elemento salvo
caso justificado (hover dinámico).

## React sin Tailwind

- Crear/actualizar las clases en la hoja CSS global o en el CSS module del componente,
  usando los tokens de `assets/tokens/glassmorphism.css`.
- Componer con `className` existente; si el componente usa `className` interno, reemplazar
  ese string por las clases semánticas del proyecto. No duplicar el mismo estilo en 10
  componentes: buscar si ya existe una clase compartida (`Card`, `Panel`, `Surface`).

## Next.js

- Mismo CSS global o module. En App Router, el layout raíz (`app/layout.tsx`) es el lugar
  correcto de la escena. En Pages Router, `_app.tsx`.
- Nada de `styled-jsx` salvo que ya exista; no añadirlo.
- Server Components: no se usan estilos; el CSS global es la vía. Si se necesita vidrio en un
  Client Component, seguir sin añadir `'use client'` solo por estilos.

## Checklist de diff para React

- [ ] Solo strings de `className` / `class` modificados.
- [ ] Solo CSS (global o module) y tokens modificados.
- [ ] No hay cambios en `useState`, `useEffect`, props, tipos ni handlers.
- [ ] `transition-all` no introducido.
- [ ] Clases condicionales conservan la condición original.
- [ ] Foco y movimiento respetados.

## Errores comunes

| Error | Causa | Arreglo |
|---|---|---|
| Cambia el componente entero | Falta delimitar qué es estética | Reescribir solo la cadena de clases |
| Añade estilos inline repetidos | No hay clase compartida | Crear clase semántica existente o reutilizar |
| Olvida el scrim | Vidrio sobre escena clara | `background-image` con scrim |
| Olvida fallback | backdrop-filter sin soporte | `@supports` o tokens con fallback |
