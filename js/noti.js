const fondoNoti = document.querySelector(".overlay_noti");

// * ============================================================
//   MODAL DE NOTICIA
//   Abre y cierra la noticia completa desde cualquier card.
//   ============================================================

// ? Delegación de eventos: el listener vive en document, no en
//   cada boton. Así los .btn_noti creados después de la carga
//   (cards dinámicas del index con data/noticias.json) también
//   funcionan sin necesidad de re-vincular listeners.
// ? data-modal es el único vinculo card-modal: el botón con
//   data-modal="modal-olimpiadas" abre #modal-olimpiadas.
//   En Astro este patrón se mantiene igual dentro del componente.
// ? Sin prefijo .btn_noti en el selector: cualquier elemento con
//   data-modal abre su modal. Las cerrar y el overlay cierran
//   todas las modales activas a la vez.

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
      const modal = document.querySelector(`#${botonAbrir.dataset.modal}`);
      if (modal) {
        modal.classList.add("activo");
        fondoNoti.classList.add("activo");
      } else {
        console.warn(`Modal no encontrada: #${botonAbrir.dataset.modal}`);
      }
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
