# Entrevista al brief

Secuencia: detectar → anunciar stack → preguntar con la herramienta → resumir →
confirmar → aplicar.

## Antes de preguntar

La detección ya respondió framework, capa de estilos, router y TypeScript. Preséntalo en
una línea y no lo vuelvas a preguntar:

> Detecté **Next.js (App Router) + Tailwind v4 + TypeScript**. No cambiaré lógica, textos
> ni rutas.

Si falta un dato, pregunta solo ese dato, una vez.

## Regla de oro: herramienta nativa primero

La entrevista es **en vivo, con flechas/selección**, no escribiendo números en el chat.

| Agente | Herramienta |
|---|---|
| OpenCode | `question` |
| Claude Code | `AskUserQuestion` |
| Otro con selector interactivo | la equivalente nativa del agente |

- **Llámala siempre primero**, antes de escribir cualquier opción en el chat.
- Sin excepción por comodidad, prisa o porque sean varias preguntas.
- Si no reconoces el nombre, localiza la herramienta de preguntas/opciones del agente y
  úsala.
- Si el usuario ya dijo el estilo en el prompt, no lo preguntes: úsalo y pasa a las demás.
- El chat numerado es **plan B** (ver abajo), nunca el camino normal.

## Formato de cada pregunta

Un campo por pregunta:

- **Texto** (`question`): la pregunta, en una línea.
- **Header** (`header`): máximo 30 caracteres: `Estilo`, `Tono`, `Funciones`, `Alcance`.
- **Opciones** (`options`): 2–3 reales, cada una con `label` (2–4 palabras) y `description`
  (una razón corta ligada al proyecto detectado).
- La recomendada va **primero**, con "(Recomendado)" en el label y la razón en `description`.
- **No agregues una opción "Otro" manual**: la herramienta ya permite respuesta
  personalizada. Agrégala como última opción **solo** si esa variante no la trae.

## Llamadas

- Si la herramienta admite varias preguntas: **una sola llamada** con las 5.
- Si exige una por llamada: 5 llamadas seguidas, sin pedir permiso entre ellas.
- **La pregunta 4 es de selección múltiple**: `multiple: true` en `question` (OpenCode) o `multiSelect: true` en `AskUserQuestion` (Claude Code). Máximo 4 opciones; la respuesta libre sirve para "ninguna" u otra función.
- Nunca cambies a plan B porque haya que hacer varias llamadas.

## Las 5 preguntas

| # | Tema | Pregunta | Opciones | Recomendación |
|---|---|---|---|---|
| 1 | Estilo | ¿Qué estilo visual aplicamos? | Las 4 mejores para el proyecto (ver abajo); el usuario puede escribir **cualquiera de los 10** en la respuesta libre | Ver la guía de recomendación |
| 2 | Tono | ¿Tono claro u oscuro? | Claro / Oscuro / Según la app | Datos, herramientas, terminal o uso nocturno → Oscuro. Contenido, docs, marketing o comercio → Claro. Si ya existe toggle de tema → Según la app. Estilos de un solo tono (claymorphism, doodle) no preguntan: se anotan en el resumen. |
| 3 | **Paleta** | **¿Qué paleta de colores usamos?** | Conservar la actual / Paleta del estilo / Neutra + un acento | **Conservar** si el proyecto ya tiene marca o variables propias; **Paleta del estilo** si los colores son de plantilla (azul índigo, slate por defecto); **Neutra + un acento** si el usuario no tiene marca y quiere algo sobrio. En la respuesta libre puede pegar hex o el nombre de su marca. **Nunca se omite.** |
| 4 | **Funciones nuevas de diseño** | **¿Qué funciones nuevas de diseño agregamos?** (selección múltiple) | **Efectos de scroll y movimiento** (reveal, parallax, tilt, botón imantado) / **Partículas y fondo animado** / **Imágenes con animación** (enlaces de Google, sin descargar) / **Piezas firma nuevas** (ticker, stickers, capa 3D, ráfagas, globos) | Apps y dashboards → recomienda *Efectos* y *Partículas*. Landings, portafolios y marcas → recomienda las cuatro. Proyecto frágil o el usuario pide solo "cambiar la piel" → ninguna. Si no elige nada (o escribe "ninguna"), es **nivel A**. Aquí se aprueban fuentes, efectos, momentos firma e imágenes. **Nunca se omite.** |
| 5 | Alcance | ¿Hasta dónde llega el reskin? | Toda la app / Solo los componentes principales / Una página o ruta específica | Toda la app: un reskin a medias se ve incoherente. |

