const openNoti = document.querySelector(".btn_noti");
const closeNoti = document.querySelector(".close_noti_btn");
const fondoNoti = document.querySelector(".overlay_noti");
const modalNoti = document.querySelector(".noticia_completa")

const openCloseNoti = () => {
  modalNoti.classList.toggle("activo");
  fondoNoti.classList.toggle("activo");
};

openNoti.addEventListener("click", openCloseNoti)
closeNoti.addEventListener("click", openCloseNoti)
fondoNoti.addEventListener("click", openCloseNoti)
