# Adaptador: HTML/CSS puro

Para proyectos sin framework JS: `index.html` + una o varias hojas CSS, con o sin JS
propio. Sin build: solo se usa lo que ya existe.

## Detección

- `framework: html-puro`.
- `styling: css-puro` (lo normal) o `css-modules` si el HTML los consume.
- Si hay `package.json` pero sin React ni Next, sigue siendo HTML puro.

## Dónde va cada cosa

| Qué | Dónde |
|---|---|
| Tokens | `:root` de la hoja principal (la del `<link>`) |
| Escena | `body` o el wrapper raíz que ya existe |
| Superficies y controles | Clases semánticas en la misma hoja |
| Movimiento y fallbacks | `@media` / `@supports` en la misma hoja |

No crees `tokens.css`, `theme.css` ni `components.css`. Usa la hoja que ya se carga en el
`<head>`; si hay varias, la primera.

## Pasos

1. Copia el bloque `:root` de `assets/tokens/<estilo>.css` en la hoja principal. Un solo
   bloque por proyecto; adapta los selectores de tema si ya existen.
2. Aplica la escena una sola vez en `body` o en el wrapper raíz:

   ```css
   body {
     background-color: var(--rs-bg);
     background-image: var(--rs-scene);
     color: var(--rs-ink);
   }
   ```

3. Reutiliza las clases existentes (`btn`, `card`, `nav`) y añade modificadores si hace
   falta (`btn btn--primary`). No renombres clases que el JS consulta.
4. Sigue las recetas del estilo elegido para navbar, card, botón, input, modal y tabla.
5. Cierra con fallback (`@supports`), foco visible y `prefers-reduced-motion`.

## Reglas

- Nada de frameworks CSS, preprocessores ni build nuevos.
- En el HTML solo cambian `class`, `style` visual o un `<link>` de fuente aprobado. No
  añadas wrappers, no reordenes secciones, no cambies etiquetas semánticas.
- No toques `id`, `name`, `type`, `href`, `action`, `data-*` funcionales ni `aria-*`.
- `style=""` existente: pásalo a una clase si el valor visual es equivalente; si no, déjalo.
- `!important` solo para vencer un estilo inline que no puedas mover, y anótalo.
- Si el JS alterna clases (`is-open`, `active`), conserva esos nombres y estilízalos; no
  los sustituyas por estado nuevo.

## Ejemplo de composición

```html
<body>
  <header class="nav">...</header>
  <main class="wrap">
    <article class="card">...</article>
  </main>
</body>
```

El CSS sale de las recetas del estilo; no dupliques aquí los valores. La escena va en
`body`, el material en `.card` y el chrome en `.nav`.

## Checklist

- [ ] Tokens en un único `:root` de una hoja existente.
- [ ] Escena una sola vez, sin capas nuevas sobre el contenido.
- [ ] Clases existentes reutilizadas; ninguna renombrada.
- [ ] Fallback sin `backdrop-filter` y sin transparencia.
- [ ] Contraste AA, foco visible y `prefers-reduced-motion`.
- [ ] 360 / 768 / 1280px sin scroll horizontal.
- [ ] HTML sin cambios fuera de `class`/`style`.

## Errores comunes

| Error | Arreglo |
|---|---|
| Crear una hoja nueva para los tokens | Pegarlos en la hoja principal existente |
| Duplicar `:root` en cada sección | Un solo bloque por proyecto |
| Añadir `<div>` para la escena | Usar `body` o el wrapper raíz |
| Renombrar `.active` o `.is-open` | Conservar los nombres que usa el JS |
| Vidrio sin scrim | `background-image: var(--rs-scrim)` |
| Retro con radios grandes | Radios 0–6px y sombras duras |
| Scanlines encima del texto | Capa decorativa detrás, opacidad ≤ 0.10 |
