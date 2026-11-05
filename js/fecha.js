// * ============================================================
//   UTILIDAD COMPARTIDA — Fechas
//   Convierte "YYYY-MM-DD" en texto legible en español.
//   Usada por cards (js/noticias.js) y modales (js/noti.js).
//   ============================================================

// ? timeZone UTC: evita que "2025-11-27" se Corrida un día atrás
//   por desfase horario al parsear la fecha sin hora.
export function formatearFecha(texto) {
  const fecha = new Date(texto).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return fecha;
}
