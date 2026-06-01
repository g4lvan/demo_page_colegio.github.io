const openNoti = document.querySelector(".btn_noti");
const closeNoti = document.querySelector(".close_noti_btn");
const fondoNoti = document.querySelector(".overlay_noti");
const modalNoti = document.querySelector(".noticia_completa")

// * ============================================================
//   MODAL DE NOTICIA DESTACADA
//   Abre y cierra la noticia completa desde la primera card del index.
//   ============================================================

// ? La misma clase .activo se aplica al modal y al overlay.
//    Esto evita duplicar estados visuales entre JS y CSS.
const openCloseNoti = () => {
  modalNoti.classList.toggle("activo");
  fondoNoti.classList.toggle("activo");
};

// ! El modal solo existe en index.html.
//    No cargar este script en paginas que no tengan .btn_noti y .noticia_completa.
openNoti.addEventListener("click", openCloseNoti)
closeNoti.addEventListener("click", openCloseNoti)
fondoNoti.addEventListener("click", openCloseNoti)
