const botonH = document.querySelector(".menu_hb");
const closeH = document.querySelector(".close_nav");
const menuH = document.querySelector(".panel_lateral");
const fondo = document.querySelector(".overlay");

// * ============================================================
//   NAVEGACION MOBILE
//   Alterna el panel lateral y su overlay usando la misma clase de estado.
//   ============================================================

if (botonH && closeH && menuH && fondo) {
  // ? Una sola funcion controla apertura y cierre.
  //Mantiene sincronizadas las clases .activo del panel y del fondo.
  const menuOpenClose = () => {
    menuH.classList.toggle("activo");
    fondo.classList.toggle("activo");
  };

  botonH.addEventListener("click", menuOpenClose);
  closeH.addEventListener("click", menuOpenClose);
  fondo.addEventListener("click", menuOpenClose);
}
