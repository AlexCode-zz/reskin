# Referencias y recetas por estilo

Cómo se **ve** y cómo se **construye** cada estilo, en un solo lugar. Úsalo en el paso de aplicar:
primero busca la referencia (para no inventar), luego sigue la receta del héroe y de la pieza firma,
y para las imágenes usa las consultas de *Qué buscar en Google Imágenes* (protocolo en `images.md`).

Cómo usar las consultas: pégalas tal cual en Google Imágenes, Pinterest, Dribbble o Behance **como
inspiración visual**; no copies un diseño ajeno. Para imágenes que irán en el código, usa solo las
consultas de la fila *Fotos* y sigue las reglas de URL de `images.md`.

Cada ficha: **Referencia** (a qué se parece) · **Buscar** (inspiración) · **Fotos** (para el código) ·
**Héroe** (composición) · **Firma y efectos** · **Tipografía**.

---

## Glassmorphism
- **Referencia:** paneles de vidrio esmerilado sobre fondo con luz y color (tableros de datos, apps de música, dashboards oscuros).
- **Buscar:** `glassmorphism dashboard ui dark`, `frosted glass card ui dribbble`.
- **Fotos:** `abstract gradient blurred background`, `neon city bokeh night`, `aurora light abstract wallpaper`.
- **Héroe:** titular grande sobre la escena + una tarjeta de vidrio con la métrica o CTA principal, desplazada; 2 orbes de color detrás.
- **Firma y efectos:** `.rs-card--glow` + `data-rs-spot` (foco que sigue al puntero); partículas `orbs`; reveal en cascada.
- **Tipografía:** sans geométrica limpia (Inter / Plus Jakarta Sans), pesos 500–700.

## Liquid Glass
- **Referencia:** vidrio con cuerpo, borde de luz y refracción (interfaces de sistemas operativos recientes).
- **Buscar:** `liquid glass ui design`, `ios glass interface concept`, `translucent specular ui`.
- **Fotos:** `colorful abstract waves`, `soft gradient mesh background`, `glass sphere abstract 3d`.
- **Héroe:** barra flotante de vidrio (píldora) sobre una imagen a pantalla completa; el contenido va sobre otra capa de vidrio con reflejo.
- **Firma y efectos:** reflejo `::after` en `.rs-media`, botón imantado con flecha, `tilt` suave en la tarjeta héroe.
- **Tipografía:** sans de sistema redondeada, pesos 500–650, tracking −0.02em en titulares.

## Brutalism
- **Referencia:** estudios creativos y marcas atrevidas: titular gigante, bloques planos, bordes negros, sombras duras (variante *pop*: lima/amarillo/coral sobre violeta).
- **Buscar:** `neo brutalism web design`, `brutalist website bold typography`, `neubrutalism ui cards`.
- **Fotos:** `black and white architecture concrete`, `industrial texture high contrast`, `street photography monochrome`.
- **Héroe:** `.rs-display` a 9rem ocupando el ancho, foto B/N recortada a un lado, franja `.rs-blocks` debajo.
- **Firma y efectos:** `.rs-ticker`, asterisco `.rs-sticker--asterisk`, reveal `pop`, `parallax` en la foto.
- **Tipografía:** Anton (display, mayúsculas) + Archivo; pop: Space Grotesk 800.

## Minimalism
- **Referencia:** editorial limpio: mucho aire, serif elegante en titulares, un solo acento.
- **Buscar:** `minimalist website design editorial`, `minimal ui whitespace serif`, `swiss style web`.
- **Fotos:** `minimal interior natural light`, `ceramic still life beige`, `soft shadow product photography`.
- **Héroe:** titular serif de 2–3 líneas, mucho margen, una imagen con radio grande y sin borde.
- **Firma y efectos:** número o palabra gigante tenue de fondo; reveal lento (≤ 24px); sin partículas.
- **Tipografía:** Instrument Serif (titular) + Inter (cuerpo).

## Claymorphism
- **Referencia:** plastilina inflada: pasteles saturados, esquinas enormes, sombras internas y externas suaves.
- **Buscar:** `claymorphism ui`, `3d clay icons app design`, `soft 3d inflated ui`.
- **Fotos:** `pastel 3d render abstract shapes`, `clay 3d illustration objects`, `soft colorful balloons`.
- **Héroe:** tarjeta enorme (radio 40px) con ilustración o foto redonda, burbujas de color flotando.
- **Firma y efectos:** partículas `bubbles`, `.rs-float` en iconos, botón que "se infla" al hover.
- **Tipografía:** Baloo 2 (titulares) + Nunito (cuerpo).

