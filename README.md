# reskin

Skill de Agent Skills que **rediseña por completo** un frontend que ya funciona, sin tocar su
lógica de negocio, y puede añadir **funciones nuevas de diseño** (efectos, partículas, imágenes,
piezas decorativas). Detecta el stack, hace un brief de 5 preguntas (incluida la paleta y las
funciones nuevas), pide confirmación y aplica el estilo con los tokens y el sistema de estilos que
el proyecto ya usa. Todo lo que instala vive en `src/reskin/`, dentro del proyecto.

## Qué hace

- **Detecta dos ejes:** framework (React, Next.js, HTML puro) y capa de estilos (Tailwind v4/v3,
  CSS Modules, CSS puro), más router, TypeScript, entrypoints y librerías de animación.
- **Entrevista en vivo:** 5 preguntas con el selector nativo del agente (estilo, tono, **paleta de
  colores**, **funciones nuevas de diseño** y alcance), recomendación según el tipo de proyecto y confirmación antes de
  editar. La paleta se pregunta siempre: conservar la actual, la del estilo, neutra + acento o tus
  propios hex.
- **No solo cambia colores.** Cada estilo trae tipografía, forma, sistema de sombras, escena de
  fondo, textura, una pieza firma y movimiento propio. Una puerta de calidad
  (`references/design-depth.md`) exige cambiar al menos 6 de 7 ingredientes.
- **Efectos sin dependencias** (`assets/effects/reskin-fx.js` + `.css`): partículas (estrellas,
  polvo, burbujas, píxeles, confeti, orbes), scroll reveal, parallax, tilt 3D, spotlight,
  botones imantados, luz que sigue al cursor y barra de progreso. Respetan `prefers-reduced-motion`.
- **Piezas nuevas, no solo color:** el skill añade al menos un *momento firma* (ticker, capa 3D,
  sticker, ventana, botón imantado) además del estilo, con presupuesto de movimiento controlado.
- **Imágenes con animación** (nivel C): Ken Burns, cortinilla de entrada, zoom al hover y barrido de
  luz, con pausa y `prefers-reduced-motion`. Las imágenes se **enlazan directamente desde Google Imágenes
  (sin descargarlas)**, con respaldo automático si el enlace falla; se registran en
  `src/reskin/RESKIN-IMAGES.md` y el skill **avisa al final** de que son provisionales (pueden dejar
  de cargar o tener derechos de autor) e indica cómo reemplazarlas por las del usuario.
- **Todo dentro del proyecto:** efectos y registro de imágenes se guardan en `src/reskin/` (o
  `app/reskin/` sin `src/`), nunca en la carpeta de la skill ni en la raíz del repo.
- **Restiliza los gráficos de terceros** (Recharts, Chart.js…): tooltips, ejes, rejilla y series.
- **Respeta el sistema:** con Tailwind, tokens al theme y utilidades; sin Tailwind, variables CSS.
  Sin paquetes npm nuevos.
- **Referencias por estilo** (`references/style-playbook.md`): a qué se parece, qué buscar, cómo armar el
  héroe, la pieza firma y qué fotos buscar en Google Imágenes.
- **Vista previa** de los 10 estilos en `assets/preview.html?style=aurora&theme=dark`.

## Niveles de intervención

| Nivel | Qué cambia | Ideal para |
|---|---|---|
| **A · Piel** | Clases, CSS y tokens | Proyectos frágiles o si solo quieres color y forma |
| **B · Escena** *(recomendado)* | A + fondo con escena, fuentes, efectos (partículas, scroll, tilt, imán) y un momento firma | Dashboards y apps |
| **C · Completo** | B + piezas decorativas nuevas e imágenes enlazadas y animadas (provisionales) | Landings, portafolios, sitios de marca |

