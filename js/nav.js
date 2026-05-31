const botonH = document.querySelector(".menu_hb");
const closeH = document.querySelector(".close_nav");
const menuH = document.querySelector(".panel_lateral");
const fondo = document.querySelector(".overlay");

const menuOpenClose = () => {
  menuH.classList.toggle("activo");
  fondo.classList.toggle("activo");
};

botonH.addEventListener("click", menuOpenClose);
closeH.addEventListener("click", menuOpenClose);
fondo.addEventListener("click", menuOpenClose);