**Los 10 estilos** (para la respuesta libre): glassmorphism, liquid-glass, brutalism (mono/pop), minimalism,
claymorphism, neumorphism, spatial, doodle, aurora, comic.


**Guía de recomendación del estilo (las 4 opciones):**

| Proyecto | Recomendado | Alternativas |
|---|---|---|
| Dashboard / SaaS / datos | Glassmorphism o Aurora | Minimalism, Brutalism |
| App de estudio / productividad personal | Doodle o Claymorphism | Comic, Minimalism |
| Portafolio / agencia / marca creativa | Brutalism o Comic | Minimalism, Aurora |
| Landing tech / fintech | Aurora | Spatial, Glassmorphism |
| Juego / comunidad / evento / app de estudio con carácter | Comic | Brutalism (pop), Doodle |
| Premium, multimedia | Spatial o Liquid Glass | Aurora |
| Panel de control / ajustes | Neumorphism (con aviso de accesibilidad) | Minimalism |

### Paleta: la pregunta obligatoria

Se pregunta **siempre**, aunque el prompt ya diga el estilo, el tono o "haz lo que quieras": la
paleta es independiente del estilo y es lo que el usuario más nota. Opciones (recomendada primero):

1. **Conservar la actual (Recomendado)** — no toca `--rs-accent` ni los colores de datos; el estilo
   cambia materiales, forma, profundidad y movimiento.
2. **Paleta del estilo** — usa los valores de `assets/tokens/<estilo>.css` del tema elegido. Es lo
   correcto cuando el proyecto tiene colores de plantilla.
3. **Neutra + un acento** — `--rs-bg`, `--rs-surface` y `--rs-ink` neutros del estilo y un solo
   `--rs-accent` (deriva `--rs-accent-soft`, `--rs-focus` y `--rs-chart-1`).

Si responde con hex, marca o una captura descrita, mapea así:

| Dato del usuario | Token |
|---|---|
| color de fondo | `--rs-bg` (+ `--rs-scene` con la escena del estilo encima) |
| superficie de tarjetas | `--rs-surface`, `--rs-surface-2` |
| color de texto | `--rs-ink`; deriva `--rs-ink-muted` con menos contraste pero **nunca por debajo de AA** |
| color de marca | `--rs-accent` |
| texto sobre la marca | `--rs-accent-ink` (blanco o negro, el que dé AA) |
| marca como texto sobre el fondo | `--rs-accent-text` (oscurece/aclara hasta pasar 4.5:1) |
| bordes y foco | `--rs-border`, `--rs-focus` |

Después de aplicar la paleta ejecuta el verificador de la skill sobre el archivo que contiene los
tokens (`node <ruta-de-la-skill>/scripts/check-contrast.js <archivo-con-tokens>`); si algún par falla,
ajusta luminosidad (no el matiz) y vuelve a comprobar. Anota en el resumen la paleta final con sus
hex. Los 5 colores de gráfico se derivan del acento y de `--rs-accent-2/3`; no inventes series.

Cuando la paleta sea "Conservar la actual", no cambies los tokens de color: solo los de forma,
profundidad, tipografía y movimiento.

La pregunta 4 **decide qué funciones nuevas se añaden** y fija el nivel:

| Marcó | Nivel | Qué entra |
|---|---|---|
| Nada / "ninguna" | **A** | Solo piel (clases, CSS, tokens) |
| Efectos de scroll y movimiento y/o Partículas | **B** | Escena, fuentes, `reskin-fx` (reveal, parallax, tilt, imán, partículas) |
| Imágenes y/o Piezas firma | **C** | B + piezas nuevas (ticker, ráfagas, globos, capas 3D) + imágenes por enlace (`images.md`) con aviso final |

Máximo 3 efectos ambientales + 2 momentos firma por `effects.md`; fuentes: pareja del estilo. Sin esa
aprobación no se añade nada. Si el usuario eligió **imágenes**, el brief lo dice y el agente busca los
enlaces en Google Imágenes con las consultas de `style-playbook.md`.

