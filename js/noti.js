const fondoNoti = document.querySelector(".overlay_noti");

// * ============================================================
//   MODAL DE NOTICIA
//   Una sola modal "plantilla" por página (#modal-noticia), poblada
//   desde data/noticias.json al hacer clic en cualquier card.
//   ============================================================

// ? La única relación card→noticia sigue siendo data-modal="modal-<slug>":
//   se lee el slug del atributo, se busca en el JSON y la plantilla se
//   llena justo antes de mostrarse. El HTML ya NO conserva el contenido
//   de las noticias (fuente única: el JSON, ver docs/NOTICIAS_FORMATO.md).
// ? textContent para párrafos y citas: nunca innerHTML con datos del
//   JSON (blindaje básico si backend público expone contenido ajeno).
// ? Caché de la petición: la primera apertura le el JSON; las siguientes
//   abren instantáneamente sin repetir la solicitud de red.
// ? Con backend, pedirNoticias apuntará al endpoint de noticias y el
//   resto del flujo no cambia.

import { formatearFecha } from "./fecha.js";

const URL_NOTICIAS = new URL("../data/noticias.json", import.meta.url);
const ID_PLANTILLA = "modal-noticia";

let cacheNoticias = null;
let peticionEnCurso = null;

function pedirNoticias() {
  if (cacheNoticias) return Promise.resolve(cacheNoticias);
  if (!peticionEnCurso) {
    peticionEnCurso = fetch(URL_NOTICIAS)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((noticias) => {
        cacheNoticias = noticias;
        return cacheNoticias;
      });
  }
  return peticionEnCurso;
}

function poblarModal(noticia) {
  const modal = document.getElementById(ID_PLANTILLA);
  if (!modal) return null;

  // ? La foto del header llega por variable CSS (styles.css define el
  //   gradiente y consume --imagen-noticia): la ruta del JSON es igual
  //   a la que usan las cards, así ambas páginas la resuelven bien.
  modal.style.setProperty("--imagen-noticia", `url("${noticia.imagen}")`);

  modal.querySelector(".type_noti_complete").textContent = noticia.tipo;
  modal.querySelector("header h2").textContent = noticia.titulo;

  const fecha = modal.querySelector(".time_noti_complete time");
  fecha.setAttribute("datetime", noticia.fecha);
  fecha.textContent = formatearFecha(noticia.fecha);

  modal.querySelector(".autor_noti_complete p").textContent = noticia.autor;

  const cuerpo = modal.querySelector(".contenido_noti_completo");
  cuerpo.innerHTML = ""; // limpia el render de una noticia anterior
  for (const pieza of noticia.contenido) {
    if (typeof pieza === "string") {
      const parrafo = document.createElement("p");
      parrafo.textContent = pieza;
      cuerpo.append(parrafo);
    } else {
      const cita = document.createElement("blockquote");
      cita.append(document.createTextNode(`“${pieza.cita}” `));
      const autor = document.createElement("span");
      autor.className = "autor_cita";
      autor.textContent = `- ${pieza.autor_cita}`;
      cita.append(autor);
      cuerpo.append(cita);
    }
  }
  return modal;
}

if (fondoNoti) {
  const cerrarTodo = () => {
    document.querySelectorAll(".noticia_completa.activo").forEach((modal) => {
      modal.classList.remove("activo");
    });
    fondoNoti.classList.remove("activo");
  };

  document.addEventListener("click", (event) => {
    const botonAbrir = event.target.closest("[data-modal]");
    if (botonAbrir) {
      const modal = document.getElementById(ID_PLANTILLA);
      if (!modal) {
        console.warn(`Plantilla #${ID_PLANTILLA} no está en el HTML.`);
        return;
      }
      pedirNoticias()
        .then((noticias) => {
          const slug = botonAbrir.dataset.modal.replace(/^modal-/, "");
          const noticia = noticias.find((item) => item.slug === slug);
          if (!noticia) {
            console.warn(`Noticia no encontrada: ${botonAbrir.dataset.modal}`);
            return;
          }
          const modalLlena = poblarModal(noticia);
          if (modalLlena) {
            modalLlena.classList.add("activo");
            fondoNoti.classList.add("activo");
          }
        })
        .catch((error) =>
          console.error("No se pudo abrir la noticia:", error)
        );
      return;
    }

    if (event.target.closest(".close_noti_btn")) {
      cerrarTodo();
      return;
    }

    if (event.target === fondoNoti) {
      cerrarTodo();
    }
  });
}
