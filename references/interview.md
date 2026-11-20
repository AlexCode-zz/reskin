# Entrevista al brief

Sigue la secuencia exacta: detectar → preguntar → resumir → confirmar → aplicar.

## Reglas

- **Máximo 4 preguntas.** Nunca más. Si el brief necesita más, se reutiliza el
  estilo elegido y se documentan las decisiones abiertas en el resumen.
- **2–4 opciones por pregunta.** Con una opción solo no hay selección; poner
  "(Recomendado)" y una razón corta basada en el stack detectado.
- **"Otro"** siempre presente: permite escribir la respuesta.
- **No preguntar lo ya detectado.** Solo lo que la detección dejó abierto
  (p. ej. si no detectó `tailwind.config`, puede preguntar si usan CSS modules).

## Herramienta de preguntas interactivas

1. Si el agente tiene herramienta de preguntas con selector por flechas (p. ej.
   Gemini/GPT/Claude con Q&A interactivo): usarla.
2. Si no: preguntar conversacionalmente, enumerando las opciones en orden, con
   "(Recomendado)" primero y la razón. No inventar un mecanismo que no existe.

## Preguntas (patrón — se adaptan al stack detectado)

| # | Tema | Opciones típicas | Recomendación cuando… |
|---|---|---|---|
| 1 | **Dirección de estilo deseada** | Opción preferida del usuario / Otro. Si el usuario no la tiene: glassmorphism (Recomendado) — porque funciona con casi cualquier stack sin plugins. | Usuario sin preferencia. Razón: un solo tema, 3 niveles, sin dependencias. |
| 2 | **Aesthetic persona** | 3D premium / Plano limpio / Retro / Orgánico / Brutalista / Minimalista. (Recomendado según estilo de la app.) | Si el proyecto ya tiene color propio fuerte: respetarlo. |
| 3 | **Sensación / tono** | Sereno / Energético / Corporativo serio / Playful / Luxury discreto. | Basado en el sector de la app. |
| 4 | **Alcance / excepción** | Solo marketing / Todo el producto / App completa / Solo paneles. (Recomendado: app completa.) | Según tamaño. Con "Otro" puede ampliarse.

## Plantilla de pregunta (opción "Otro" y edición)

- Opción libre: "Dime qué prefieres o describe tu dirección". Nunca adivinar su
  respuesta.
- Si el usuario edita una opción, actualizar la recomendación si cambia la razón.

## Plan B (sin herramienta de preguntas)

- Preguntas de opción múltiple numeradas en el chat: "1) A — 2) B — 3) C — 4) Otro: escribe tu respuesta".
- "Otro: escribe tu respuesta" siempre al final.

## Resumen del brief (paso 3)

Antes de tocar código, presentar un bloque con:

```markdown
## Brief reskin
- Stack detectado: <framework> / <uiLibrary> / <cssApproach>
- Estilo propuesto: <estilo> (<por qué)
- Dirección: <persona> · <tono>
- Alcance: <marketing / app / paneles>
- Decisiones abiertas: <lista corta o "ninguna">
- Estilo de implementación: tokens → clases/utilidades → overrides
```

Formato: tabla de 4–6 filas (stack / estilo / dirección / alcance / decisiones). Pedir
confirmación explícita. Si el usuario corrige, se actualiza el brief y se pregunta de
nuevo SOLO lo que cambió.

## No entrevistar

- No preguntar diseño de marca que ya exista en el proyecto (logo, paleta, tipografía).
- No preguntar colores ni logos nuevos si el usuario no dio señales de que quiere cambiarlos;
  primero preguntar la dirección, y solo si el usuario elige "cambio total" ir al branding.
- No preguntar "qué funcionalidad quieres": eso no es un reskin.

## Entregables del paso 2–3

- Brief confirmado.
- Estilo elegido (de la lista del skill o libre).
- Adaptación del estilo al stack (se carga `references/styles/<estilo>.md` y el adapter).
