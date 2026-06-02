const botonesAbrir = document.querySelectorAll(".btn_noti");
const botonesCerrar = document.querySelectorAll(".close_noti_btn");
const fondoNoti = document.querySelector(".overlay_noti");

// * ============================================================
//   MODAL DE NOTICIA DESTACADA
//   Abre y cierra la noticia completa desde la primera card del index.
//   ============================================================

if (botonesAbrir.length > 0 && botonesCerrar.length > 0 && fondoNoti) {
  botonesAbrir.forEach((boton) => {
    boton.addEventListener("click", () => {
      const idModal = boton.dataset.modal;
      const modal = document.querySelector(`#${idModal}`);
      modal.classList.add("activo");
      fondoNoti.classList.add("activo");
    });
  });

  const cerrarTodo = () => {
    document.querySelectorAll(".noticia_completa.activo").forEach((m) => {
      m.classList.remove("activo");
    });
    fondoNoti.classList.remove("activo");
  };

  botonesCerrar.forEach((boton) => {
    boton.addEventListener("click", cerrarTodo);
  });

  fondoNoti.addEventListener("click", cerrarTodo);
}
