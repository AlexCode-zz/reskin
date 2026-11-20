# reskin

Skill de Agent Skills (formato `SKILL.md`) que aplica un **estilo visual completo a un
frontend existente sin romper su lógica**.

Dado un proyecto que ya funciona (React, Next.js, Tailwind, HTML/CSS puro), `reskin` le
cambia la cara visual — glassmorphism, liquid-glass, retro, brutalismo — respetando el
stack real, sin añadir dependencias y sin tocar comportamiento.

## Qué resuelve

- El equipo tiene un frontend con lógica sólida y quiere una identidad visual nueva en
  horas, no en semanas.
- Se evita el "rediseño desde cero": el CSS/tokens existentes se adaptan, no se reemplaza.
- Reglas anti-regresión: el diff solo debe contener estilos y clases.

## Instalación

### Desde GitHub (recomendado)

```bash
npx skills add AlexCode-zz/reskin
```

### Local

```bash
git clone https://github.com/AlexCode-zz/reskin.git
npx skills add ./reskin
```

### O desde cualquier repo con el skill clonado

```bash
npx skills add ./reskin --skill reskin
```

## Uso

### Prompt (60 segundos)

```
Usa la skill `reskin` en este proyecto. Quiero aplicar <estilo> (o: quiero el que mejor
encaje con <stack detectado>).
```

O directamente sobre el repo:

```bash
npx skills use AlexCode-zz/reskin@reskin --agent claude-code
```

Flujo que ejecuta la skill:

1. Detecta stack (package.json, configs, estructura).
2. Entrevista breve con preguntas interactivas (máx. 4, con "Otro").
3. Muestra resumen del brief y pide confirmación.
4. Aplica el estilo adaptado.

## Requisitos

- Agente compatible con Agent Skills (Claude Code, OpenCode, Codex, Cursor, ...).
- Sin dependencias, scripts ni assets pesados. El único asset es el token CSS de glassmorphism.

## Estado del proyecto

- **Fase 1 (hecha):** `SKILL.md`, `references/` base (`rules`, `detection`, `interview`,
  `styles/glassmorphism`, `adapters/react`) y `assets/tokens/glassmorphism.css`.
- **Fase 2 (pendiente):** `references/styles/liquid-glass.md`, `references/styles/retro.md`,
  adaptadores `html-css.md`, `tailwind-v4.md`, `nextjs.md`.

## Licencia

Pendiente.
