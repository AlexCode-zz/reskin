# Imágenes (nivel C · protocolo obligatorio)

Las imágenes dan escena y personalidad (landings, héroes, tarjetas destacadas), pero **no son del
usuario**. El skill las trata como **provisionales**: se usan para que el diseño se vea completo,
se registran una por una y el usuario recibe un aviso claro al final.

## Cuándo se usan

- Nivel **C · Completo** (landings, portafolios, sitios de marca) o si el brief pide imágenes.
- Nunca en nivel A. En nivel B solo si el proyecto ya tiene espacios de imagen vacíos.
- Máximo **1 imagen de héroe + 3–6 de apoyo**. Más no mejora el diseño.

## Destino (igual que los efectos)

| Qué | Dónde |
|---|---|
| Archivos descargados | `<src>/reskin/images/` (`src/reskin/images/` si el proyecto tiene `src/`) |
| Registro | `<src>/reskin/RESKIN-IMAGES.md` |

Nunca en la carpeta de la skill, nunca sueltas en la raíz del repo. Si el proyecto ya tiene su
propia carpeta de assets (`src/assets/`, `public/images/`), puedes reutilizarla **solo** si el
usuario lo pide; por defecto `src/reskin/images/` para que todo lo del reskin se borre o reemplace
de una vez. Ver `effects.md § Destino`.

## De dónde salen

1. **Búsqueda web / de imágenes del agente** (Google Images u otro buscador): es lo que el usuario
   pidió. Busca con filtro de licencia (Creative Commons / uso libre) y prefiere Unsplash, Pexels,
   Pixabay o Wikimedia. Evita marcas, personas identificables, stickers de WhatsApp y capturas con
   marca de agua. Anota la página de origen de cada una para el registro.
2. Si hay red, **descarga una copia local** a `<src>/reskin/images/` (nombre en kebab-case:
   `hero-aurora.webp`) en vez de enlazar en caliente: los enlaces de Google caducan y el sitio queda
   con huecos.
3. Si no hay red ni buscador: usa placeholders de `assets/placeholders/*.svg` (formas y gradientes
   con los tokens del estilo) o un degradado CSS, guárdalos en la misma carpeta y díselo al usuario.

## Imágenes con animación

La imagen no es un adorno pegado: se mueve con el estilo. Ken Burns, zoom y sheen son CSS; el reveal
necesita `reskin-fx.js` (usa su observer de scroll). Todo se apaga con `prefers-reduced-motion`:

| Clase | Resultado | Cuándo |
|---|---|---|
| `.rs-img-kb` (en el `.rs-media`) | Ken Burns: zoom lento y deriva; se pausa al hover | Héroe o tarjeta destacada (B y C) |
| `.rs-img-reveal` | La imagen se descubre con cortinilla al entrar en pantalla | Una por vista; nivel C |
| `.rs-media--zoom` | Zoom del 6% al hover/focus | Galerías y tarjetas (B y C) |
| `data-rs-parallax="0.08"` en el `.rs-media` | La imagen se mueve más despacio que el scroll | Nivel C; nunca con `.rs-img-kb` en el mismo elemento |
| `.rs-sheen` en la tarjeta | Reflejo diagonal que cruza al hover | Nivel B/C; solo sobre imagen o superficie decorativa, no sobre texto |

Reglas:

- Solo `transform`/`scale`/`clip-path`/`opacity`: nada de animar `width`, `height`, `filter` ni `top`.
- La imagen informativa no se anima de forma que dificulte leerla (nada de parpadeos ni zooms rápidos).
- Si el proyecto ya tiene video, `autoplay muted loop playsinline` es aceptable como imagen de héroe
  siempre que haya `poster` y se pause con reduced motion; no añadas video nuevo.
- Encima de la imagen animada, el scrim del estilo (`--rs-scrim`) para que el texto siga en AA.

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

## Registro: `<src>/reskin/RESKIN-IMAGES.md`

Una tabla con: archivo local · dónde se usa (archivo y componente) · tamaño recomendado · página
de origen · licencia si se conoce · clase de animación aplicada. Es lo que el usuario usa para
reemplazarlas. El archivo vive junto a las imágenes para que todo lo provisional se borre de una vez.

## Cómo las reemplaza el usuario (explícalo al final)

1. Guarda tus imágenes en la misma carpeta (`<src>/reskin/images/`) **con el mismo nombre**: el
   código sigue funcionando sin tocar imports ni CSS.
2. O cambia la ruta en el código y borra el archivo descargado; deja de llevar `RESKIN-IMG`.
3. Mantén las proporciones (`aspect-ratio` o `width`/`height`) para que no salten las tarjetas.
4. Borra `RESKIN-IMAGES.md` cuando ya no queden provisionales.

## Aviso obligatorio al final (texto literal, adaptado a los datos reales)

> ⚠️ **Las imágenes de este diseño son provisionales y salen de internet (Google/bancos de imágenes).**
> No son tuyas y pueden tener derechos de autor: sirven para ver el diseño completo, **no para publicar**.
> Cámbialas por imágenes propias: están en `<src>/reskin/images/`, todas listadas en
> `<src>/reskin/RESKIN-IMAGES.md` y marcadas en el código con `RESKIN-IMG`.
> Guarda las tuyas con el mismo nombre en esa carpeta y el diseño las usará sin tocar el código
> (y borra `src/reskin/images/` cuando ya no quede ninguna provisional).

Si el skill no pudo conseguir imágenes reales: "No pude descargar imágenes; usé placeholders. Pon
las tuyas en `<src>/reskin/images/` con estos nombres: …".

## Qué NO hacer

- No usar imágenes de personas identificables, logos ni marcas ajenas.
- No dejar imágenes sin registrar ni sin el aviso final.
- No hotlinkear páginas que bloquean enlaces directos ni URLs de resultados de Google (caducan).
- No meter imágenes en tablas, formularios ni controles.
- No animar una imagen informativa sin pausa ni con movimiento que impida leerla.
