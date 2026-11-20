# Adaptador: HTML/CSS puro

Para proyectos sin framework (vanilla: `index.html`, `styles.css`, `script.js`).

## Detección

- Sin `package.json` con framework, o con ninguno de los detectores del skill → HTML/CSS puro.

## Aplicación del estilo

1. **Tokens**: enlazar `assets/tokens/<estilo>.css` desde el `<head>` o copiar el bloque
   `:root`. No duplicar por componente.
2. **Escena**: en `body` o en un wrapper fijo:
   ```css
   body {
     background-color: var(--rs-bg);
     background-image: var(--rs-scene);
     color: var(--rs-ink);
   }
   ```
3. **Vidrio** (glassmorphism / liquid): clases `.glass-panel`, `.glass-chrome` según el
   estilo elegido, con tokens.
4. **Retro**: clases `.retro-btn`, `.retro-panel`, `.retro-label` con las recetas del
   estilo.
5. **Movimiento**: keyframes cortos en el CSS existente o `@media (prefers-reduced-motion)`.

## No añadir

- No framework CSS nuevo (no Bootstrap/Tailwind nuevo, no preprocessores nuevos).
- No build step: nada que no exista. Si el proyecto ya tiene un build, respetarlo.

## Checklist

- [ ] Solo CSS existente extendido/override, o el token file enlazado.
- [ ] Fallback sin backdrop-filter.
- [ ] Responsive básico (el estilo define su mínimo).
- [ ] Contraste AA y foco visible.

## Errores comunes

| Error | Arreglo |
|---|---|
| Copiar tokens con `:root` duplicado | Un solo bloque por proyecto |
| Vidrio sin scrim | `background-image` con scrim |
| Retro con radius | Radios 0 |
| Scanlines sin `aria-hidden` | Decorativa, fija, sin pointer-events |