Qué hace la respuesta de **tono** con los tokens: *Oscuro* → solo el bloque base (o
`data-theme="dark"` en `<html>`); *Claro* → los valores `[data-theme="light"]` como base;
*Según la app* → ambos. Si el usuario elige Oscuro y su sistema está en claro, el reskin debe
verse oscuro igual: no dejes activo el `@media (prefers-color-scheme: light)`.

**Estilos de un solo tono.** Claymorphism y Doodle (claros) no tienen par: no
les afecta la respuesta de tono; si el usuario pide el otro, anótalo en el resumen
("Doodle claro (por diseño)"). Con dos temas: glassmorphism, liquid-glass, brutalism, minimalism,
neumorphism, spatial, aurora y comic.

Sin solapamientos: el **tono** cubre la luminosidad (claro/oscuro), la **paleta** cubre los
matices y el acento, las **funciones nuevas** deciden cuánto se añade y el **alcance** la extensión. La
tipografía no tiene pregunta propia: la trae el estilo aprobado. Si el usuario quiere otra cosa,
lo dirá con "Cambiar algo" o en la respuesta libre.

Adapta las descripciones al stack: en Next.js puedes mencionar Server Components; en HTML
puro, la ausencia de build. Nunca preguntes "¿usas Tailwind?" si la detección ya lo respondió.

## Plan B: opciones numeradas en el chat

**Solo** si llamaste a la herramienta y falló, devolvió error o el agente no tiene
selector interactivo. Nunca por defecto ni por comodidad.

1. Avísalo en una línea: "No hay selector interactivo; te dejo las opciones numeradas."
2. Enumera: `1) ... 2) ... 3) Otro: escribe tu respuesta`.
3. Recomendada primero y con la razón.

## Si el usuario no responde o pide "tú decides"

1. Elige la recomendación de cada pregunta.
2. Anótalo en el resumen como "decidido por el agente".
3. Pide confirmación igualmente antes de editar.

## Resumen y confirmación

```markdown
## Brief reskin
- Stack: Next.js (App Router) + Tailwind v4 + TypeScript
- Estilo: Liquid Glass
- Tono: oscuro
- Paleta: conservar la actual (--rs-accent #5a4ef0) · o: paleta del estilo · o: neutra + acento #e05a2b
- Alcance: toda la app
- Funciones nuevas: efectos de scroll (reveal, parallax) + partículas orbs → nivel B · momento firma: tarjeta héroe con tilt
- Fuentes: Plus Jakarta Sans
- Imágenes: no (nivel B) · o: sí, 1 héroe + 4 de apoyo por **enlace directo de Google Imágenes** (sin descargar), con respaldo y aviso final (nivel C)
- Destino: src/reskin/ (reskin-fx.css, reskin-fx.js, RESKIN-IMAGES.md)
- Implementación: tokens → @theme → utilidades; efectos con reskin-fx (sin hojas de componentes nuevas)
- No se toca: lógica de negocio, datos, handlers existentes, textos, rutas, dependencias npm
```

Confirma con la **misma herramienta**, no escribiendo "responde sí" en el chat:

- `header`: `Confirmar`
- Opciones, en este orden:
  1. `Aplicar` (Recomendado) — "Aplico el brief: diseño, escena, funciones nuevas de diseño e imágenes aprobadas; sin tocar la lógica de negocio".
  2. `Cambiar algo` — "Ajustamos estilo, tono, paleta o alcance antes de editar".

Si la herramienta no está disponible, pregunta en el chat: "¿Aplico este brief?".
**No edites código hasta un "Aplicar" o un "sí" explícito.** Si el usuario elige "Cambiar
algo", pregunta qué ajusta, actualiza el brief y vuelve a confirmar; no repitas las
preguntas que no cambiaron.

## No preguntar

- Lo que ya está en `package.json`, los configs o el CSS.
- Funcionalidad de producto nueva (datos, API, auth, copy, rutas) o bugs: no es un reskin. Las **funciones de diseño** (efectos, partículas, imágenes, piezas decorativas) sí se preguntan.
- Logo o branding si el usuario no pidió cambiarlo.
- "¿Qué framework usas?" cuando el script o los archivos ya lo dicen.
- **Nunca omitas la paleta** por creer que ya la conoces: aunque detectes colores en el CSS, la
  pregunta es si el usuario quiere conservarlos. Ofrécelos como recomendación, no los des por hechos.
