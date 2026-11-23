# Adaptador: Tailwind CSS v3

Aplica cualquiera de los estilos del skill con utilidades. No duplica las recetas.

## Detección

- `tailwind.config.js|ts|cjs|mjs` y CSS con `@tailwind base;`, `@tailwind components;` o
  `@tailwind utilities;`.
- `tailwindcss` en deps sin señales de v4.

## Tokens: CSS global + `theme.extend`

1. Pega el bloque `:root` de `assets/tokens/<estilo>.css` en el CSS global que ya tiene
   las directivas `@tailwind`. Incluye fallback y reduced motion.
2. Mapea en `tailwind.config.*` solo lo que uses:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [/* no tocar */],
  theme: {
    extend: {
      colors: {
        rs: {
          bg: "var(--rs-bg)",
          ink: "var(--rs-ink)",
          "ink-muted": "var(--rs-ink-muted)",
          accent: "var(--rs-accent)",
          "accent-ink": "var(--rs-accent-ink)",
          glass: "var(--rs-glass)",
          "glass-strong": "var(--rs-glass-strong)",
          "glass-border": "var(--rs-glass-border)",
          focus: "var(--rs-focus)",
        },
      },
      borderRadius: {
        "rs-sm": "var(--rs-radius-sm)",
        "rs-md": "var(--rs-radius-md)",
        "rs-lg": "var(--rs-radius-lg)",
      },
      boxShadow: {
        "rs-1": "var(--rs-shadow-1)",
        "rs-2": "var(--rs-shadow-2)",
      },
      fontFamily: {
        "rs-sans": "var(--rs-font-sans)",
        "rs-mono": "var(--rs-font-mono)",
      },
    },
  },
};
```

- Usa `theme.extend`, nunca `theme` completo: no pises colores, radios ni sombras del
  proyecto.
- El ejemplo usa los nombres de glassmorphism/liquid. En los demás estilos mapea los tokens reales del
  archivo (`surface`, `shadow-hard`...); no mapees `glass` ni `shadow-1` si el estilo no los
  define.
- No toques `content`, `plugins`, `presets`, `darkMode` ni `corePlugins`.
- Si el config es TypeScript, conserva el tipo (`Config`) y el formato existente.

## Utilidades

```html
<article class="rounded-rs-md border border-rs-glass-border bg-rs-glass bg-[image:var(--rs-scrim)] text-rs-ink shadow-rs-1 [backdrop-filter:var(--rs-glass-filter)] [-webkit-backdrop-filter:var(--rs-glass-filter)]">
```

- Valores arbitrarios para lo no mapeado: `bg-[var(--rs-glass)]`,
  `rounded-[var(--rs-radius-md)]`.
- Scrim: `bg-[image:var(--rs-scrim)]` en toda superficie con texto.
- Transiciones: `transition-colors duration-[var(--rs-dur-fast)] ease-[var(--rs-ease)]`.
  **Nunca `transition-all`.**
- Reduced motion: `motion-reduce:transform-none` en hovers que muevan.
- Foco: `focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-rs-focus` (requiere
  `colors.rs.focus`).

## Reglas

- Nada de `@apply` nuevo ni CSS de componentes.
- No borres clases funcionales (`sr-only`, `hidden`, `dark:*`, `group`, `peer`).
- No uses `!important`; ajusta la utilidad o el token.
- No agregues plugins ni presets.
- Si el proyecto tiene `darkMode: "class"`, no lo cambies a `media` (ni al revés). Los
  tokens pueden convivir con sus variantes `dark:` existentes.

## Checklist

- [ ] Tokens en el CSS global existente.
- [ ] Solo `theme.extend` modificado en el config.
- [ ] `content`, `plugins`, `presets` y `darkMode` intactos.
- [ ] Utilidades en lugar de CSS de componentes.
- [ ] `transition-all` no introducido.
- [ ] Fallback y reduced motion presentes.

## Errores comunes

| Error | Arreglo |
|---|---|
| Reemplazar `theme` entero | Usar `theme.extend` |
| `bg-glass` sin token | Mapear en `colors.rs` o usar arbitrario |
| Crear un plugin para los tokens | `theme.extend` + variables CSS |
| `transition-all` | `transition-colors` con duración token |
| Tocar `content` para "forzar" clases | Dejar el content del proyecto |
| Añadir otra hoja para tokens | Pegarlos en el CSS global existente |

## Efectos, fuentes y escena (nivel B/C)

- `reskin-fx.css`/`.js` son archivos de **efectos** (excepción a "sin hoja nueva"; ver `rules.md §2`). Se importan una vez; los componentes siguen en utilidades.
- Tokens de escena y tipografía van al theme; las fuentes con `<link>`/`next/font`.
- La escena (`body::before/::after`) va en el CSS global existente; es la única CSS de "capas" permitida junto a los keyframes de los efectos.
- Valores arbitrarios para los `data-rs-*`: `data-[rs-in]:opacity-100` es opcional; lo normal es que el script gestione el estado.
