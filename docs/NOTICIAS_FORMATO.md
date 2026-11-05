# Formato de `data/noticias.json` — fuente única de noticias

Este archivo es la **única fuente de verdad** de las noticias del sitio. Una
sola entrada alimenta:

- Las **cards** del index (`.ult_noticias`) y del listado de
  `pages/noticias.html` (`.lista_noticias`) — renderizadas por `js/noticias.js`.
- Las **modales de noticia completa** (`modal-<slug>`) en ambas páginas —
  conectadas por `js/noti.js` mediante el atributo `data-modal`.

Cuando exista backend, un endpoint que produzca este mismo formato (o un
subconjunto con este esquema) mantendrá el sitio funcionando sin cambios.

## Esquema de una noticia

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | número | ✔ | Identificador único y estable. Ordena el listado (mayor a menor = más reciente primero). |
| `slug` | string | ✔ | Etiqueta corta única, minúsculas, sin espacios ni acentos. Genera el vínculo con la modal: `modal-<slug>`. Ej.: `"olimpiadas"`. |
| `tipo` | string | ✔ | Etiqueta del badge de la card y de la modal. Valores hoy: `"Logro Emilista"`, `"Evento Institucional"`, `"Comunidad Emilista"`. |
| `titulo` | string | ✔ | Título completo (usado en card y modal). |
| `resumen` | string | ✔ | Texto corto de la card (1–3 frases). **No se repite dentro de `contenido`.** |
| `imagen` | string | ✔ | Ruta relativa a la raíz del proyecto con prefijo `../` (funciona desde `index.html` y desde `pages/` por igual). Ej.: `"../assets/images/x.jpg"`. |
| `alt` | string | ✔ | Texto alternativo de la imagen (accesibilidad). |
| `fecha` | string | ✔ | ISO 8601 `YYYY-MM-DD`. Se muestra en español desde `js/noticias.js` (`es-CO`). |
| `autor` | string | ✔ | Firma de la noticia (byline en la modal). |
| `contenido` | array | ✔ | El **artículo completo**, en orden de lectura. Ver abajo. |

## El array `contenido`

Cada elemento del array es una **pieza de contenido**, en el orden exacto en
que se renderiza dentro de la modal:

1. **Párrafo** — un string plano:

   ```json
   "La comunidad educativa celebra con orgullo el logro alcanzado…"
   ```

2. **Cita destacada (`<blockquote>`)** — un objeto con dos claves:

   ```json
   {
     "cita": "Este logro refleja el talento…",
     "autor_cita": "Rectoría, I.E.M. Emilio Cifuentes"
   }
   ```

   - La comilla inicial `«`/`"` y el guion del autor (`- `) se agregan en el
     render (template), **no** se guardan en el dato.
   - Se puede usar 0, 1 o varias citas por noticia, en cualquier posición.

Esta decisión permite al backend enviar noticias con cualquier combinación de
párrafos y citas sin cambiar el front. Si en el futuro se necesitan piezas
nuevas (subtítulos, listas, imágenes dentro del cuerpo), se agregan como
nuevos tipos de objeto con una clave `"tipo"` interna — los strings existentes
siguen siendo párrafos, así nada se rompe.

## Reglas para crear una noticia nueva

1. `id` = máximo existente + 1.
2. `slug` único y descriptivo (se usa en `data-modal` y en URLs futuras).
3. `resumen` ≠ primer párrafo: el resumen es el gancho de la card; el
   `contenido` desarrolla la historia completa.
4. La imagen debe existir en `../assets/images/` y reflejar el evento real.
5. No reutilizar copys de otras noticias sin editar.

## NOTA sobre la migración a Astro

El JSON ya está diseñado para ser una content collection de Astro: cada objeto
de noticia sería un entry y `contenido` se mapearía 1:1 con componentes
`<p>` / `<blockquote>` (o con un renderer de content collection). Los campos
no cambian.
