---
name: reskin
description: >-
  Rediseña por completo un frontend existente con un estilo visual: glassmorphism, liquid-glass,
  brutalismo moderno, minimalismo, claymorfismo, neumorfismo, UI espacial, doodle, aurora UI y
  cómic. No solo cambia colores: añade tipografía, forma, profundidad, escena de fondo y
  funciones nuevas de diseño en frontend (efectos de scroll, partículas, parallax, tilt, botones
  imantados, piezas firma como tickers, ráfagas y globos) e imágenes con animación enlazadas
  directamente desde Google Imágenes (sin descargarlas). Siempre pregunta en la entrevista el
  estilo, el tono, la paleta, qué funciones nuevas de diseño agregar y el alcance. Guarda lo que
  instala en <src>/reskin/. Detecta el framework (React, Next.js, HTML/CSS) y la capa de estilos
  (Tailwind v4/v3, CSS Modules, CSS puro), pide confirmación y aplica. Úsala cuando el usuario
  pida "reskin", rediseñar, modernizar o dar un look nuevo a un proyecto frontend que ya
  funciona. No toca la lógica de negocio (datos, estado, API, rutas). No para greenfield, bugs
  ni funcionalidad de producto nueva.
---

# reskin

Rediseña un frontend existente. **Nunca toca la lógica de negocio** (datos, estado, handlers existentes,
API, rutas). Sí puede cambiar el diseño por completo y **añadir funciones nuevas de frontend**
(efectos, partículas, imágenes, piezas decorativas) cuando el usuario las aprueba en la entrevista.

**Un reskin que solo cambia colores es un reskin fallido.** El estilo vive en la tipografía, la
forma, la profundidad, la escena de fondo, la textura y el movimiento. Por eso el skill trabaja
por **niveles** (A piel · B escena + efectos · C completo con imágenes) y pasa una **puerta
anti-genérico** (`references/design-depth.md`) antes de dar algo por terminado.

En **B y C es obligatorio añadir al menos un momento firma nuevo** (ticker, stickers, capa 3D,
botón imantado, imagen animada…), no solo reestilizar lo que ya existe. Catálogo y reglas en
`references/effects.md § Momentos firma`.

Todo lo que el skill instala vive **dentro del proyecto**, en `<src>/reskin/`; nunca en la carpeta
de la skill ni en la raíz del repo. Ver `references/effects.md § Destino de los archivos`.

## Cuándo se usa

- El usuario ya tiene un frontend y quiere una identidad visual nueva.
- Quiere probar un estilo sin refactorizar. El brief viene de un diseñador, cliente, pitch o gusto personal.

## Cuándo NO se usa

- Proyecto nuevo desde cero · bugs de comportamiento, crashes o rendimiento funcional.
- Migración de librería, framework o arquitectura · funcionalidad de producto nueva (datos, API, auth).

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
   - **5 preguntas:** estilo (10 disponibles), tono, **paleta de colores** (obligatoria, nunca la
     omitas), **funciones nuevas de diseño** (selección múltiple: efectos de scroll, partículas,
     imágenes, piezas firma; fija el nivel A/B/C) y alcance.
   - Un campo por pregunta; la recomendada primero con "(Recomendado)". No agregues "Otro" manual.
   - No preguntes lo ya detectado ni lo que el usuario ya dijo en el prompt.
3. **Resumen + confirmación.** Brief con stack, estilo, tono, **paleta**, funciones nuevas, nivel, efectos (máx. 3),
   momento firma, fuentes, imágenes (sí/no), destino y qué no se toca. Confirma con la misma herramienta:
   `Aplicar` / `Cambiar algo`. **No edites código hasta un "Aplicar" o un "sí" explícito.**
4. **Aplicar** (`rules.md` + `design-depth.md` + estilo + adapter + `effects.md` + `images.md` según nivel).
   - **Destino primero:** crea `<src>/reskin/` en el proyecto y copia ahí `reskin-fx.css`, `reskin-fx.js`
     y `RESKIN-IMAGES.md`. Única excepción: en Next App Router el script va a `public/reskin/`
     porque se sirve por URL. Nunca escribas dentro de la carpeta de la skill (`assets/`) ni en la raíz
     del repo. Ver `effects.md § Destino`.
   - Orden: tokens y paleta → escena y tipografía → superficies → controles → estados → piezas firma →
     efectos y momentos → imágenes con animación (nivel C) → gráficos y widgets de terceros → responsive.
   - **Biblioteca de componentes:** `assets/components/<estilo>.css` (+ `_base.css` en los 8 estilos nuevos).
     Los nombres de clase (`.rs-card`, `.rs-btn`, `.rs-table`…) son iguales en todos. Copia solo lo que
     el proyecto usa y asigna las clases a los elementos que ya existen. Con Tailwind, tradúcelos a
     utilidades; con CSS Modules, `:global(.rs-*)`.
   - **Tema:** Oscuro → solo el bloque base (o `data-theme="dark"`); Claro → valores claros como base;
     "Según la app" → ambos. Estilos de un solo tono se anotan en el resumen.
   - **Efectos y momentos** (nivel B/C): copia `assets/effects/reskin-fx.{css,js}` y activa con atributos
     `data-rs-*`. Máximo 3 efectos ambientales por estilo + 2 momentos firma por página (recetas en
     `effects.md`). Ken Burns, reveal, zoom y sheen vienen incluidos en `reskin-fx.css`.
   - **Paleta:** aplica la opción aprobada en el brief y vuelve a verificar AA con
     `node scripts/check-contrast.js` sobre los tokens editados.
   - **Imágenes** (nivel C): protocolo de `images.md`: se busca en Google Imágenes, se toma la **URL directa
     de la imagen original** (no la miniatura), se verifica si hay terminal y se enlaza con `data-rs-img`
     y respaldo. **No se descarga nada.** Registro en `<src>/reskin/RESKIN-IMAGES.md` y aviso final.
   - **Referencias del estilo:** antes de diseñar, consulta su ficha en `references/style-playbook.md`
     (referencia visual, qué buscar, héroe, pieza firma, tipografía).
