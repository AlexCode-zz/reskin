# Imágenes (enlace directo · sin descargar)

Las imágenes dan escena y personalidad (landings, héroes, tarjetas, galerías), pero **no son del
usuario**. Se usan **por enlace**: el agente busca en Google Imágenes (o en el buscador que tenga),
copia la **URL directa de la imagen** y la pone en el código. **No se descarga nada** y no se crea
carpeta de imágenes. Todas son provisionales, se registran y el usuario recibe un aviso al final.

## Cuándo se usan

- Si el usuario marcó **imágenes** en la pregunta de funciones nuevas (nivel C), o hay huecos de
  imagen vacíos en el proyecto (nivel B).
- Nunca en nivel A.
- Máximo **1 imagen de héroe + 3–6 de apoyo**. Más no mejora el diseño y alarga la carga.

## Cómo se consigue la URL (paso a paso)

1. **Busca con una consulta concreta** (ver `references/style-playbook.md`, campo *Qué buscar en
   Google Imágenes* de cada estilo). Añade el tema del proyecto: `"estudiantes laboratorio"`,
   `"café de especialidad"`, etc.
2. **Elige resultados grandes y horizontales** (≥ 1200 px de ancho) para el héroe; cuadrados para tarjetas.
3. **Saca la URL del archivo original**, no la de la miniatura de Google:
   - Válida: termina en `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`, o viene de un host de imágenes
     (`images.unsplash.com`, `images.pexels.com`, `cdn.pixabay.com`, `upload.wikimedia.org`).
   - **Descártala** si empieza por `https://encrypted-tbn…gstatic.com` o `https://www.google.com/imgres…`,
     o lleva una firma temporal (`Expires`, `Signature`): son miniaturas o enlaces que caducan.
4. **Verifica que carga** (si el agente tiene terminal y red):
   `curl -sIL -m 8 -A "Mozilla/5.0" "<URL>"` → debe responder `200` y `content-type: image/…`.
   Si da 403, 404, redirección a una página HTML o `content-type: text/html`, **prueba otro resultado**.
   Si no puedes verificar, úsala igual pero márcala `sin verificar` en el registro.
5. **Prefiere** resultados de sitios que permiten enlace directo y uso libre (Unsplash, Pexels, Pixabay,
   Wikimedia). Evita marcas, logos, personas identificables, stickers y capturas con marca de agua.

## Cómo se insertan

Siempre con **respaldo**: si el enlace falla, la página no puede quedar con un hueco roto.

**1. Como `<img>` (elemento nuevo y hermano, decorativo):**

```html
<div class="rs-media rs-img-kb">
  <img src="https://…/foto.jpg" alt="" width="1600" height="900" loading="lazy"
       decoding="async" referrerpolicy="no-referrer" data-rs-img>
</div>
```

- `data-rs-img` activa el **respaldo automático** de `reskin-fx.js`: si el enlace falla, la imagen
  cambia sola a un SVG neutro. Para un respaldo propio: `data-rs-fallback="/ruta/o/data-uri"`.
- `referrerpolicy="no-referrer"` evita que algunos sitios bloqueen el enlace directo.
- `alt=""` si es decorativa; `alt` descriptivo si aporta información.
- Pon siempre `width`/`height` (o `aspect-ratio`) para que no salte el layout.
- En React/Next: `<img … data-rs-img />` normal (en Next, `<img>` y no `next/image`, que exigiría
  configurar dominios remotos en `next.config`). No hacen falta hooks ni handlers.

**2. Como fondo CSS (preferido si ya hay un contenedor, cero DOM nuevo):**

```css
.hero { background-image: url("https://…/foto.jpg"), var(--rs-img-fallback); background-size: cover; }
```

La segunda capa (`--rs-img-fallback`, viene en `reskin-fx.css`) se ve si la primera no carga.

Marca cada imagen para poder encontrarla: comentario `<!-- RESKIN-IMG provisional -->` o `/* RESKIN-IMG */`.

## Imágenes con animación

