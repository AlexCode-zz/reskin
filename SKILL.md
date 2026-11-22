---
name: reskin
description: >-
  Aplica un estilo visual completo a un frontend existente sin cambiar su lógica:
  glassmorphism, liquid-glass, retro (arcade/CRT/synthwave), brutalismo moderno,
  minimalismo, claymorfismo, neumorfismo, UI espacial, doodle, Y2K y aurora UI.
  No solo cambia colores: añade tipografía, forma, profundidad, escena de fondo,
  efectos (partículas, scroll reveal, parallax, tilt) e imágenes provisionales.
  Detecta el framework (React, Next.js, HTML/CSS) y la capa de estilos (Tailwind
  v4/v3, CSS Modules, CSS puro), entrevista con un brief corto, pide confirmación y
  aplica. Úsala cuando el usuario pida "reskin", rediseñar, modernizar o dar un look
  nuevo a un proyecto frontend que ya funciona. No para greenfield, bugs de
  comportamiento, migraciones de librería ni features nuevas.
---

# reskin

Cambia la piel visual de un frontend existente. Nunca toca estados, funciones, props ni
lógica. El producto cambia de cara; su comportamiento queda intacto.

**Un reskin que solo cambia colores es un reskin fallido.** El estilo vive en la tipografía, la
forma, la profundidad, la escena de fondo, la textura y el movimiento. Por eso el skill trabaja
por **niveles** (A piel · B escena + efectos · C completo con imágenes) y pasa una **puerta
anti-genérico** (`references/design-depth.md`) antes de dar algo por terminado.

## Cuándo se usa

- El usuario ya tiene un frontend y quiere una identidad visual nueva.
- Quiere probar un estilo sin refactorizar. El brief viene de un diseñador, cliente, pitch o gusto personal.

## Cuándo NO se usa

- Proyecto nuevo desde cero · bugs de comportamiento, crashes o rendimiento funcional.
- Migración de librería, framework o arquitectura · features nuevos mezclados con el rediseño.

## Dos ejes, no uno

**Tailwind no es un framework: es una capa de estilos.**

- **Framework:** `react` | `nextjs` | `html-puro`
- **Capa de estilos:** `tailwind-v4` | `tailwind-v3` | `css-modules` | `css-puro`

## Flujo

1. **Detectar** (`references/detection.md`; `scripts/detect-stack.sh` si está).
   Si no puedes determinar framework o capa de estilos: pregunta una vez. **No adivines.**
2. **Entrevistar** (`references/interview.md`).
   - **Siempre primero la herramienta nativa de preguntas:** `question` (OpenCode) o
     `AskUserQuestion` (Claude Code). Entrevista en vivo, no números en el chat.
   - **4 preguntas:** estilo (11 disponibles), tono, **intensidad** (A/B/C) y alcance.
     La intensidad aprueba también fuentes, efectos e imágenes.
   - Un campo por pregunta; la recomendada primero con "(Recomendado)". No agregues "Otro" manual.
   - No preguntes lo ya detectado ni lo que el usuario ya dijo en el prompt.
3. **Resumen + confirmación.** Brief con stack, estilo, tono, nivel, efectos (máx. 3), fuentes,
   imágenes (sí/no), alcance y qué no se toca. Confirma con la misma herramienta:
   `Aplicar` / `Cambiar algo`. **No edites código hasta un "Aplicar" o un "sí" explícito.**
4. **Aplicar** (`rules.md` + `design-depth.md` + estilo + adapter + `effects.md` + `images.md` según nivel).
   - Orden: tokens → escena y tipografía → superficies → controles → estados → piezas firma →
     efectos → imágenes (nivel C) → gráficos y widgets de terceros → responsive.
   - **Biblioteca de componentes:** `assets/components/<estilo>.css` (+ `_base.css` en los 8 estilos nuevos).
     Los nombres de clase (`.rs-card`, `.rs-btn`, `.rs-table`…) son iguales en todos. Copia solo lo que
     el proyecto usa y asigna las clases a los elementos que ya existen. Con Tailwind, tradúcelos a
     utilidades; con CSS Modules, `:global(.rs-*)`.
   - **Tema:** Oscuro → solo el bloque base (o `data-theme="dark"`); Claro → valores claros como base;
     "Según la app" → ambos. Estilos de un solo tono se anotan en el resumen.
   - **Efectos** (nivel B/C): copia `assets/effects/reskin-fx.{css,js}` y activa con atributos `data-rs-*`.
     Máximo 3 por estilo (receta en `effects.md`).
   - **Imágenes** (nivel C): protocolo de `images.md` (provisionales, registradas en `RESKIN-IMAGES.md`).
