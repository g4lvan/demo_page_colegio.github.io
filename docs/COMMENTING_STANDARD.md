# Estándar de Comentarios — IEM Emilio Cifuentes

Convención de comentarios para el proyecto, usando la extensión
[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) en VSCode.

---

## Configuración requerida (`settings.json`)

```jsonc
"better-comments.tags": [
  { "tag": "!",  "color": "#FF2D00", "strikethrough": false, "bold": false, "italic": false, "backgroundColor": "transparent" },
  { "tag": "?",  "color": "#3498DB", "strikethrough": false, "bold": false, "italic": false, "backgroundColor": "transparent" },
  { "tag": "//", "color": "#474747", "strikethrough": true,  "bold": false, "italic": false, "backgroundColor": "transparent" },
  { "tag": "'",  "color": "#FF8C00", "strikethrough": false, "bold": false, "italic": false, "backgroundColor": "transparent" },
  { "tag": "*",  "color": "#98C379", "strikethrough": false, "bold": false, "italic": false, "backgroundColor": "transparent" }
]
```

---

## Los 5 tipos de comentario

| Tag  | Color    | Tipo               | Pregunta que responde                          |
|------|----------|--------------------|------------------------------------------------|
| `*`  | 🟢 Verde  | Sección            | ¿Qué hace este bloque grande?                  |
| `?`  | 🔵 Azul   | Decisión de diseño | ¿Por qué está así y no de otra forma?          |
| `!`  | 🔴 Rojo   | Advertencia        | ¿Qué puede romperse o está pendiente?          |
| `'`  | 🟠 Naranja| Componente         | ¿Cómo funciona este patrón que se repite?      |
| `//` | ⬛ Tachado| Código muerto      | Esto ya no aplica / está pendiente de eliminar |

---

## Regla de oro

> Antes de escribir un comentario, pregúntate:
> **"¿Alguien que entiende HTML/CSS entendería esto en 30 segundos sin el comentario?"**
> - Si la respuesta es **sí** → no comentes.
> - Si la respuesta es **no** → comenta con el tipo correcto.

Un comentario que solo repite lo que el código ya dice es ruido, no documentación.

---

## Tipo 1 — Sección `*`

**Propósito:** Delimitar bloques grandes y navegables del documento.

**Cuándo usarlo:**
- Una por cada elemento semántico de primer nivel: `<header>`, `<main>`, `<footer>`, y cada `<section>` directa de `<main>`.
- Si tienes más de 6 en un archivo, estás abusando.

**Formato:**
```html
<!-- * ============================================================
  NOMBRE DE SECCIÓN
  Qué hace este bloque en una o dos líneas.
  Si el layout tiene algo no obvio, explicarlo aquí.
  ============================================================ -->
```

**Ejemplo:**
```html
<!-- * ============================================================
  HEADER
  Barra superior fija: logo + nav principal + buscador.
  Layout flex space-between: .izquierda agrupa logo y nav,
  .botones_accion contiene el buscador al extremo derecho.
  ============================================================ -->
<header>
  ...
</header>
```

**Ejemplo — subsección dentro de un bloque grande:**
```html
<!-- * — Acceso rápido -->
<section class="acceso_rapido">
```

> Para subsecciones menores dentro de un bloque ya delimitado,
> el formato corto `<!-- * — Nombre -->` es suficiente.

---

## Tipo 2 — Decisión de diseño `?`

**Propósito:** Explicar por qué algo está hecho de una forma que podría parecer rara
o que alguien podría "corregir" sin entender las consecuencias.

**Cuándo usarlo:**
- Cuando la estructura no es la más obvia y tiene una razón específica.
- Cuando un layout, orden de elementos, o agrupamiento responde a una necesidad técnica o visual.
- **No** usarlo para cosas que cualquier desarrollador entendería solo.

**Formato:**
```html
<!-- ? Qué se hizo.
     Por qué se hizo así — cuál sería el problema si se cambia. -->
```

**Ejemplo:**
```html
<!-- ? Nav y logo van dentro de .izquierda, no directamente en header.
     Sin este wrapper el flex los separa individualmente,
     rompiendo el agrupamiento visual izquierda / derecha. -->
<div class="izquierda">
  <h1>...</h1>
  <nav>...</nav>
</div>
```

**Ejemplo:**
```html
<!-- ? preconnect declarado antes del stylesheet de Google Fonts.
     Reduce el tiempo de handshake con el servidor de fuentes
     antes de que el browser descargue el CSS. -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

---

## Tipo 3 — Advertencia `!`

**Propósito:** Marcar algo que no se debe tocar sin entender las consecuencias,
o algo incompleto de forma intencional.

**Cuándo usarlo:**
- Links o botones sin funcionalidad (páginas pendientes).
- Contenido estático que en el futuro será dinámico.
- Decisiones técnicas con deuda conocida.
- **Úsalo con moderación** — si todo es advertencia, nada lo es.

**Formato:**
```html
<!-- ! Qué está incompleto o puede romperse.
     Qué se debe hacer antes de tocarlo o cuándo se resolverá. -->
```

**Ejemplos:**
```html
<!-- ! href vacío — página "Nosotros" pendiente (v1.0).
     No eliminar el <li>, solo reemplazar href cuando exista la ruta. -->
<li><a href="">Nosotros</a></li>
```

```html
<!-- ! El buscador es visual únicamente.
     No tiene lógica JS conectada — funcionalidad pendiente (v1.0). -->
<form class="busqueda">
```

```html
<!-- ! Nombre de archivo generado por red social.
     Renombrar a /assets/images/graduacion-grado11-2025.jpg
     antes de producción (SEO + mantenimiento). -->
