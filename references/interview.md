# Entrevista al brief

Secuencia: detectar → presentar stack → preguntar → resumir → confirmar → aplicar.

## Antes de preguntar

La detección ya respondió framework, capa de estilos, router y TypeScript. Preséntalo en
una línea y no lo vuelvas a preguntar:

> Detecté **Next.js (App Router) + Tailwind v4 + TypeScript**. No cambiaré lógica, textos
> ni rutas.

Si falta un dato, pregunta solo ese dato, una vez.

## Reglas

- **Máximo 4 preguntas.** Si el brief pide más, cierra las decisiones abiertas en el
  resumen y sigue.
- **2–4 opciones por pregunta**, con la recomendada primero, marcada "(Recomendado)" y una
  razón ligada al stack o al proyecto.
- **"Otro" siempre presente** para respuesta libre.
- No preguntes lo detectable: framework, Tailwind, CSS Modules, router, TypeScript, ni la
  paleta que ya está en el código.
- Si el usuario ya dijo el estilo en el prompt, no lo preguntes: úsalo y pasa a las demás.

## Preguntas

| # | Tema | Opciones | Recomendación |
|---|---|---|---|
| 1 | Estilo | Glassmorphism (Recomendado) / Liquid Glass / Retro | Glassmorphism si no hay preferencia: funciona en cualquier stack, sin plugins y con contraste controlado. Si el brief pide chrome premium, recomienda Liquid; si es portafolio, landing o juego, recomienda Retro. |
| 2 | Variante o intensidad | Glass: Equilibrada (Recomendado) / Sutil / Marcada · Liquid: Oscuro (Recomendado) / Claro / Automático · Retro: Arcade (Recomendado) / CRT / Synthwave | Equilibrada por defecto; arcade sobrio si hay datos; CRT si el brief es terminal. Pregunta solo la variante del estilo elegido. |
| 3 | Alcance | Toda la app (Recomendado) / Shell (nav, fondos, layout) / Una página o flujo | Toda la app: un reskin a medias se ve incoherente. Shell si el resto está en rediseño. |
| 4 | Identidad | Conservar colores y tipografía (Recomendado) / Conservar colores y cambiar tipografía / Aplicar la paleta completa del estilo | Conservar identidad: el reskin cambia materiales y superficies sin perder reconocimiento de marca. Aplicar paleta solo si el proyecto no tiene marca fuerte. |

Adapta las opciones al stack: en Next.js puedes mencionar Server Components; en HTML puro,
la ausencia de build. Nunca preguntes "¿usas Tailwind?" si la detección ya lo respondió.

## Herramienta de preguntas

1. Si el agente tiene selector interactivo, úsalo.
2. Si no, enumera en el chat: `1) ... 2) ... 3) ... 4) Otro: escribe tu respuesta`.
   Recomendada primero y con la razón.

## Plan B (si el usuario no responde o pide "tú decides")

1. Elige la recomendación de cada pregunta.
2. Anótalo en el resumen como "decidido por el agente".
3. Pide confirmación igualmente antes de editar.

## Resumen y confirmación

```markdown
## Brief reskin
- Stack: Next.js (App Router) + Tailwind v4 + TypeScript
- Estilo: Liquid Glass · intensidad equilibrada · tema oscuro
- Alcance: toda la app
- Identidad: conservar paleta y tipografía
- Implementación: tokens → @theme → utilidades (sin hojas nuevas)
- No se toca: lógica, estado, props, textos, rutas, dependencias
```

Cierra con: "¿Aplico este brief? Responde **sí**, o dime qué ajusto." **No edites código
hasta un sí explícito.** Si el usuario corrige algo, actualiza el brief y vuelve a
confirmar; no repitas las preguntas que no cambiaron.

## No preguntar

- Lo que ya está en `package.json`, los configs o el CSS.
- Funcionalidad nueva, copy, rutas o bugs: no es un reskin.
- Logo o branding si el usuario no pidió cambiarlo.
- "¿Qué framework usas?" cuando el script o los archivos ya lo dicen.
