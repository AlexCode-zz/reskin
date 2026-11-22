# Gráficos y widgets de terceros

Las librerías pintan con sus propios estilos: tooltip blanco, ejes grises, colores por
defecto. Es **lo primero que desentona** tras un reskin. Se restilizan siempre, solo con
colores y CSS (sin tocar datos, props de lógica ni dependencias).

## Tokens que usan

Definidos en `assets/tokens/<estilo>.css`:

| Token | Uso |
|---|---|
| `--rs-chart-1` … `--rs-chart-5` | Series (barras, líneas, sectores). Todos ≥ 4.5:1 sobre el fondo |
| `--rs-chart-grid` | Rejilla y ejes |
| `--rs-chart-axis` | Texto de ejes y leyendas (= `--rs-ink-muted`) |
| `--rs-tooltip-bg` | Fondo opaco de tooltips |

Asigna las series en orden y **mantén el mismo color para el mismo concepto** en todo el
dashboard (barras, montos, badges). Ejemplo: ingresos = `chart-1`, gastos = `chart-2`.

## Recharts (React)

1. **Tooltip, ejes, rejilla, leyenda:** ya están cubiertos por la sección 11 de
   `assets/components/<estilo>.css`. Envuelve el gráfico con la clase `rs-chart` (en el
   contenedor que ya existe; si no hay, ponla en la card que lo contiene).
2. **Colores de serie:** cambia solo el valor del color. Los atributos SVG aceptan variables CSS:

   ```jsx
   // Antes
   <Bar dataKey="ingresos" fill="#00ffa3" />
   // Después (misma prop, solo el valor)
   <Bar dataKey="ingresos" fill="var(--rs-chart-1)" />
   ```

3. **Sectores de una dona/pie:** `<Cell fill={...}>` conserva su `key` y su orden; solo cambia el color
   (`var(--rs-chart-1)`, `var(--rs-chart-2)`…). Si hay más de 5 categorías, repite colores en
   orden y apóyate en el badge/leyenda con texto.
4. **Tooltip con `contentStyle` o `style` inline:** la regla CSS usa `!important` justo para
   eso. Es el único `!important` permitido. Si ya hay `contentStyle`, cambia sus valores a
   tokens en lugar de añadir otro mecanismo.
5. **No** cambies `dataKey`, `data`, formatters, `Legend`/`Tooltip` condicionales ni el orden de hijos.

## Chart.js, ApexCharts, ECharts (canvas)

El canvas no lee variables CSS. Lee los tokens en JS y pásalos a las opciones **existentes**:

```js
const css = getComputedStyle(document.documentElement);
const token = (name) => css.getPropertyValue(name).trim();
// ticks: { color: token('--rs-chart-axis') }, grid: { color: token('--rs-chart-grid') }
// datasets: backgroundColor: token('--rs-chart-1')
```

Si el proyecto cambia de tema en caliente, vuelve a leer los tokens al cambiar. Solo toca
opciones de color y fuente; nada de datos ni callbacks.

El tooltip del canvas también pinta por su cuenta: pásale tokens a las opciones que ya
existen (`backgroundColor: token('--rs-tooltip-bg')`, `titleColor`/`bodyColor`:
`token('--rs-ink')`, `borderColor: token('--rs-glass-border')`). Si el proyecto usa un
tooltip HTML externo, aplícale la clase `rs-tooltip`.

## Otros widgets

| Widget | Cómo restilizar |
|---|---|
| `<select>` nativo | `.rs-select` + `color-scheme` y `option { background; color }` |
| Date pickers (react-datepicker, etc.) | Variables o clases del propio widget; si no hay, CSS sobre sus clases `.react-datepicker__*`, dentro del CSS existente |
| Toasts (sonner, react-hot-toast) | `toastOptions.style/className` o sus variables CSS; equivalente a `.rs-toast` |
| shadcn/ui, MUI, Chakra | Ver `rules.md` §2: `cva`, `sx`, theme. No reemplaces componentes |
| Mapas, editores, iframes | No se restilizan por dentro. Márcalo en el resumen como fuera de alcance |

## Checklist de gráficos

- [ ] Tooltip sin fondo blanco, con borde y fuente del estilo.
- [ ] Ejes, leyenda y etiquetas con contraste ≥ 4.5:1 (usan `--rs-chart-axis`).
- [ ] Series con tokens `--rs-chart-*`, mismo color para el mismo concepto.
- [ ] Rejilla visible pero sutil (`--rs-chart-grid`).
- [ ] La información no depende solo del color: leyenda con texto o valores visibles.
- [ ] Datos, props y lógica del gráfico intactos (`git diff` solo muestra colores/clases).
