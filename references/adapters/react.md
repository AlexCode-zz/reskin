# Adaptador: React

Traduce el estilo elegido al proyecto React. No repite las recetas del estilo: las aplica
con el sistema de estilos que ya existe.

## Detección

- `framework: react`
- `styling: tailwind-v4 | tailwind-v3 | css-modules | css-puro`

Si el proyecto es Next.js, usa `nextjs.md` en lugar de este archivo (cubre React).

## Rama A — Tailwind (v4 o v3)

1. Lleva los tokens de `assets/tokens/<estilo>.css` al theme:
   - **v4:** `@theme` en el CSS global existente.
   - **v3:** `theme.extend` en `tailwind.config.*`.
2. Aplica el estilo con **clases utilitarias**.
3. **No crees archivos CSS nuevos** ni CSS de componentes.
4. Si un token no está mapeado, usa el valor arbitrario:
   `bg-[var(--rs-glass)]`, `rounded-[var(--rs-radius-md)]`,
   `[backdrop-filter:var(--rs-glass-filter)]`.
5. No borres clases funcionales (`sr-only`, `hidden`, `dark:`, `motion-reduce:`, `group`,
   `peer`).

Detalle: `tailwind-v4.md` / `tailwind-v3.md`.

## Rama B — CSS Modules o CSS puro

1. Pega los tokens en `:root` del CSS global existente.
2. Edita el `.module.css` del componente o la hoja existente con los tokens.
3. No renombres clases exportadas: el JS las referencia.
4. No crees un segundo sistema (nada de styled-components si no existe).
5. Si no hay CSS global, usa `:global(:root)` en el módulo del layout, no una hoja nueva.

## Protocolo de edición

1. Lee el componente completo y localiza estado, props, handlers, condiciones y `key`.
2. Cambia **solo** `className`, `class` o `style` con propiedades visuales.
3. Conserva condiciones, props, textos, `key`, `aria-*` y orden de elementos.
4. En clases condicionales, añade clases dentro de cada rama; nunca inviertas la condición.
5. Si el componente recibe `className` desde fuera, **añade** al final.

```jsx
// Antes
<button
  className={active ? "nav-item nav-item--active" : "nav-item"}
  onClick={onSelect}
>
  {label}
</button>

// Después (misma condición, mismos props)
<button
  className={
    active
      ? "nav-item border-b-2 border-[var(--rs-accent)] text-[var(--rs-ink)]"
      : "nav-item border-b-2 border-transparent text-[var(--rs-ink-muted)]"
  }
  onClick={onSelect}
>
  {label}
</button>
```

Con CSS Modules:

```jsx
<button
  className={`${styles.navItem} ${active ? styles.active : ""}`}
  onClick={onSelect}
>
```

Solo cambia la composición de clases; `onSelect`, `active` y `label` no se tocan.

## Componentes compartidos y librerías

- Si ya existe `Card`, `Panel`, `Button`, estilízalo **una vez** y reutilízalo. No dupliques
  la receta en 10 archivos.
- **shadcn/ui:** edita los strings de `cva`; conserva nombres de variantes, defaults y
  `asChild`. No cambies la API.
- **MUI / Chakra / Mantine:** usa `sx`, theme o clases del componente. No reemplaces el
  componente por un `div`.
- Si la librería no permite estilizar sin añadir props nuevas: **para y pregunta**.

## Checklist

- [ ] Solo strings de `className` / `class` y CSS/tokens modificados.
- [ ] Sin cambios en estado, hooks, props, tipos, handlers, textos ni `key`.
- [ ] Clases condicionales conservan la condición original.
- [ ] No se añadieron props nuevas a componentes.
- [ ] `transition-all` no introducido.
- [ ] Foco visible y `motion-reduce` respetados.

## Errores comunes

| Error | Arreglo |
|---|---|
| Reescribir el componente entero | Editar solo la cadena de clases |
| Añadir `useState` para hover/menú | Usar CSS (`:hover`, `:focus-within`) |
| Añadir `className` a un componente que no lo acepta | Usar el tema de la librería o editar sus clases internas |
| Duplicar la receta en cada tarjeta | Estilizar el componente compartido |
| Crear una hoja CSS nueva con Tailwind | Tokens al `@theme` / config y utilidades |
| Cambiar textos para que quepan | Ajustar tipografía/espaciado o preguntar |
