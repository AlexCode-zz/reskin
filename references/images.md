# Imágenes (nivel C · protocolo obligatorio)

Las imágenes dan escena y personalidad (landings, héroes, tarjetas destacadas), pero **no son del
usuario**. El skill las trata como **provisionales**: se usan para que el diseño se vea completo,
se registran una por una y el usuario recibe un aviso claro al final.

## Cuándo se usan

- Nivel **C · Completo** (landings, portafolios, sitios de marca) o si el brief pide imágenes.
- Nunca en nivel A. En nivel B solo si el proyecto ya tiene espacios de imagen vacíos.
- Máximo **1 imagen de héroe + 3–6 de apoyo**. Más no mejora el diseño.

## De dónde salen

1. **Búsqueda web / de imágenes del agente** (Google u otro buscador): es lo que el usuario pidió.
   Prefiere resultados de bancos con licencia libre (Unsplash, Pexels, Pixabay) y evita copias de
   marcas, personas reconocibles o capturas con marca de agua.
2. Si hay red, **descarga una copia local** (`public/reskin-placeholders/` o `src/assets/reskin-placeholders/`)
   en vez de enlazar en caliente: los enlaces externos se rompen y el sitio queda con huecos.
3. Si no hay red ni buscador: usa placeholders de `assets/placeholders/*.svg` (formas y gradientes con los tokens del estilo)
   o un degradado CSS. Díselo al usuario.

## Tratamiento por estilo (que se vean del estilo, no pegadas)

| Estilo | Tratamiento CSS |
|---|---|
| Brutalism | `grayscale(1) contrast(1.15)`, borde 3px, sombra dura, recorte rectangular |
| Minimalism | `saturate(.85)`, radio grande, mucho espacio alrededor, sin borde |
| Claymorphism | radio 40px, sombra inflada, fondo pastel detrás |
| Neumorphism | marco hundido/elevado con la misma superficie |
| Spatial | marco de vidrio + `translateZ`, sombra larga |
| Doodle | `.rs-media--polaroid`, borde de tinta, giro −2° |
| Y2K | marco biselado (`.rs-media` con padding 3px), ventana alrededor |
| Aurora | radio 28px, sombra en capas, degradado de aurora detrás |
| Retro | `image-rendering: pixelated`, scanlines encima, borde duro |
| Glass / Liquid | borde de luz + reflejo `::after` |

## Cómo se insertan (sin tocar lógica)

1. Preferido: `background-image` en un contenedor existente (cero DOM nuevo).
2. Si hace falta elemento: **uno nuevo y hermano**, decorativo: `<img src="…" alt="" loading="lazy" width="…" height="…">`
   dentro de un `.rs-media`. Si la imagen aporta información, `alt` descriptivo.
3. Cada imagen lleva un comentario o atributo que la marque:
   `<!-- RESKIN-IMG provisional: reemplazar -->` / `data-rs-img="placeholder"` (o `/* RESKIN-IMG */` en CSS).
4. Pesos: ≤ 200 KB, ancho ≤ 1600 px, WebP/AVIF si el proyecto ya los usa.

## Registro: `RESKIN-IMAGES.md` en la raíz del proyecto

Una tabla con: archivo local o URL · dónde se usa (archivo y componente) · tamaño recomendado ·
página de origen · licencia si se conoce. Es lo que el usuario usa para reemplazarlas.

## Aviso obligatorio al final (texto literal, adaptado a los datos reales)

> ⚠️ **Las imágenes de este diseño son provisionales y salen de internet (Google/bancos de imágenes).**
> No son tuyas y pueden tener derechos de autor: sirven para ver el diseño completo, **no para publicar**.
> Cámbialas por imágenes propias. Están todas listadas en `RESKIN-IMAGES.md` y marcadas en el código con `RESKIN-IMG`.
> (Busca `RESKIN-IMG` en el proyecto para encontrarlas.)

Si el skill no pudo conseguir imágenes reales: "No pude descargar imágenes; usé placeholders. Pon las tuyas en …".

## Qué NO hacer

- No usar imágenes de personas identificables, logos ni marcas ajenas.
- No dejar imágenes sin registrar ni sin el aviso final.
- No hotlinkear páginas que bloquean enlaces directos ni URLs de resultados de Google (caducan).
- No meter imágenes en tablas, formularios ni controles.