## Neumorphism
- **Referencia:** relieve suave en la misma superficie, dos sombras (clara y oscura), sin bordes.
- **Buscar:** `neumorphism ui dashboard`, `soft ui controls`, `skeuomorphic soft buttons`.
- **Fotos:** `soft gray 3d abstract`, `matte plastic minimal`, `smooth gradient gray`.
- **Héroe:** panel de controles (toggles, sliders, dial) hundidos y elevados; pocas imágenes.
- **Firma y efectos:** reveal simple; el relieve ya es el efecto. Avisa de accesibilidad (contraste bajo): usa tinta fuerte en el texto.
- **Tipografía:** Montserrat 500–700.

## Spatial
- **Referencia:** paneles de vidrio flotando con profundidad 3D, sombras largas y reacción al puntero.
- **Buscar:** `spatial ui visionos concept`, `3d glass panels depth ui`, `floating cards parallax design`.
- **Fotos:** `space nebula dark`, `futuristic interior glass`, `night sky stars long exposure`.
- **Héroe:** 3 capas (`.rs-depth-1/2/3`) con parallax distinto; la tarjeta central con `tilt` y foco.
- **Firma y efectos:** `tilt` + `glow`, partículas `stars`, `.rs-card--grabber`.
- **Tipografía:** Inter 400–700, tracking limpio.

## Doodle
- **Referencia:** cuaderno de apuntes: tinta temblorosa, papel con puntos, cinta adhesiva, polaroids.
- **Buscar:** `hand drawn ui doodle`, `notebook sketch website design`, `scrapbook web layout`.
- **Fotos:** `notebook desk flat lay`, `watercolor paper texture`, `hand drawn doodles background`.
- **Héroe:** titular manuscrito con subrayado dibujado, polaroid girada −2° con cinta, estrellas y flechas dibujadas.
- **Firma y efectos:** `.rs-card--taped`, `.rs-media--polaroid`, giros ±1°, partículas `dust`.
- **Tipografía:** Caveat Brush (titulares) + Patrick Hand (cuerpo).

## Aurora
- **Referencia:** gradientes borrosos tipo aurora detrás de una interfaz limpia (landings de fintech y SaaS).
- **Buscar:** `aurora gradient ui landing page`, `mesh gradient saas hero`, `blurred gradient website`.
- **Fotos:** `aurora borealis gradient abstract`, `soft color blur background`, `mesh gradient purple blue`.
- **Héroe:** titular negro apretado sobre banda de aurora (`.rs-aurora-band`), tarjeta con sombra en capas y botón imantado.
- **Firma y efectos:** partículas `orbs`, `spot` + `glow`, `.rs-gradient-text` en una palabra del titular.
- **Tipografía:** Plus Jakarta Sans 500–800, titulares con tracking −0.03em.

## Comic
- **Referencia:** historieta pop: papel crema, entintado negro grueso, trama de puntos (Ben-Day), rótulos en mayúsculas, globos de diálogo y ráfagas de onomatopeya.
- **Buscar:** `comic book ui design`, `pop art website halftone`, `comic panel layout web design`, `speech bubble ui`.
- **Fotos:** `halftone pop art texture`, `comic book city skyline`, `retro comic action background`, `vintage newspaper paper texture`.
- **Héroe:** `.rs-display` amarillo con contorno negro, ráfaga `.rs-burst` ("¡POW!") junto al titular, collage `.rs-panels` de viñetas con la imagen principal en el panel grande y `.rs-speedlines` detrás.
- **Firma y efectos:** `.rs-bubble` (globo) para el mensaje clave, `.rs-caption` (caja de narración) en la tarjeta héroe, `.rs-ticker` inclinada, reveal `pop`; sin partículas (o `confetti` suave en el CTA).
- **Tipografía:** Bangers (titulares, mayúsculas) + Comic Neue (cuerpo).

---

## Cómo combinar referencia y proyecto

1. Elige **una** pieza firma de la ficha y úsala en el héroe o en la tarjeta destacada del proyecto.
2. El resto del estilo va por componentes (`assets/components/<estilo>.css`), no a mano.
3. Si el usuario trae su propia referencia (captura, enlace, nombre de marca), manda esa: mapea sus colores con la tabla de paleta de `interview.md`.
4. Un estilo = una sola pareja tipográfica. No mezcles fichas.