La imagen se mueve con el estilo. Ken Burns, zoom y sheen son CSS; el reveal necesita `reskin-fx.js`.
Todo se apaga con `prefers-reduced-motion`:

| Clase | Resultado | Cuándo |
|---|---|---|
| `.rs-img-kb` (en el `.rs-media`) | Ken Burns: zoom lento y deriva; se pausa al hover | Héroe o tarjeta destacada |
| `.rs-img-reveal` | La imagen se descubre con cortinilla al entrar en pantalla | Una por vista; nivel C |
| `.rs-media--zoom` | Zoom del 6% al hover/focus | Galerías y tarjetas |
| `data-rs-parallax="0.08"` en el `.rs-media` | La imagen se mueve más despacio que el scroll | Nivel C; nunca junto a `.rs-img-kb` |
| `.rs-sheen` en la tarjeta | Reflejo diagonal al hover | Solo sobre imagen o superficie decorativa |

Reglas: solo `transform`/`scale`/`clip-path`/`opacity`; una imagen informativa no parpadea ni hace zoom
rápido; sobre una imagen animada va el scrim del estilo (`--rs-scrim`) para que el texto siga en AA.

## Tratamiento por estilo (que se vean del estilo, no pegadas)

| Estilo | Tratamiento CSS |
|---|---|
| Brutalism | `grayscale(1) contrast(1.15)`, borde 3px, sombra dura, recorte rectangular |
| Minimalism | `saturate(.85)`, radio grande, mucho espacio alrededor, sin borde |
| Claymorphism | radio 40px, sombra inflada, fondo pastel detrás |
| Neumorphism | marco hundido/elevado con la misma superficie |
| Spatial | marco de vidrio + `translateZ`, sombra larga |
| Doodle | `.rs-media--polaroid`, borde de tinta, giro −2° |
| Aurora | radio 28px, sombra en capas, degradado de aurora detrás |
| Comic | `contrast(1.12) saturate(1.25)`, trama de puntos encima (`.rs-media::after`), borde negro 3px, sombra dura; `.rs-media--slant` para inclinarla |
| Glass / Liquid | borde de luz + reflejo `::after` |

## Registro: `<src>/reskin/RESKIN-IMAGES.md`

Un archivo de texto (no descarga nada) con una tabla: **URL de la imagen** · **página de origen** ·
dónde se usa (archivo y componente) · `alt` · animación aplicada · estado (`verificada` / `sin verificar`).
Sirve para que el usuario encuentre y reemplace cada una.

## Aviso obligatorio al final (texto literal, con los datos reales)

> ⚠️ **Las imágenes de este diseño son enlaces provisionales de internet (Google Imágenes).**
> No están descargadas ni son tuyas: **pueden dejar de cargar sin aviso** (el enlace caduca o el sitio lo
> bloquea; en ese caso se ve una imagen neutra de respaldo) y **pueden tener derechos de autor**. Sirven para
> ver el diseño completo, **no para publicar**.
> Están todas listadas en `<src>/reskin/RESKIN-IMAGES.md` y marcadas en el código con `RESKIN-IMG`.
> Para dejarlas definitivas, sustituye cada URL por una imagen tuya (en `public/` o `assets/`).

## Cómo las reemplaza el usuario (explícalo al final)

1. Abre `RESKIN-IMAGES.md`: ahí está cada URL y dónde se usa.
2. Cambia el `src` (o el `url()` del fondo) por tu imagen. Conserva `width`/`height` o `aspect-ratio`.
3. Cuando no quede ninguna con `RESKIN-IMG`, borra `RESKIN-IMAGES.md`.

## Qué NO hacer

- No descargar imágenes ni crear una carpeta `images/` del reskin: se usan enlaces.
- No usar miniaturas de Google (`encrypted-tbn`, `imgres`) ni URLs con firma temporal.
- No dejar imágenes sin `data-rs-img` (o sin segunda capa de fondo) ni sin registrar.
- No usar personas identificables, logos ni marcas ajenas.
- No meter imágenes en tablas, formularios ni controles.
- No presentar los enlaces como definitivos: siempre el aviso final.
