// * ============================================================
//   NOTICIAS DESDE JSON
//   Fuente única: data/noticias.json. Rende cards en el index
//   (.ult_noticias) y en el listado de noticias.html
//   (.lista_noticias) con el mismo contenido.
//   ============================================================

// ? Ruta resuelta desde el propio módulo (no desde el HTML): un
//   fetch relativo simple ("data/..." o "../data/...") dejaría de
//   funcionar según la página que cargue el script. new URL(..)
//   resuelve la raíz del proyecto desde js/, igual que un path
//   sería gestionado por un bundler/Astro en el futuro.
const URL_NOTICIAS = new URL("../data/noticias.json", import.meta.url);

// ? data-modal une la card con su modal: js/noti.js lee este
//   atributo para abrir el modal de plantilla "modal-noticia".
import { formatearFecha } from "./fecha.js";
function crearNoticia(noticia, variante) {
  // ? El index y el listado de noticias comparten el contenido,
  //   pero cada página tiene su propia clase de card ya estilada:
  //   compacta = .card_noticias (index), lista = .card_noticia_lista.
  const esLista = variante === "lista";
  const claseCard = esLista ? "card_noticia_lista" : "card_noticias";
  const claseImg = esLista ? "card_noticia_lista__img" : "card_img";
  const claseContent = esLista
    ? "card_noticia_lista__content"
    : "card_content";

  return `<article class="${claseCard}">
            <div class="${claseImg}">
              <span class="type_noti">${noticia.tipo}</span>
              <img
                src="${noticia.imagen}"
                alt="${noticia.alt}"
              />
            </div>
            <div class="${claseContent}">
              <div class="info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="time_noti_icon"
                >
                  <path
                    d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 8h-14v8.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16zm-9 4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z"
                  />
                </svg>
                <time datetime="${noticia.fecha}">${formatearFecha(noticia.fecha)}</time>
              </div>
              <h3>${noticia.titulo}</h3>
              <p>
                ${noticia.resumen}
              </p>
              <button class="btn_noti" data-modal="modal-${noticia.slug}">
                Leer Articulo
              </button>
            </div>
          </article>`;
}

async function pedirNoticias() {
  // ? Punto de montaje: el index y el listado de noticias usan
  //   contenedores distintos; si la página no tiene ninguno, no
  //   hay nada que renderizar (no falla en otras páginas).
  const destino =
    document.querySelector(".ult_noticias") ??
    document.querySelector(".lista_noticias");
  if (!destino) return;

  try {
    const response = await fetch(URL_NOTICIAS);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const noticias = await response.json();
    const variante = destino.classList.contains("lista_noticias")
      ? "lista"
      : "compacta";
    destino.innerHTML = noticias.map((n) => crearNoticia(n, variante)).join("");
  } catch (error) {
    console.error("No se pudieron cargar las noticias:", error);
  }
}
pedirNoticias();
