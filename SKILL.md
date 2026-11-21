---
name: reskin
description: >-
  Aplica un estilo visual completo (glassmorphism, liquid-glass, retro) a un
  frontend existente sin cambiar su lógica. Detecta el framework (React, Next.js,
  HTML/CSS) y la capa de estilos (Tailwind v4/v3, CSS Modules, CSS puro),
  entrevista con un brief corto, pide confirmación y aplica tokens, clases y
  estilos. Úsala cuando el usuario pida "reskin", rediseñar, modernizar o dar un
  look nuevo a un proyecto frontend que ya funciona. No para greenfield, bugs de
  comportamiento, migraciones de librería ni features nuevas.
---

# reskin

Cambia la piel visual de un frontend existente. Nunca toca estados, funciones, props ni
lógica. El producto cambia de cara; su comportamiento queda intacto.

## Cuándo se usa

- El usuario ya tiene un frontend y quiere una identidad visual nueva.
- Quiere probar un estilo (glassmorphism, liquid-glass, retro) sin refactorizar.
- El brief viene de un diseñador, un cliente, un pitch o una preferencia personal.

## Cuándo NO se usa

- Proyecto nuevo desde cero.
- Bugs de comportamiento, crashes o rendimiento funcional.
- Migración de librería, framework o arquitectura.
- Features nuevos mezclados con el rediseño: primero el feature.

## Dos ejes, no uno

**Tailwind no es un framework: es una capa de estilos.**

- **Framework:** `react` | `nextjs` | `html-puro`
- **Capa de estilos:** `tailwind-v4` | `tailwind-v3` | `css-modules` | `css-puro`

No confundas "Next.js + Tailwind" con "framework Tailwind". La detección los separa.

## Flujo

1. **Detectar** (`references/detection.md`).
   - Lee `package.json`, configs y estructura; usa `scripts/detect-stack.sh` si está.
   - Si no puedes determinar framework o capa de estilos: pregunta una vez. **No adivines.**
2. **Entrevistar** (`references/interview.md`).
   - **Siempre primero la herramienta nativa de preguntas:** `question` (OpenCode) o
     `AskUserQuestion` (Claude Code). Entrevista en vivo, no números escritos en el chat.
   - Un campo por pregunta: texto, header corto (máx. 30 caracteres) y opciones con
     label + description. La recomendada primero con "(Recomendado)" y una razón corta.
   - No agregues una opción "Otro" manual: la herramienta ya acepta respuesta libre; solo
     si esa variante no la trae, va como última opción.
   - 3 preguntas: estilo, tono/paleta y alcance. Sin solapamientos.
   - Si la herramienta admite varias preguntas, mándalas en una sola llamada; si exige una
     por llamada, haz 3 llamadas seguidas.
   - No preguntes lo ya detectado: anúncialo en una línea.
3. **Resumen + confirmación.** Muestra el brief (stack, estilo, tono, alcance y qué no se
   toca) y confirma con la misma herramienta: `Aplicar` / `Cambiar algo`.
   **No edites código hasta un "Aplicar" o un "sí" explícito.**
4. **Aplicar** (`references/rules.md` + estilo + adapter).
   - Orden: tokens → base/escena → superficies → controles → estados → responsive.
   - Diff revisable: solo clases, CSS y tokens.
5. **Verificar.** Build/lint/typecheck si existen; contraste AA; foco; reduced motion;
   360/768/1280; diff sin lógica.

## Regla de capas (no negociable)

**Si hay Tailwind:**

- Aplica el estilo con **clases utilitarias**.
- Lleva los tokens al theme: v4 → `@theme` en el CSS global existente; v3 →
  `theme.extend` en `tailwind.config.*`.
- **No agregues archivos CSS aparte** ni CSS de componentes. Nada de un segundo sistema.

**Si no hay Tailwind:**

- Usa CSS normal con las variables de `assets/tokens/<estilo>.css`.
- Tokens en `:root` del CSS existente; clases semánticas en el CSS global o module.
- No introduzcas un framework CSS nuevo.

## Cargar solo lo necesario

| Necesitas | Archivo |
|---|---|
| Detectar framework y capa de estilos | `references/detection.md` |
| Preguntas, brief y confirmación | `references/interview.md` |
| Reglas antes de editar código | `references/rules.md` |
| Estilo elegido | `references/styles/<estilo>.md` + `assets/tokens/<estilo>.css` |
| Framework React | `references/adapters/react.md` |
| Framework Next.js | `references/adapters/nextjs.md` |
| Framework HTML puro | `references/adapters/html-css.md` |
| Capa Tailwind v4 | `references/adapters/tailwind-v4.md` |
| Capa Tailwind v3 | `references/adapters/tailwind-v3.md` |

Combinaciones: Next + Tailwind → `nextjs` + `tailwind-*`; React + Tailwind → `react` +
`tailwind-*`; HTML/CSS puro → solo `html-css`. No cargues el adaptador de otro framework ni
estilos que no se eligieron.

## Estilos disponibles

- **Glassmorphism** — vidrio suave sobre escena. `references/styles/glassmorphism.md` +
  `assets/tokens/glassmorphism.css`.
- **Liquid Glass** — blur alto, borde especular, sombras internas.
  `references/styles/liquid-glass.md` + `assets/tokens/liquid-glass.css`.
- **Retro** — arcade, CRT o synthwave. `references/styles/retro.md` +
  `assets/tokens/retro.css`.

Cada estilo define sus componentes, errores comunes, WCAG AA y reduced motion.

## Límites duros

- Solo estilos: clases, CSS, tokens, tipografía, color, movimiento.
- No tocar: estado, hooks, handlers, props, rutas, fetching, textos, tests, dependencias
  ni lockfiles.
- No agregar paquetes ni fuentes por npm. Un `<link>` de fuente solo si el brief lo aprueba.
- Si el estilo exige lógica, props o reestructurar el DOM: **para y pregunta**.
- La entrevista va por la herramienta nativa de preguntas. Las opciones numeradas en el
  chat son solo el plan B: si la herramienta no existe o falló.
- Si no hay confirmación del brief, no hay código.
