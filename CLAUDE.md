# Sitio de Panorama Universal

Sitio en español rioplatense (voseo) de Panorama Universal. Producción: https://panorama-web-kappa.vercel.app

## Stack y deploy

- Next.js 16 (App Router, `params` es una Promise, páginas estáticas con `generateStaticParams`), React 19, Tailwind v4 (colores en `@theme`: `tierra`, `tierra-suave`, `crema`, `oro`, `oro-claro`), TypeScript. Fuentes Poppins y Lora.
- Repo `panoramauniversal/panorama-web`, rama `main`. Cada push a `main` se publica en Vercel.
- Vercel a veces no registra el push (sin estado en el commit). Si a los ~5 min no hay estado, hacer un commit vacío y volver a pushear. Verificar siempre el sitio publicado con `curl`.
- Antes de pushear: `npm run build`.

## Contenido y dónde se edita

- `app/content.ts`: textos de la portada, redes, links (`formularioVoluntariado`, `formularioEscribir` vacío hasta que haya formulario), menú.
- `app/equipo.ts`: áreas e integrantes (nombre, cargo, bio, foto, linkedin, instagram). Fotos en `public/equipo/`, cuadradas 600×600 y centradas en la cara.
- `content/notas/*.md`: una nota por archivo, con encabezado `titulo`, `fecha` (AAAA-MM-DD), `autores` (separados por `,`, ` y ` o ` e `), `colaboracion` (opcional), `resumen`. Cuerpo con `## subtítulos`, párrafos, `**negrita**`, `*cursiva*`.
- `app/voluntarios.ts`: voluntarios (nombre, área, foto/redes opcionales). Se ven en `/equipo/voluntariado/voluntarios`, solo enlazada desde el botón "Nuestros voluntarios" de Voluntariado.
- `app/notas/autores.ts`: redes de cada autor por nombre (`redesAutores`). La búsqueda ignora tildes.
- Páginas: portada (`app/page.tsx`: inicio, últimas notas, quiénes somos, por qué, qué hacemos, comunidad, sumate), `/notas`, `/notas/[slug]`, `/notas/autores`, `/notas/autores/[slug]`, `/equipo`, `/equipo/[slug]`, `/equipo/voluntariado`, `/equipo/voluntariado/voluntarios`. En `/notas` se ve un año por vez (pestañas por año, `#2024` en la dirección).

## Decisiones ya tomadas

- No mencionar que Panorama es una asociación civil ni incluir la "palabra del presidente".
- No hay sección de pilares (se eliminó).
- Notas: cada una lleva una imagen de portada (`imagen`, `credito`, `creditoUrl` en el encabezado; archivo en `public/notas/<slug>.webp`, 1200×675, ~100 KB). Solo imágenes de uso libre (Wikimedia Commons, dominio público, CC0, CC BY, CC BY-SA), nunca las placas de Instagram ni fotos de medios. Las notas de Substack no se cargan.
- `<html data-scroll-behavior="smooth">` es necesario para que Next no deje la página a mitad de scroll al navegar.
- Bios de equipo y voluntarios: no repetir el cargo ni el área de Panorama (ya figuran en la tarjeta). Largo parecido entre todas.
- El autor de cada nota sale del cronograma. Si no figura, preguntar en vez de firmar como "Equipo Panorama Universal".

## Pendientes

- Imágenes de notas: se cargan por tandas desde la más nueva hacia atrás. Al terminar todas, revisión general con el equipo.

- Voluntarios: cargados Comunicación y Diseño, Académica y Lucia Sol Martin (Asuntos Institucionales y Proyectos). Faltan el resto de las secretarías. Si el nombre de firma de notas difiere, usar el campo `autor`.

- Vincular el botón "¿Querés escribir en Panorama?" cuando exista el formulario.
- Autores sin ninguna red: Julián Arce, Karina Herrera, Kevin Bryan, Maximiliano Buteler, Nahuel Nores (planilla "Autores sin redes - Notas Panorama" en el Drive).
- Notas para revisar por tener versión extensa o borradores en el documento: Motosierra en Vietnam, Caos en Nepal, Alianza China–Corea–Japón, Reunión OCS, Tercera Era Nuclear, Artemis II, Acuerdo Argentina–EEUU.
- Fuente de las notas: hoja "Cronograma y temáticas abordadas" en el Drive (cada fila enlaza al documento de la publicación).
