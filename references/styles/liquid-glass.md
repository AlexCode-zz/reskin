# Liquid Glass

**Una frase:** cristal líquido. Igual que glassmorphism, pero con más cuerpo: blur fuerte,
translucencia densa y una luz especular que hace que la superficie "tremble" al moverse.

No es una segunda librería ni un segundo sistema. Es un **preset de intensidad** dentro del
mismo skill, sobre los mismos tokens `--rs-*`.

## Cuándo usarlo

- Chrome flotante de alto gama: barra de navegación flotante, tab bar, dock, menús de
  contexto, controladores de media, widgets.
- Producto consumer premium (sutil, no kitsch): apps de audio, productividad, creadores.
- Superficies que se mueven con scroll o tilt.

## Cuándo NO usarlo

- Tablas, datos densos o pantallas 100% operativas: el blur compite con la lectura.
- Dispositivos con rendimiento comprometido: blur fuerte en varios elementos cuesta.
- Preferencia del usuario por `prefers-reduced-transparency` (si existe): usar vidrio opaco.
- Si el brief pidió "menos glass": escalar a glassmorphism.

## Relación con glassmorphism

| | Glassmorphism | Liquid Glass |
|---|---:|---:|
| Blur | 12–26px | 40–60px |
| Alpha oscuro | 0.05–0.11 | 0.35–0.55 |
| Satinado | suave | fuerte (saturate 150–200%) |
| Especular | borde sutil | highlight superior pronunciado |
| Ideal para | superficies medianas | chrome flotante premium |

Regla: si el brief elige "liquid", se aplican los overrides de intensidad; si pide "más
fresco / sutil", se usa glassmorphism. No se mezclan los dos en el mismo layout salvo que
cada uno tenga su rol.

## Overrides de intensidad (mismo archivo de tokens)

```css
:root {
  --rs-glass-blur: 48px;
  --rs-glass-saturate: 190%;
  --rs-surface-alpha: 0.42;
  --rs-surface-alpha-strong: 0.5;
}
```

Tema claro: blur 40px, saturate 150%, alpha 0.72–0.85, `--rs-scrim` más denso
(rgb(255 255 255 / 0.62) → /0.34).

## Especular (highlight superior)

Dentro de la capa de vidrio, añade una luz superior; no uses borde exterior:

```css
.glass-liquid {
  position: relative;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.45),
    inset 0 -1px 0 rgb(255 255 255 / 0.10),
    var(--rs-shadow-1);
}
```

El inner shadow superior sostiene la luz; el inferior lo suaviza. No uses `border: 1px` para
el brillo: el brillo es sombra interna.

## Recetas

### Chrome flotante (nav / tab bar)

```css
.glass-liquid--chrome {
  border: 0;
  border-radius: var(--rs-radius-pill);
  background-color: var(--rs-glass);
  background-image: var(--rs-scrim);
  -webkit-backdrop-filter: var(--rs-glass-filter);
  backdrop-filter: var(--rs-glass-filter);
}
```

Pill (radio máxima) cuando flota sobre contenido; recto (`--rs-radius-sm/md`) cuando es barra
de página.

### Tarjeta con movimiento (hover)

```css
.glass-liquid {
  transition: background-color var(--rs-dur-fast) var(--rs-ease),
    box-shadow var(--rs-dur-fast) var(--rs-ease),
    border-color var(--rs-dur-fast) var(--rs-ease);
}
.glass-liquid:hover {
  background-color: var(--rs-glass-strong);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.55),
    inset 0 -1px 0 rgb(255 255 255 / 0.12),
    var(--rs-shadow-2);
}
```

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| Se ve "vidrio doble" | Dos superposiciones con alpha bajo | Un solo material, overrides limpios |
| Falta brillo | No hay inner shadow | `inset 0 1px 0 ...` |
| Se ve plano | Blur no sobresale / sat bajo | Overrides de intensidad |
| Muy lento | Blur + backdrop en muchas capas | ≤ 3–4 superficies, controles sin blur |
| Texto ilegible sobre scroll | Scrim insuficiente | Subir `--rs-surface-alpha` / scrim |
| Muy oscuro el contenido detrás | Alpha bajo | Subir alpha, no quitar blur |

## Qué NO hacer

- No mezclar `glassmorphism` y `liquid` en el mismo componente sin decisión.
- No animar `backdrop-filter` ni `filter`; anima color, sombra, alpha.
- No usar `border` + especular a la vez para el mismo borde.
- No aplicar a inputs ni botones pequeños (el blur no aporta, el brillo sí se pierde).
- No crear variables nuevas paralelas: sobrescribe los `--rs-*` del preset.

## Checklist

- [ ] Blur ≥ 40px y saturate ≥ 150% (oscuro) / 150% (claro).
- [ ] Highlight superior (inner shadow) presente.
- [ ] Fallback sin backdrop-filter.
- [ ] Scrim ajustado para el peor contraste.
- [ ] Solo ≤ 3–4 superficies con blur.
- [ ] Contraste AA y `prefers-reduced-motion`.
- [ ] No se creó un segundo sistema de tokens.