5. **Verificar.** Build/lint/typecheck si existen; `node scripts/check-contrast.js` (todos los tokens,
   incluida la paleta nueva, pasan AA); foco;
   reduced motion y JS de efectos desactivado; 360/768/1280; tooltips y ejes de gráficos restilizados;
   diff sin cambios en la lógica de negocio; que todo lo añadido esté en `<src>/reskin/` y no en la raíz. Pasa la **regla de los 6**
   de `design-depth.md`.
6. **Entregar.** Resumen: archivos tocados, decisiones, **paleta aplicada**, tabla de los 7 ingredientes,
   checks y riesgos.
   **Si hubo imágenes, termina con el aviso obligatorio de `images.md`**: son enlaces provisionales de internet;
   indica que son enlaces (pueden dejar de cargar), la lista (`RESKIN-IMAGES.md`) y los pasos para cambiarlas
   por las propias del usuario.

## Niveles

| Nivel | Qué se permite además de clases/CSS/tokens |
|---|---|
| **A · Piel** | Nada más. |
| **B · Escena** (recomendado en apps) | Escena (`body::before/::after`), fuentes por `<link>`/`next/font`, `reskin-fx`, `data-rs-*`, partículas, reveal, parallax, tilt, botones imantados, animación de imágenes existentes (Ken Burns, zoom). |
| **C · Completo** (landings) | B + piezas decorativas nuevas (`aria-hidden`), funciones nuevas de diseño, momentos firma e imágenes por enlace (también animadas), provisionales. |

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
| Destino, partículas, scroll, parallax, tilt, imán y momentos firma | `references/effects.md` + `assets/effects/reskin-fx.{js,css}` |
| Imágenes (enlace de Google, respaldo, animación y aviso final) | `references/images.md` + `assets/placeholders/*.svg` |
| Referencias y recetas por estilo (qué buscar, héroe, firma) | `references/style-playbook.md` |
| Gráficos, tooltips, selects o librerías de UI de terceros | `references/charts-and-widgets.md` |
| Framework | `references/adapters/{react,nextjs,html-css}.md` |
| Capa Tailwind | `references/adapters/tailwind-v4.md` o `tailwind-v3.md` |

Combinaciones: Next + Tailwind → `nextjs` + `tailwind-*`; React + Tailwind → `react` + `tailwind-*`;
HTML/CSS puro → `html-css`. No cargues el adaptador de otro framework ni estilos que no se eligieron.

## Estilos disponibles

| Estilo | Una frase | Temas |
|---|---|---|
| **Glassmorphism** | Vidrio suave sobre escena con luz | oscuro · claro |
| **Liquid Glass** | Blur alto, borde especular, reflejo | oscuro · claro |
| **Brutalism** | Tipografía gigante, bloques planos, sombras duras (mono/pop) | claro · oscuro |
| **Minimalism** | Aire, serif elegante, un acento | claro · oscuro |
| **Claymorphism** | Plastilina: volumen inflado y pasteles | claro |
| **Neumorphism** | Relieve suave en la misma superficie | claro · oscuro |
| **Spatial** | Paneles de vidrio flotando con profundidad 3D | oscuro · claro |
| **Doodle** | Hecho a mano: tinta, papel, cinta | claro |
| **Aurora** | Gradientes borrosos tipo aurora, estilo Stripe | claro · oscuro |
| **Comic** | Historieta pop: tinta gruesa, trama de puntos, globos y ráfagas ¡POW! | claro · oscuro |

Cada estilo define ingredientes, pieza firma, errores comunes, WCAG AA y reduced motion.

## Límites duros

- **Nunca (lógica de negocio):** estado, hooks, handlers, props, rutas, fetching, validaciones, textos existentes,
  `key`, `aria-*`, tests, dependencias npm ni lockfiles. Si el estilo exige cambiarlos, o mover/quitar
  contenido existente: **para y pregunta**.
- **Sí (con aprobación en el brief):** funciones nuevas de diseño en frontend (`rules.md §1b`): solo presentación,
  aditivas, aisladas en `<src>/reskin/`, accesibles y sin dependencias nuevas.
- Sin paquetes de animación o de partículas: `reskin-fx` (0 dependencias) o lo que el proyecto ya tenga.
- Fuentes solo por `<link>`/`next/font`, aprobadas en el brief; siempre con fallback.
- Imágenes solo si el usuario las aprobó (nivel C, o huecos de imagen existentes en B): **por enlace, sin descargar**, con respaldo, registradas y avisadas. Sin personas identificables ni marcas ajenas.
- Nada nuevo en la raíz del repo ni en la carpeta de la skill: todo vive en `<src>/reskin/`.
- La paleta se pregunta siempre en la entrevista y se verifica en AA; si falla, se ajusta la luminosidad.
- La entrevista va por la herramienta nativa de preguntas; las opciones numeradas son plan B.
- Si no hay confirmación del brief, no hay código.
