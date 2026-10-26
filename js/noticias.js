const contenedor = document.querySelector(".ult_noticias");

if (contenedor) {
  function crearNoticia(noticia) {
    return `<article class="card_noticias">
            <div class="card_img">
              <span class="type_noti">${noticia.tipo}</span>
              <img
                src="${noticia.imagen}"
                alt="${noticia.alt}"
              />
            </div>
            <div class="card_content">
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
                <time datetime="${noticia.fecha}">${noticia.fecha}</time>
              </div>
              <h3>${noticia.titulo}</h3>
              <p>
                ${noticia.resumen}
              </p>
              <button class="btn_noti">
                Leer Articulo
              </button>
            </div>
          </article>`;
  }

  async function pedirNoticias() {
    try {
      const response = await fetch("data/noticias.json");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const noticias = await response.json();
      const pintar = noticias.map(crearNoticia);
      const card = pintar.join("");
      contenedor.innerHTML = card;
    } catch (error) {
      console.error(error);
    }
  }
  pedirNoticias();
}
