---
name: reskin
description: >-
  Aplica un estilo visual completo (glassmorphism, liquid-glass, retro, ...),
  sin tocar la lógica del frontend existente. Detecta el stack, entrevista breve
  con el brief, confirma y reesigna estilos y clases. Activar cuando el usuario
  pida darle un look nuevo / redesign visual / cambiar la apariencia a un proyecto
  frontend que ya funciona. No activar para greenfield, bugs de comportamiento,
  migraciones de librería o cambios de funcionalidad.
---

# reskin

Reformatea la capa visual de un frontend existente. Nunca toca estados, funciones,
props ni lógica. El objetivo es que el producto cambie de cara sin que su comportamiento
deje de funcionar.

## Cuándo se usa

- El usuario ya tiene un frontend construido y quiere una identidad visual nueva.
- El brief viene de un diseñador, un pitch, un cliente o una preferencia personal.
- El equipo quiere probar un estilo (glassmorphism, liquid-glass, retro, brutalismo...)
  sin refactorizar nada.

## Cuándo NO se usa

- Nuevo proyecto desde cero (el skill asume stack existente).
- Bug de comportamiento / crash / rendimiento funcional.
- Migración de librería, cambio de framework o refactor de arquitectura.
- Si la petición mezcla estilo con features nuevos: hacer primero el feature o derivar
  el brief de una parte ya hecha.

## Flujo

1. **Detectar** el stack (→ `references/detection.md`).
   - Si no se detecta con seguridad: NO adivinar. Preguntar al usuario.
2. **Entrevistar** el brief con la herramienta de preguntas del agente
   (→ `references/interview.md`). Máx. 4 preguntas, 2–4 opciones + "Otro".
3. **Mostrar el resumen del brief y pedir confirmación** antes de tocar código.
4. **Aplicar** el estilo adaptado al stack (→ `references/styles/<estilo>.md`).

## Cargar referencias

- `references/detection.md` — al activarse, siempre.
- `references/interview.md` — al activarse, siempre (aunque se detecte todo).
- `references/styles/<nombre>.md` — al elegir estilo en el brief.
- `references/rules.md` — siempre que se vaya a editar código (antes de aplicar).
- `references/adapters/<stack>.md` — junto al estilo elegido, según el stack detectado.

Mantener el contexto liviano: SKILL.md solo orquesta, el contenido vive en las referencias.

## Estilos disponibles

- `references/styles/glassmorphism.md` — vidrio con escena suave. Tokens en
  `assets/tokens/glassmorphism.css`.
- `references/styles/liquid-glass.md` — cristal líquido (preset de intensidad sobre los
  mismos tokens `--rs-*`).
- `references/styles/retro.md` — arcade / CRT terminal / synthwave.

Próximos: brutalismo y más direcciones. Cada estilo trae su adaptador de stack
(`react`, `html-css`, `tailwind-v4`, `nextjs`, ...).