La **lógica de negocio** (datos, estado, API, rutas) nunca se toca en ningún nivel. Las funciones nuevas de diseño
son solo de presentación y solo entran si las apruebas en la entrevista.

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
   No cambies la lógica de negocio, textos ni rutas.
   ```

3. Confirma el stack que detecta y responde las 5 preguntas con el selector.
4. Revisa el brief y elige "Aplicar".
5. Mira el diff: solo clases, CSS y tokens. Ejecuta tu build y revisa 360/768/1280px.

Si no sabes qué estilo elegir, pide "el que recomiendes": la skill propone según el
proyecto.

## Estilos (10)

| Estilo | Cuándo brilla | Temas |
|---|---|---|
| **Glassmorphism** | Dashboards, SaaS, paneles con vidrio suave | oscuro · claro |
| **Liquid Glass** | Chrome flotante premium, sobre imagen o video | oscuro · claro |
| **Brutalism** | Marcas creativas y portafolios: tipografía gigante, sombras duras (mono y pop) | claro · oscuro |
| **Minimalism** | Portafolios, agencias, marcas premium: aire y un acento | claro · oscuro |
| **Claymorphism** | Apps amigables y de estudio: plastilina inflada | claro |
| **Neumorphism** | Paneles de control: relieve suave (cuidado con la accesibilidad) | claro · oscuro |
| **Spatial** | Experiencias premium: paneles de vidrio con profundidad 3D | oscuro · claro |
| **Doodle** | Productividad y educación: hecho a mano, papel y tinta | claro |
| **Aurora** | Landings tech/fintech: gradientes de aurora al estilo Stripe | claro · oscuro |
| **Comic** | Apps con carácter, juegos, eventos y marcas creativas: historieta pop con tinta, puntos y globos | claro · oscuro |

Cada estilo trae tokens (verificados AA), componentes, ficha con ingredientes, errores comunes y
checklist. Los nombres de clase son iguales en todos (`.rs-card`, `.rs-btn`, `.rs-table`…), así
que cambiar de estilo no cambia el marcado.

## Tecnologías

- **Frameworks:** React, Next.js (App Router y Pages Router), HTML/CSS puro.
- **Capa de estilos:** Tailwind CSS v4, Tailwind CSS v3, CSS Modules, CSS puro.
- **Lenguaje:** JavaScript y TypeScript.
- **Sin dependencias nuevas.** No se añaden paquetes ni plugins; las fuentes van por `<link>`/`next/font` y los efectos son vanilla.

## La regla

Solo se tocan **estilos y capas decorativas**: clases, CSS, tokens, escena, tipografía, movimiento, efectos, momentos firma e imágenes provisionales. Nunca
estado, hooks, props, textos, `key`, rutas, fetching, tests, dependencias ni lockfiles. La
guía completa está en `references/rules.md`.

## Estructura

```text
SKILL.md                       flujo, niveles y tabla de carga
references/
  detection.md                 framework, capa de estilos, router, TypeScript, entrypoints
  interview.md                 las 5 preguntas (incluida paleta), recomendación y confirmación
  rules.md                     niveles, límites y accesibilidad
  design-depth.md              puerta anti-genérico (7 ingredientes, regla de los 6)
  effects.md                   destino, partículas, scroll, imán y momentos firma: recetas
  images.md                    imágenes por enlace de Google: respaldo, animación, registro y aviso final
  style-playbook.md            referencias y recetas por estilo (qué buscar, héroe, firma)
  charts-and-widgets.md        gráficos, tooltips y widgets de terceros
  styles/                      10 fichas de estilo
  adapters/                    react, nextjs, html-css, tailwind-v4, tailwind-v3
assets/
  tokens/                      variables CSS por estilo (incluye colores de gráficos)
  components/                  _base.css (estructura compartida) + una hoja por estilo
  effects/                     reskin-fx.js y reskin-fx.css (sin dependencias)
  placeholders/                SVG provisionales para imágenes
  preview.html                 vista previa de los 10 estilos
scripts/detect-stack.sh        detección opcional (bash, sin dependencias)
scripts/check-contrast.js      verificador WCAG de tokens (Node, sin dependencias)
```

## Verificación

```bash
bash -n scripts/detect-stack.sh
bash scripts/detect-stack.sh /ruta/al/proyecto
```

```bash
node scripts/check-contrast.js                      # los 10 estilos
node scripts/check-contrast.js assets/tokens/comic.css
```

El verificador de contraste calcula la relación WCAG de cada par (texto, acento, peligro,
aviso, tooltip, foco y series de gráficos) en cada tema y falla si alguno baja de AA.

El script de detección imprime `framework`, `styling`, `router` y `typescript`. Si no puede ejecutarse,
la skill detecta leyendo `package.json`, los configs y la estructura.

## Prueba visual

```bash
npx serve assets        # y abre /preview.html?style=brutalism&v=pop
```

Cambia `style` (`glassmorphism`, `liquid-glass`, `brutalism`, `minimalism`, `claymorphism`, `neumorphism`, `spatial`, `doodle`, `aurora`, `comic`), `theme` (`dark`/`light`) y `v` (`pop`, solo en brutalism).

## Licencia

Sin licencia definida todavía.
