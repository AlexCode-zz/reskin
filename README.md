# reskin

Skill de Agent Skills que cambia la piel visual de un frontend que **ya funciona** sin
tocar su lógica. Detecta el stack, hace un brief de 3 preguntas, pide confirmación y
aplica el estilo con los tokens y el sistema de estilos que el proyecto ya usa.

## Qué hace

- **Detecta dos ejes:** framework (React, Next.js, HTML puro) y capa de estilos
  (Tailwind v4, Tailwind v3, CSS Modules, CSS puro). También router de Next.js y
  TypeScript.
- **Entrevista en vivo:** 3 preguntas con el selector nativo del agente (`question` en
  OpenCode, `AskUserQuestion` en Claude Code), recomendación basada en el stack,
  respuesta libre y confirmación antes de editar.
- **Aplica el estilo:** tokens, escena, navbar, cards, botones, inputs, modales y tablas,
  con WCAG AA y `prefers-reduced-motion`.
- **Respeta el sistema:** con Tailwind, tokens al theme y utilidades; sin Tailwind,
  variables CSS en la hoja existente. Sin dependencias nuevas.

## Instalación

### Recomendada

```bash
npx skills add AlexCode-zz/reskin
```

El CLI pregunta si la instalas global o solo en el proyecto.

### Alternativa con git clone

```bash
git clone https://github.com/AlexCode-zz/reskin.git
npx skills add ./reskin
```

Si tu agente lee skills locales, copia la carpeta `reskin/` en su directorio de skills
(por ejemplo, `.claude/skills/reskin`). Sin instalar, también puedes pedirle:

```
Lee ./reskin/SKILL.md y úsala como guía para este proyecto.
```

## Pruébalo en 60 segundos

1. Instala la skill y abre la raíz de tu proyecto frontend.
2. Pide:

   ```
   Usa la skill reskin en este proyecto. Quiero un look liquid-glass.
   No cambies lógica, textos ni rutas.
   ```

3. Confirma el stack que detecta y responde las 3 preguntas con el selector.
4. Revisa el brief y elige "Aplicar".
5. Mira el diff: solo clases, CSS y tokens. Ejecuta tu build y revisa 360/768/1280px.

Si no sabes qué estilo elegir, pide "el que recomiendes": la skill propone según el
proyecto.

## Estilos

| Estilo | Cuándo brilla |
|---|---|
| **Glassmorphism** | Dashboards, SaaS, landings y paneles con superficies de vidrio suave. |
| **Liquid Glass** | Chrome flotante premium, nav, docks, modales sobre imagen o video. |
| **Retro** | Portafolios, landings, juegos y demos. Variantes arcade, CRT y synthwave. |

Cada estilo trae tokens, recetas de componentes, errores comunes y checklist AA.

## Tecnologías

- **Frameworks:** React, Next.js (App Router y Pages Router), HTML/CSS puro.
- **Capa de estilos:** Tailwind CSS v4, Tailwind CSS v3, CSS Modules, CSS puro.
- **Lenguaje:** JavaScript y TypeScript.
- **Sin dependencias nuevas.** No se añaden paquetes, plugins ni fuentes por npm.

## La regla

Solo se tocan **estilos**: clases, CSS, tokens, color, tipografía y movimiento. Nunca
estado, hooks, props, textos, `key`, rutas, fetching, tests, dependencias ni lockfiles. La
guía completa está en `references/rules.md`.

## Estructura

```text
SKILL.md                       flujo y tabla de carga
references/
  detection.md                 framework, capa de estilos, router, TypeScript
  interview.md                 preguntas y confirmación del brief
  rules.md                     límites y accesibilidad
  styles/                      glassmorphism, liquid-glass, retro
  adapters/                    react, nextjs, html-css, tailwind-v4, tailwind-v3
assets/tokens/                 variables CSS por estilo
scripts/detect-stack.sh        detección opcional (bash, sin dependencias)
```

## Verificación

```bash
bash -n scripts/detect-stack.sh
bash scripts/detect-stack.sh /ruta/al/proyecto
```

El script imprime `framework`, `styling`, `router` y `typescript`. Si no puede ejecutarse,
la skill detecta leyendo `package.json`, los configs y la estructura.

## Licencia

Sin licencia definida todavía.