<img src="assets/images/590406859_...n.jpg" alt="Graduación 2025" />
```

```html
<!-- ! Contenido estático — 3 noticias hardcodeadas.
     En v2.0 reemplazar con fetch a API o CMS. -->
<section class="noticias">
```

---

## Tipo 4 — Componente `'`

**Propósito:** Documentar cómo funciona un patrón que se repite en el código,
justo antes de su primera instancia.

**Cuándo usarlo:**
- Cards, items de lista, filas de tabla, o cualquier bloque que se repite 2 o más veces.
- **Solo en la primera instancia** — las demás no necesitan comentario propio.
- Si el componente tiene variantes o estados, mencionarlos aquí.

**Formato:**
```html
<!-- ' NOMBRE DEL COMPONENTE
     Estructura: elemento-raiz > parte-1 + parte-2 + parte-3.
     Notas sobre posicionamiento, variantes o comportamiento no obvio.
     Solo documentar esta primera instancia. -->
```

**Ejemplo:**
```html
<!-- ' CARD DE NOTICIA
     Estructura: .card_noticias > .card_img (badge absolute + img)
                                > .card_content (fecha + h3 + p + cta)
     El badge .type_noti se posiciona absolute sobre .card_img.
     Solo documentar esta primera instancia — las demás son idénticas. -->
<article class="card_noticias">
  ...
</article>

<article class="card_noticias">...</article>
<article class="card_noticias">...</article>
```

**Ejemplo:**
```html
<!-- ' CARD DE ACCESO RÁPIDO
     Estructura: .card_rapido > icono SVG + h3 + p + enlace con chevron.
     El chevron usa SVG fill (no stroke) para verse sólido a tamaños pequeños. -->
<article class="card_rapido">
  ...
</article>
```

---

## Tipo 5 — Código muerto `//`

**Propósito:** Marcar código que ya no se usa o está pendiente de eliminar,
sin borrarlo todavía (por si se necesita revertir).

**Cuándo usarlo:**
- Código comentado temporalmente durante desarrollo.
- Secciones eliminadas que podrían recuperarse pronto.
- **No acumular** — si lleva más de un sprint sin reactivarse, eliminarlo.

**Formato:**
```html
<!-- // Qué era este bloque y por qué se eliminó.
     Referencia al commit o versión donde se removió si aplica. -->
```

**Ejemplo:**
```html
<!-- // Sección .stats eliminada — requería JS y está pospuesta para v1.0.
     Ver commit 3a9f2c para el código original. -->
```

---

## Frecuencia recomendada por tipo

| Tipo        | Frecuencia ideal                              |
|-------------|-----------------------------------------------|
| `*` Sección | 1 por bloque semántico de primer nivel        |
| `?` Decisión| Solo cuando la razón no es obvia              |
| `!` Advertencia | Con moderación — máximo 1 cada 50 líneas  |
| `'` Componente  | 1 por componente repetido, primera vez    |
| `//` Código muerto | Solo mientras es temporal              |

---

## Cómo se ve en un archivo real

```html
<!-- * ============================================================
  HEADER
  Logo + nav principal + buscador.
  Flex space-between: .izquierda agrupa logo y nav,
  .botones_accion tiene el buscador al extremo derecho.
  ============================================================ -->
<header>

  <!-- ? Nav dentro de .izquierda, no directo en header.
       Sin este wrapper el flex los separa individualmente,
       rompiendo el agrupamiento visual izquierda / derecha. -->
  <div class="izquierda">
    <h1>...</h1>
    <nav>
      <ul class="links_navegacion">
        <li><a href="#">Inicio</a></li>
        <!-- ! href vacío — página pendiente (v1.0). No eliminar el <li>. -->
        <li><a href="">Nosotros</a></li>
        <li><a href="pages/noticias.html">Noticias</a></li>
      </ul>
    </nav>
  </div>

  <div class="botones_accion">
    <!-- ! El buscador no tiene JS conectado — funcionalidad pendiente (v1.0). -->
    <form class="busqueda">...</form>
  </div>

</header>


<!-- * ============================================================
  NOTICIAS RECIENTES
  3 noticias hardcodeadas de forma estática.
  En v2.0 reemplazar con fetch a API o CMS.
  ============================================================ -->
<section class="noticias">

  <!-- ' CARD DE NOTICIA
       Estructura: .card_noticias > .card_img (badge + img)
                                  > .card_content (fecha + h3 + p + cta)
       Badge posicionado absolute sobre .card_img.
       Solo documentar esta primera instancia. -->
  <article class="card_noticias">...</article>

  <article class="card_noticias">...</article>
  <article class="card_noticias">...</article>

</section>
```

---

## Lo que NO es un buen comentario

```html
<!-- ❌ MAL — repite lo que el código ya dice -->
<!-- Footer de la pagina
     - Pequeña descripción
     - Links de acceso
     - Redes sociales -->
<footer>

<!-- ❌ MAL — no aporta nada -->
<!-- Sección de noticias -->
<section class="noticias">

<!-- ❌ MAL — comentario obvio -->
<!-- Imagen del colegio -->
<img src="..." alt="..." />
```

```html
<!-- ✅ BIEN — explica la decisión de layout -->
<!-- ? Nav dentro de .izquierda para sostener el flex del header. -->

<!-- ✅ BIEN — advierte sobre algo no terminado -->
<!-- ! href vacío — página pendiente (v1.0). No eliminar el <li>. -->

<!-- ✅ BIEN — documenta un componente que se repite -->
<!-- ' CARD DE NOTICIA
     Estructura: .card_noticias > .card_img > .card_content
     Solo documentar esta primera instancia. -->
```
