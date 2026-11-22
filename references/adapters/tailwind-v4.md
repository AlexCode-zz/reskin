# Adaptador: Tailwind CSS v4

Aplica cualquiera de los estilos del skill con utilidades. No repite las recetas: esas
están en `references/styles/`.

## Detección

- `@tailwindcss/postcss` o `@tailwindcss/vite`, o CSS con `@import "tailwindcss"` /
  `@theme`.
- **Puede no haber `tailwind.config.*`.** No lo exijas ni lo crees.

## Tokens: CSS global existente + `@theme`

Pega el bloque de `assets/tokens/<estilo>.css` en el CSS global que ya importa Tailwind y
mapea lo necesario. **No crees una hoja nueva.**

```css
@import "tailwindcss";

:root {
  /* tokens del estilo (incluye fallback y reduced motion) */
}

@theme inline {
  --color-rs-bg: var(--rs-bg);
  --color-rs-ink: var(--rs-ink);
  --color-rs-ink-muted: var(--rs-ink-muted);
  --color-rs-accent: var(--rs-accent);
  --color-rs-accent-ink: var(--rs-accent-ink);
  --color-rs-glass: var(--rs-glass);
  --color-rs-glass-strong: var(--rs-glass-strong);
  --color-rs-glass-border: var(--rs-glass-border);
  --color-rs-focus: var(--rs-focus);
  --radius-rs-sm: var(--rs-radius-sm);
  --radius-rs-md: var(--rs-radius-md);
  --radius-rs-lg: var(--rs-radius-lg);
  --shadow-rs-1: var(--rs-shadow-1);
  --shadow-rs-2: var(--rs-shadow-2);
  --font-rs-sans: var(--rs-font-sans);
  --font-rs-mono: var(--rs-font-mono);
}
```

- `@theme inline` es lo correcto cuando el valor referencia otra variable (`var(...)`).
- Nombres: `--color-rs-*` genera `bg-rs-*`, `text-rs-*`, `border-rs-*`;
  `--radius-rs-*` genera `rounded-rs-*`; `--shadow-rs-*` genera `shadow-rs-*`;
  `--font-rs-*` genera `font-rs-*`.
- Mapea solo lo que uses. No inventes nombres que no estén en el theme.
- El ejemplo usa los nombres de glassmorphism/liquid. En retro mapea los tokens reales del
  archivo (`--color-rs-surface`, `--shadow-rs-hard`...); no mapees `glass` ni `shadow-1`
  si el estilo no los define.

## Utilidades

```html
<article class="rounded-rs-md border border-rs-glass-border bg-rs-glass bg-[image:var(--rs-scrim)] text-rs-ink shadow-rs-1 [backdrop-filter:var(--rs-glass-filter)] [-webkit-backdrop-filter:var(--rs-glass-filter)]">
```

- Si un token no está mapeado, usa el valor arbitrario: `bg-[var(--rs-glass)]`,
  `rounded-[var(--rs-radius-md)]`.
- El scrim va como `bg-[image:var(--rs-scrim)]`; no lo omitas en superficies con texto.
- Transiciones: `transition-colors duration-[var(--rs-dur-fast)] ease-[var(--rs-ease)]`.
  **Nunca `transition-all`.**
- Movimiento reducido: `motion-reduce:transform-none` en los hover que muevan. Los tokens
  ya anulan las duraciones.
- Foco: `focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-rs-focus`.

## Reglas

- No añadas `@apply` nuevo ni CSS de componentes. Todo va en clases.
- No borres utilidades funcionales: `sr-only`, `hidden`, `print:*`, `dark:*`,
  `motion-reduce:*`, `group`, `peer`, variantes `data-*`.
- No uses `!important`; ajusta la utilidad o el token.
- No cambies `content`, `plugins`, `presets` ni la estrategia de dark mode del proyecto.
- No agregues variantes de tema nuevas (`@custom-variant`) para este trabajo.
- El fallback sin `backdrop-filter` y `prefers-reduced-motion` ya vienen en el bloque de
  tokens; no los reescribas en cada componente.

## Checklist

- [ ] Tokens en `@theme` del CSS global existente.
- [ ] Ninguna hoja CSS nueva.
- [ ] Utilidades en lugar de CSS de componentes.
- [ ] `transition-all` no introducido.
- [ ] Variantes funcionales intactas.
- [ ] Fallback y reduced motion presentes.

## Errores comunes

| Error | Arreglo |
|---|---|
| `bg-glass` sin token | Mapear `--color-rs-glass` o usar `bg-[var(--rs-glass)]` |
| `rounded-2xl` en retro | `rounded-rs-sm` o `rounded-none` |
| `transition-all` | `transition-colors duration-[var(--rs-dur-fast)]` |
| Blur en botones/inputs | Solo en superficies; controles con relleno y borde |
| Crear `tailwind.config.js` en v4 | No hace falta; tokens en `@theme` |
| Mapear todos los tokens "por si acaso" | Solo los usados; menos ruido |

## Efectos, fuentes y escena (nivel B/C)

- `reskin-fx.css`/`.js` son archivos de **efectos** (excepción a "sin hoja nueva"; ver `rules.md §2`). Se importan una vez; los componentes siguen en utilidades.
- Tokens de escena y tipografía van al theme; las fuentes con `<link>`/`next/font`.
- La escena (`body::before/::after`) va en el CSS global existente; es la única CSS de "capas" permitida junto a los keyframes de los efectos.
- Valores arbitrarios para los `data-rs-*`: `data-[rs-in]:opacity-100` es opcional; lo normal es que el script gestione el estado.
