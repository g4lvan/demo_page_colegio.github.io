// * ============================================================
//   UTILIDAD COMPARTIDA — Rutas de datos e imágenes
//   Las rutas del JSON (ej. "../assets/images/x.jpg") se resuelven
//   desde el archivo del que provienen (data/noticias.json), no
//   desde el HTML que las consume.
//   ============================================================

// ? ¿Por qué así: en GitHub Pages el sitio vive en un subdirectorio
//   (g4lvan.github.io/demo_page_colegio.github.io/). Una ruta relativa
//   puesta tal cual en un <img src> se resuelve contra la página:
//   en index.html el "../" "sale" del subdirectorio del repo y la
//   imagen queda en 404. Resolver contra el propio módulo (que vive
//   en js/, dentro del repo) ancla la ruta al sitio en el archivo
//   y funciona igual en local, en pages/ y en Pages.
// ? Compatible con backend: si el día de mañana `imagen` guarda una
//   URL absoluta (ej. Supabase Storage), new URL la devuelve intacta.

const URL_JSON = new URL("../data/noticias.json", import.meta.url);

export const URL_DATOS = URL_JSON;

export function resolverRuta(imagen) {
  return new URL(imagen, URL_JSON).href;
}
