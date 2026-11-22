# reskin

Skill de Agent Skills que cambia la piel visual de un frontend que **ya funciona** sin
tocar su lógica. Detecta el stack, hace un brief de 3 preguntas, pide confirmación y
aplica el estilo con los tokens y el sistema de estilos que el proyecto ya usa.

## Qué hace

- **Detecta dos ejes:** framework (React, Next.js, HTML puro) y capa de estilos (Tailwind v4/v3,
  CSS Modules, CSS puro), más router, TypeScript, entrypoints y librerías de animación.
- **Entrevista en vivo:** 4 preguntas con el selector nativo del agente (estilo, tono, intensidad y
  alcance), recomendación según el tipo de proyecto y confirmación antes de editar.
- **No solo cambia colores.** Cada estilo trae tipografía, forma, sistema de sombras, escena de
  fondo, textura, una pieza firma y movimiento propio. Una puerta de calidad
  (`references/design-depth.md`) exige cambiar al menos 6 de 7 ingredientes.
- **Efectos sin dependencias** (`assets/effects/reskin-fx.js` + `.css`): partículas (estrellas,
  polvo, burbujas, píxeles, confeti, orbes), scroll reveal, parallax, tilt 3D, spotlight,
  luz que sigue al cursor y barra de progreso. Respetan `prefers-reduced-motion`.
- **Imágenes provisionales** (nivel C): se buscan en internet, se registran en `RESKIN-IMAGES.md` y el
  skill **avisa al final** de que son de Google/bancos de imágenes y hay que cambiarlas por propias.
- **Restiliza los gráficos de terceros** (Recharts, Chart.js…): tooltips, ejes, rejilla y series.
- **Respeta el sistema:** con Tailwind, tokens al theme y utilidades; sin Tailwind, variables CSS.
  Sin paquetes npm nuevos.
- **Vista previa** de los 11 estilos en `assets/preview.html?style=aurora&theme=dark`.

## Niveles de intervención

| Nivel | Qué cambia | Ideal para |
|---|---|---|
| **A · Piel** | Clases, CSS y tokens | Proyectos frágiles o si solo quieres color y forma |
| **B · Escena** *(recomendado)* | A + fondo con escena, fuentes, efectos (partículas, scroll, tilt) | Dashboards y apps |
| **C · Completo** | B + piezas decorativas e imágenes provisionales | Landings, portafolios, sitios de marca |

La lógica nunca se toca en ningún nivel.

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

## Estilos (11)

| Estilo | Cuándo brilla | Temas |
|---|---|---|
| **Glassmorphism** | Dashboards, SaaS, paneles con vidrio suave | oscuro · claro |
| **Liquid Glass** | Chrome flotante premium, sobre imagen o video | oscuro · claro |
| **Retro** | Portafolios, juegos, demos: arcade, CRT y synthwave con escena propia | oscuro |
| **Brutalism** | Marcas creativas y portafolios: tipografía gigante, sombras duras (mono y pop) | claro · oscuro |
| **Minimalism** | Portafolios, agencias, marcas premium: aire y un acento | claro · oscuro |
| **Claymorphism** | Apps amigables y de estudio: plastilina inflada | claro |
| **Neumorphism** | Paneles de control: relieve suave (cuidado con la accesibilidad) | claro · oscuro |
| **Spatial** | Experiencias premium: paneles de vidrio con profundidad 3D | oscuro · claro |
| **Doodle** | Productividad y educación: hecho a mano, papel y tinta | claro |
| **Y2K** | Nostalgia 2000: escritorio pastel con ventanas biseladas | claro |
| **Aurora** | Landings tech/fintech: gradientes de aurora al estilo Stripe | claro · oscuro |

Cada estilo trae tokens (verificados AA), componentes, ficha con ingredientes, errores comunes y
checklist. Los nombres de clase son iguales en todos (`.rs-card`, `.rs-btn`, `.rs-table`…), así
que cambiar de estilo no cambia el marcado.

## Tecnologías

- **Frameworks:** React, Next.js (App Router y Pages Router), HTML/CSS puro.
- **Capa de estilos:** Tailwind CSS v4, Tailwind CSS v3, CSS Modules, CSS puro.
- **Lenguaje:** JavaScript y TypeScript.
- **Sin dependencias nuevas.** No se añaden paquetes ni plugins; las fuentes van por `<link>`/`next/font` y los efectos son vanilla.

## La regla

Solo se tocan **estilos y capas decorativas**: clases, CSS, tokens, escena, tipografía, movimiento, efectos e imágenes provisionales. Nunca
estado, hooks, props, textos, `key`, rutas, fetching, tests, dependencias ni lockfiles. La
guía completa está en `references/rules.md`.

## Estructura

```text
SKILL.md                       flujo, niveles y tabla de carga
references/
  detection.md                 framework, capa de estilos, router, TypeScript, entrypoints
  interview.md                 las 4 preguntas, recomendación y confirmación del brief
  rules.md                     niveles, límites y accesibilidad
  design-depth.md              puerta anti-genérico (7 ingredientes, regla de los 6)
  effects.md                   partículas, scroll, parallax, tilt: instalación y recetas
  images.md                    imágenes provisionales, registro y aviso final
  charts-and-widgets.md        gráficos, tooltips y widgets de terceros
  styles/                      11 fichas de estilo
  adapters/                    react, nextjs, html-css, tailwind-v4, tailwind-v3
assets/
  tokens/                      variables CSS por estilo (incluye colores de gráficos)
  components/                  _base.css (estructura compartida) + una hoja por estilo
  effects/                     reskin-fx.js y reskin-fx.css (sin dependencias)
  placeholders/                SVG provisionales para imágenes
  preview.html                 vista previa de los 11 estilos
scripts/detect-stack.sh        detección opcional (bash, sin dependencias)
scripts/check-contrast.js      verificador WCAG de tokens (Node, sin dependencias)
```

## Verificación

```bash
bash -n scripts/detect-stack.sh
bash scripts/detect-stack.sh /ruta/al/proyecto
```

```bash
node scripts/check-contrast.js                      # los 11 estilos
node scripts/check-contrast.js assets/tokens/retro.css
```

El verificador de contraste calcula la relación WCAG de cada par (texto, acento, peligro,
aviso, tooltip, foco y series de gráficos) en cada tema y falla si alguno baja de AA.

El script de detección imprime `framework`, `styling`, `router` y `typescript`. Si no puede ejecutarse,
la skill detecta leyendo `package.json`, los configs y la estructura.

## Prueba visual

```bash
npx serve assets        # y abre /preview.html?style=brutalism&v=pop
```

Cambia `style` (`glassmorphism`, `liquid-glass`, `retro`, `brutalism`, `minimalism`, `claymorphism`, `neumorphism`, `spatial`, `doodle`, `y2k`, `aurora`), `theme` (`dark`/`light`) y `v` (`pop`, `synth`, `crt`).

## Licencia

Sin licencia definida todavía.
