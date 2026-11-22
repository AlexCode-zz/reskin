# Profundidad de diseño (la puerta anti-genérico)

**Por qué existe:** un reskin que solo cambia colores se ve "plantilla". El estilo no está en la
paleta: está en cómo se ve la **forma**, la **luz**, la **textura**, la **tipografía** y el
**movimiento**. Esta guía es el filtro que se pasa antes de decir "terminado".

## Los 7 ingredientes (cada estilo debe cambiar al menos 6)

| # | Ingrediente | Pregunta de control | Dónde se define |
|---|---|---|---|
| 1 | **Tipografía** | ¿Cambió la familia del display y del cuerpo, no solo el color? | `--rs-font-*` + `<link>` de fuentes |
| 2 | **Forma** | ¿Cambiaron radios y bordes de forma reconocible (0 duro, píldora, blob, bisel)? | `--rs-radius*`, `--rs-border-width` |
| 3 | **Profundidad** | ¿Hay un sistema de sombra propio (offset duro, inflado, vidrio, hundido, capas)? | `--rs-shadow*` |
| 4 | **Escena** | ¿El fondo dejó de ser plano (grid, aurora, papel, escritorio, estrellas)? | `--rs-scene` + `body::before/::after` |
| 5 | **Textura / material** | ¿El material se siente (grano, bisel, scanlines, puntos, gloss)? | componentes del estilo |
| 6 | **Movimiento** | ¿Hay al menos un efecto de entrada y uno de interacción con identidad del estilo? | `reskin-fx` (ver `effects.md`) |
| 7 | **Pieza firma + imagen** | ¿Hay una pieza que solo existe en este estilo (ticker, ventana, polaroid, blob) y, en nivel C, una imagen tratada? | `.rs-*` del estilo + `images.md` |

**Regla de los 6:** si el diff cambia menos de 6 de los 7, no está terminado. Nivel A (solo piel)
cambia 1–5 y se declara así en el brief.

## Anti-patrones que delatan un reskin genérico

- Mismo layout, mismas sombras suaves y solo otro color de acento.
- Fuente del sistema en todo (Inter/Arial) sin intención.
- Todas las tarjetas idénticas: sin jerarquía (una tarjeta "héroe" más grande/oscura/colorida).
- Fondo plano de un solo color.
- Sin estados: hover, active y foco sin carácter propio del estilo.
- Retro = "fondo oscuro + fuente mono". Retro necesita escena (grid, sol, scanlines, píxeles) y sombras duras.
- Glass sin nada detrás: el vidrio necesita luz y color que desenfocar.
- Efectos pegados sin criterio (partículas + tilt + parallax + marquee a la vez). **Máximo 3 efectos por estilo.**

## Jerarquía: no todo grita

1. Un **titular display** por pantalla (`.rs-display`) — es donde vive la personalidad.
2. Superficies con tres pesos: base (`.rs-card`), fuerte (`.rs-card--strong`) y tintada/invertida (variantes del estilo) para lo importante.
3. Un solo botón primario por vista; el resto `--secondary` o `--ghost`.
4. Espaciado en escala: 8 · 16 · 24 · 32 · 48 · 72. Nada de valores sueltos.
5. Una sola pareja tipográfica por estilo.

## Cómo medirlo en el resumen final

Incluye una tabla de 7 filas (ingrediente → qué se hizo). Si una fila queda vacía, explica por qué
(p. ej. "Minimalismo: sin partículas por diseño").
