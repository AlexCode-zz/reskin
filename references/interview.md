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
- **Header** (`header`): máximo 30 caracteres: `Estilo`, `Tono`, `Alcance`.
- **Opciones** (`options`): 2–3 reales, cada una con `label` (2–4 palabras) y `description`
  (una razón corta ligada al proyecto detectado).
- La recomendada va **primero**, con "(Recomendado)" en el label y la razón en `description`.
- **No agregues una opción "Otro" manual**: la herramienta ya permite respuesta
  personalizada. Agrégala como última opción **solo** si esa variante no la trae.

## Llamadas

- Si la herramienta admite varias preguntas: **una sola llamada** con las 3.
- Si exige una por llamada: 3 llamadas seguidas, sin pedir permiso entre ellas.
- Nunca cambies a plan B porque haya que hacer varias llamadas.

## Las 3 preguntas

| # | Tema | Pregunta | Opciones | Recomendación |
|---|---|---|---|---|
| 1 | Estilo | ¿Qué estilo visual aplicamos? | Glassmorphism / Liquid Glass / Retro | Panel, dashboard o SaaS → Glassmorphism. Producto de consumo, chrome premium o marca fuerte → Liquid Glass. Portafolio, landing creativa, juego o terminal → Retro. |
| 2 | Tono | ¿Tono claro u oscuro? | Claro / Oscuro / Según la app | Datos, herramientas, terminal o uso nocturno → Oscuro. Contenido, docs, marketing o comercio → Claro. Si ya existe toggle de tema → Según la app, que lo respeta. |
| 3 | Alcance | ¿Hasta dónde llega el reskin? | Toda la app / Solo los componentes principales / Una página o ruta específica | Toda la app: un reskin a medias se ve incoherente. Componentes principales = nav, botones, cards y formularios. Página/ruta solo si el resto se rediseña aparte. |

Qué hace la respuesta de **tono** con los tokens: *Oscuro* → solo el bloque base (o
`data-theme="dark"` en `<html>`); *Claro* → los valores `[data-theme="light"]` como base;
*Según la app* → ambos. Si el usuario elige Oscuro y su sistema está en claro, el reskin debe
verse oscuro igual: no dejes activo el `@media (prefers-color-scheme: light)`.

**Retro solo existe en oscuro.** No tiene bloque claro ni le afecta la respuesta de tono;
si el usuario elige Claro con Retro, anótalo como "Retro oscuro (por diseño)" en el resumen.

Sin solapamientos: el tono cubre la paleta y el alcance cubre la extensión. La identidad no
tiene pregunta propia: por defecto se conservan paleta y tipografía y solo cambian
materiales y superficies. Si el usuario quiere otra cosa, lo dirá con "Cambiar algo" o en
la respuesta libre.

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
- Alcance: toda la app
- Identidad: conservar paleta y tipografía; solo cambian materiales y superficies
- Implementación: tokens → @theme → utilidades (sin hojas nuevas)
- No se toca: lógica, estado, props, textos, rutas, dependencias
```

Confirma con la **misma herramienta**, no escribiendo "responde sí" en el chat:

- `header`: `Confirmar`
- Opciones, en este orden:
  1. `Aplicar` (Recomendado) — "Aplico el brief: solo clases, CSS y tokens".
  2. `Cambiar algo` — "Ajustamos estilo, tono o alcance antes de editar".

Si la herramienta no está disponible, pregunta en el chat: "¿Aplico este brief?".
**No edites código hasta un "Aplicar" o un "sí" explícito.** Si el usuario elige "Cambiar
algo", pregunta qué ajusta, actualiza el brief y vuelve a confirmar; no repitas las
preguntas que no cambiaron.

## No preguntar

- Lo que ya está en `package.json`, los configs o el CSS.
- Funcionalidad nueva, copy, rutas o bugs: no es un reskin.
- Logo o branding si el usuario no pidió cambiarlo.
- "¿Qué framework usas?" cuando el script o los archivos ya lo dicen.
