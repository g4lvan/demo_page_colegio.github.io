# Convención de Commits
### Proyecto: Rediseño Web – IEM Emilio Cifuentes

---

## Formato

```
<tipo>(<alcance>): <descripción en imperativo, minúsculas, sin punto>
```

> **Regla mental:** el mensaje debe completar la frase _"Si aplico este commit, este commit va a…"_

### Ejemplo completo

```
feat(pages): agregar página de contacto institucional
^───^──────^ ^───────────────────────────────────────^
│   │         └─ descripción: qué hace, no cómo lo hace
│   └─────────── alcance: carpeta o sección afectada
└─────────────── tipo: categoría del cambio
```

---

## Tipos

| Tipo        | Cuándo usarlo                                    |
|-------------|--------------------------------------------------|
| `feat`      | Nueva sección, página o funcionalidad visible    |
| `estilo`    | Cambios en CSS: colores, fuentes, espaciado      |
| `fix`       | Corrección de algo roto o mal renderizado        |
| `contenido` | Textos, imágenes, logos, íconos                  |
| `refactor`  | Reorganizar código sin cambiar lo que se ve      |
| `docs`      | Cambios en README u otra documentación           |
| `config`    | `.gitignore`, metadatos, `<head>` del HTML       |
| `chore`     | Limpieza, archivos sobrantes, renombrados        |

---

## Alcances (Scopes)

Deben coincidir con la estructura real del repositorio:

| Alcance    | Carpeta / archivo             | Ejemplo de uso                         |
|------------|-------------------------------|----------------------------------------|
| `index`    | `index.html`                  | cambios en la página principal         |
| `pages`    | `pages/`                      | agregar o editar subpáginas            |
| `css`      | `css/`                        | modificar archivos de estilos          |
| `assets`   | `assets/`                     | imágenes, logos, íconos, fuentes       |
| `js`       | `js/`                         | scripts (cuando se incorporen)         |
| `docs`     | `docs/` o `README.md`         | documentación del proyecto             |
| `preview`  | `preview/`                    | capturas o GIFs de demostración        |
| `config`   | `.gitignore`, `<head>`, meta  | configuración general del proyecto     |

> Si el cambio toca múltiples carpetas sin un alcance claro, omite el paréntesis:
> `refactor: separar estilos globales de los de componentes`

---

## Reglas

1. **Un commit = un cambio.** Si el mensaje necesita "y", separa en dos commits.
2. **Descripción en minúsculas**, sin punto final, máximo 72 caracteres.
3. **Usa el imperativo:** "agregar", "corregir", "eliminar" — nunca "agregué" o "se agrega".
4. **El alcance es obligatorio** cuando el cambio está claramente en una sola carpeta.
5. **Cuerpo opcional** para explicar el *por qué*, no el *qué* (el diff ya muestra el qué).

### Cuerpo del commit (cuando aplica)

```
fix(css): corregir desbordamiento del hero en pantallas < 375px

El padding horizontal del hero causaba scroll lateral en iPhone SE.
Se reemplazó el valor fijo por padding relativo con clamp().
```

---

## Ejemplos por tipo

### `feat` — nueva función o sección
```
feat(index): agregar sección de noticias institucionales
feat(pages): crear página de calendario académico
feat(js): agregar menú hamburguesa para mobile
```

### `estilo` — cambios visuales en CSS
```
estilo(css): ajustar paleta de colores a identidad institucional
estilo(css): aumentar contraste en textos sobre fondo oscuro
estilo(css): unificar espaciado de secciones con variables CSS
```

### `fix` — corrección de algo roto
```
fix(css): corregir desbordamiento del navbar en tablet
fix(index): reparar enlace roto al portal de padres
fix(pages): restaurar scroll suave en página de contacto
```

### `contenido` — textos, imágenes, logos
```
contenido(assets): reemplazar logo por versión SVG oficial
contenido(index): actualizar texto del hero con misión institucional
contenido(pages): agregar fotos del cuerpo docente 2025
```

### `refactor` — reorganizar sin cambiar comportamiento
```
refactor(css): separar estilos del header en archivo propio
refactor(index): extraer sección de noticias a componente reutilizable
refactor(assets): reorganizar imágenes por sección
```

### `docs` — documentación
```
docs: agregar guía de contribución al README
docs: documentar estructura de carpetas del proyecto
docs(preview): actualizar capturas de pantalla con versión actual
```

### `config` — configuración
```
config: agregar meta tags de Open Graph para redes sociales
config: actualizar .gitignore para excluir archivos del sistema
config: configurar favicon institucional
```

### `chore` — mantenimiento
```
chore: eliminar archivos CSS sin usar del directorio raíz
chore: renombrar imágenes con convención kebab-case
chore: comprimir imágenes del directorio assets
```

---

## Errores comunes

| ❌ Incorrecto                                  | ✅ Correcto                                              |
|-----------------------------------------------|----------------------------------------------------------|
| `fix: arreglé cosas`                          | `fix(css): corregir alineación del footer en mobile`     |
| `update: cambios varios`                       | _(separar en commits individuales por tipo)_             |
| `feat: nueva sección y corrección de estilos` | Dos commits: uno `feat`, uno `estilo`                    |
| `FEAT(INDEX): Agregar Sección Hero.`           | `feat(index): agregar sección hero`                      |
| `contenido: img`                               | `contenido(assets): reemplazar foto principal del hero`  |

---

## Referencia rápida

```
feat(pages)       → nueva página o sección
estilo(css)       → cambio visual en estilos
fix(index)        → algo que estaba roto
contenido(assets) → texto, imagen o logo
refactor(css)     → reorganización interna
docs              → README o documentación
config            → .gitignore, meta, <head>
chore             → limpieza y mantenimiento
```

---

## Fases del proyecto

Referencia para contextualizar qué tipos de commit son más frecuentes en cada etapa:

| Fase    | Tipos predominantes                    |
|---------|----------------------------------------|
| **MVP** | `feat`, `contenido`, `estilo`          |
| **v1.0**| `fix`, `estilo`, `refactor`            |
| **v2.0**| `feat`, `config`, `js`                 |
| **v3.0**| `feat`, `config`, `chore`, `docs`      |

---

_Convención definida para el proyecto `demo_page_colegio.github.io` — Juan Andres Gallego Vanegas_
