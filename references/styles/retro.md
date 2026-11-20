# Retro

**Una frase:** pixel, terminal CRT o synthwave. El estilo no simula la nostalgia; la usa como
material.

## Sub-ramas de retro

El skill soporta tres direcciones. Elegir una en el brief; si el usuario quiere mezclar,
preguntar cuál predomina.

| Dirección | Paleta | Tipografía | Detalle |
|---|---|---|---|
| Arcade pixel | 4 colores + negro | Pixel (Press Start 2P) | Sombras duras, radios 0 |
| CRT terminal | Fósforo (verde/ámbar) | Mono (JetBrains Mono, ui-monospace) | Scanlines, glow |
| Synthwave | Magenta/cian/púrpura | Display pixel + mono | Grid, cielo degradado, glow |

## Cuándo usarlo

- Portafolio, landing, juego, demo, dashboard con alma retro.
- No usar en B2B corporativo ni apps de datos serias salvo que el usuario lo pida
  explícitamente (en cuyo caso el brief debe reflejarlo).

## No usarlo

- Si el producto necesita leer datos densos con claridad: arcade puro puede ser pobre en
  contraste.
- Si ya hay una estética "vintage" distinta que el usuario quiere preservar: no imponer.

## Tokens y estilos

- **Radios**: 0 para arcade; 2–4px para terminal/CRT. Prohibido radius ≥ 8 salvo excepción.
- **Sombras**: duras, offset sólido (nunca blur). Ej.: `box-shadow: 6px 6px 0 #000`.
- **Glow**: `text-shadow: 0 0 10px <color>` para texto y bordes luminosos; `box-shadow: 0 0 18px <color>`.
- **Bordes**: 2–3px sólidos, color de la paleta. Nunca hairline/1px fino.
- **Fondo**: negro sólido o color de paleta; escena opcional (grid synthwave,
  gradiente, scanlines).
- **Scanlines** (CRT): capa fija, `pointer-events: none`, `aria-hidden="true"`,
  `repeating-linear-gradient`, opacidad ~0.08–0.12. No animar.
- **Flicker**: opcional y solo si el brief lo pide; respetar `prefers-reduced-motion`.
- **Tipografía**: una familia pixel para display, una mono para cuerpo/datos. Google Fonts =
  `<link>`; no npm. Fallback: `monospace`.

## Componentes

```css
/* Botón arcade */
.retro-btn {
  font-family: "Press Start 2P", monospace;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #0d0221;
  color: #05ffa1;
  border: 3px solid #05ffa1;
  box-shadow: 4px 4px 0 #000;
}
.retro-btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; }
```

```css
/* Tarjeta CRT */
.retro-panel {
  background: #030a06;
  border: 2px solid #0f3;
  box-shadow: inset 0 0 24px rgb(15 255 102 / 0.12), 0 0 18px rgb(15 255 102 / 0.25);
}
```

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Parece "web 2.0 con pixel font" | Border radius, blur o sombras suaves | Radios 0, sombras duras |
| CRT ilegible | Scanlines mal calibradas / glow sin blur | Opacidad baja, glow con color |
| Paleta ruidosa | 6+ colores o gradientes saturados | Paleta reducida (3–4 colores) |
| Pixel font clipping | Falta fallback / tamaño mínimo | `font-size` ≥ 14px para pixel, fallback |
| Contraste bajo | Fósforo tenue sobre negro | Ajustar luminosidad (p. ej. #7CFFB2) |

## Qué NO hacer

- No mezclar glassmorphism o neumorfismo: retro es plano y duro.
- No usar animaciones complejas: movimiento corto y simétrico.
- No poner más de una fuente display.
- No escalar border-radius para "suavizar": retro no se suaviza.

## Checklist

- [ ] Radios 0 / ≤ 4px según dirección.
- [ ] Sombras duras (offset sólido) o glow.
- [ ] Paleta ≤ 4 colores + fondo.
- [ ] Pixel font con fallback y tamaño mínimo.
- [ ] Contraste AA verificado.
- [ ] `prefers-reduced-motion` y foco visible.
- [ ] Scanlines como capa decorativa fija (`aria-hidden`, `pointer-events: none`).