5. **Verificar.** Build/lint/typecheck si existen; `node scripts/check-contrast.js` (todos los tokens
   pasan AA); `assets/preview.html?style=<id>` como referencia visual; foco; reduced motion y JS de
   efectos desactivado; 360/768/1280; tooltips y ejes de gráficos restilizados; diff sin lógica.
   Pasa la **regla de los 6** de `design-depth.md`.
6. **Entregar.** Resumen: archivos tocados, decisiones, tabla de los 7 ingredientes, checks y riesgos.
   **Si hubo imágenes, termina con el aviso obligatorio de `images.md`** (son provisionales, de
   internet, el usuario debe cambiarlas por propias; lista en `RESKIN-IMAGES.md`).

## Niveles

| Nivel | Qué se permite además de clases/CSS/tokens |
|---|---|
| **A · Piel** | Nada más. |
| **B · Escena** (recomendado en apps) | Escena (`body::before/::after`), fuentes por `<link>`/`next/font`, `reskin-fx`, `data-rs-*`, partículas, reveal, parallax, tilt. |
| **C · Completo** (landings) | B + piezas decorativas nuevas (`aria-hidden`) e imágenes provisionales. |

## Regla de capas (no negociable)

**Si hay Tailwind:** estilo con utilidades; tokens al theme (v4 `@theme`, v3 `theme.extend`); sin
CSS de componentes aparte. Excepciones: `reskin-fx.css/js` (efectos) y las capas de escena.

**Si no hay Tailwind:** CSS normal con las variables de `assets/tokens/<estilo>.css`; tokens en `:root`
del CSS existente; clases semánticas en el CSS global o module. No introduzcas un framework CSS nuevo.

## Cargar solo lo necesario

| Necesitas | Archivo |
|---|---|
| Detectar framework y capa de estilos | `references/detection.md` |
| Preguntas, brief y confirmación | `references/interview.md` |
| Reglas antes de editar código (niveles, límites, a11y) | `references/rules.md` |
| Qué hace que no se vea genérico (puerta de calidad) | `references/design-depth.md` |
| Estilo elegido | `references/styles/<estilo>.md` + `assets/tokens/<estilo>.css` + `assets/components/<estilo>.css` (+ `_base.css` en los nuevos) |
| Partículas, scroll, parallax, tilt | `references/effects.md` + `assets/effects/reskin-fx.{js,css}` |
| Imágenes provisionales y aviso final | `references/images.md` + `assets/placeholders/*.svg` |
| Gráficos, tooltips, selects o librerías de UI de terceros | `references/charts-and-widgets.md` |
| Framework | `references/adapters/{react,nextjs,html-css}.md` |
| Capa Tailwind | `references/adapters/tailwind-v4.md` o `tailwind-v3.md` |
| Ver los estilos renderizados | `assets/preview.html?style=<id>` |

Combinaciones: Next + Tailwind → `nextjs` + `tailwind-*`; React + Tailwind → `react` + `tailwind-*`;
HTML/CSS puro → `html-css`. No cargues el adaptador de otro framework ni estilos que no se eligieron.

## Estilos disponibles

| Estilo | Una frase | Temas |
|---|---|---|
| **Glassmorphism** | Vidrio suave sobre escena con luz | oscuro · claro |
| **Liquid Glass** | Blur alto, borde especular, reflejo | oscuro · claro |
| **Retro** | Arcade, CRT o synthwave con escena propia | oscuro |
| **Brutalism** | Tipografía gigante, bloques planos, sombras duras (mono/pop) | claro · oscuro |
| **Minimalism** | Aire, serif elegante, un acento | claro · oscuro |
| **Claymorphism** | Plastilina: volumen inflado y pasteles | claro |
| **Neumorphism** | Relieve suave en la misma superficie | claro · oscuro |
| **Spatial** | Paneles de vidrio flotando con profundidad 3D | oscuro · claro |
| **Doodle** | Hecho a mano: tinta, papel, cinta | claro |
| **Y2K** | Escritorio pastel con ventanas biseladas | claro |
| **Aurora** | Gradientes borrosos tipo aurora, estilo Stripe | claro · oscuro |

Cada estilo define ingredientes, pieza firma, errores comunes, WCAG AA y reduced motion.

## Límites duros

- **Nunca:** estado, hooks, handlers, props, rutas, fetching, textos existentes, `key`, `aria-*`, tests,
  dependencias npm ni lockfiles. Si el estilo exige lógica, props o reestructurar el DOM: **para y pregunta**.
- Sin paquetes de animación o de partículas: `reskin-fx` (0 dependencias) o lo que el proyecto ya tenga.
- Fuentes solo por `<link>`/`next/font`, aprobadas en el brief; siempre con fallback.
- Imágenes solo en nivel C, registradas y avisadas. Sin personas identificables ni marcas ajenas.
- La entrevista va por la herramienta nativa de preguntas; las opciones numeradas son plan B.
- Si no hay confirmación del brief, no hay código.
