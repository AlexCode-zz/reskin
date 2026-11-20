# Adaptador: Tailwind CSS v4

## Detección

- `tailwindcss` + `@tailwindcss/postcss` (PostCSS) o plugin Vite; o directiva `@import
  "tailwindcss"` / `@theme` en CSS. (v3: `tailwind.config.*`.)

## Tokens en `@theme`

```css
@import "tailwindcss";

@theme inline {
  --color-rs-bg: var(--rs-bg);
  --color-rs-ink: var(--rs-ink);
  --color-rs-accent: var(--rs-accent);
  --color-rs-radius-md: var(--rs-radius-md);
}
```

Con `inline`, los utilities generados referencian las variables CSS en cascada (evita
duplicación y mantiene overrides de tema).

## Utilidades en clases

```html
<article class="rounded-[var(--rs-radius-md)] border border-[var(--rs-glass-border)] bg-[var(--rs-glass)] bg-[image:var(--rs-scrim)] shadow-[var(--rs-shadow-1)] [backdrop-filter:var(--rs-glass-filter)] [-webkit-backdrop-filter:var(--rs-glass-filter)]">
```

- Vidrio: arbitrario con variables (no nombres cortos) salvo que el `@theme` ya lo mapee.
- Blur/saturate: arbitrario en propiedades compuestas.
- Radio: `rounded-[var(--rs-radius-md)]`.
- Transiciones: arbitrario por propiedades, no `transition-all`.

## Overrides de preset

Para liquid-glass o retro, usar clases condicionales de tema/tokens según el brief:

```html
<div class="[--rs-glass-blur:48px] ..."> <!-- override inline por elemento -->
```

Mejor: sobreescribir en un wrapper o en el layout, no inline por elemento (salvo hover).

## Modificadores nativos a respetar

- `dark:`, `motion-reduce:`, `sr-only`, `hidden`, `print:*`, `data-*`, `group`, `peer`.
- No usar `!important`; ajustar la utilidad o el token.
- No `@apply` salvo que ya exista su uso.

## Checklist

- [ ] Tokens en `@theme` / CSS global existentes.
- [ ] No se creó hoja CSS nueva.
- [ ] `backdrop-filter` arbitrario con fallback (o `supports`).
- [ ] Breakpoints y `motion-reduce:` intactos.

## Errores comunes

- `bg-glass` sin token definido → usar arbitrario `bg-[var(--rs-glass)]`.
- Anidar blur en controles → mover a superficies.
- `transition-all` → arbitrario por propiedades.
