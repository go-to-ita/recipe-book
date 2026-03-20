## Context

La página de detalle (`RecipeDetailPage.tsx`) ya muestra toda la información de la receta. El cambio es mínimo: agregar un botón que construya un enlace de WhatsApp y lo abra. No se requieren nuevas dependencias, rutas, ni llamadas a la API.

**Archivos modificados:**
- `src/features/recipes/pages/RecipeDetailPage.tsx`

## Goals / Non-Goals

**Goals:**
- Botón "Compartir por WhatsApp" visible en la página de detalle
- Mensaje pre-formateado: nombre de la receta, categoría y URL de la página actual
- Funciona en móvil (abre app de WhatsApp) y escritorio (abre WhatsApp Web)

**Non-Goals:**
- Compartir desde otras páginas (listado, cards)
- Otros canales de compartir
- Acortadores de URL o servicios externos
- Analytics de clics

## Decisions

### 1. API de WhatsApp: `https://wa.me/?text=...` sin número de destino

**Decisión**: Usar `https://wa.me/?text=<mensaje_codificado>` (sin destinatario), lo que permite al usuario elegir a quién enviar.

**Alternativa considerada**: `whatsapp://send?text=...` (deep link nativo).

**Rationale**: El formato `wa.me` funciona en todos los contextos (móvil, escritorio, WhatsApp Web) sin requerir que WhatsApp esté instalado. Es la URL oficial recomendada por Meta para integraciones sin número fijo.

### 2. URL de la receta: `window.location.href`

**Decisión**: Usar `window.location.href` en tiempo de clic para obtener la URL actual.

**Alternativa considerada**: Construir la URL manualmente con `window.location.origin + /recipes/${id}`.

**Rationale**: `window.location.href` es más simple y garantiza que la URL refleja exactamente lo que el usuario ve. No hay diferencia práctica en este contexto (JSON Server local), y es la forma más directa de obtener el enlace canónico.

### 3. Sin componente separado

**Decisión**: Implementar el botón directamente en `RecipeDetailPage.tsx` como elemento inline, sin extraer un componente `ShareButton`.

**Rationale**: El botón es una única línea de JSX con un handler simple. Extraerlo sería sobre-ingeniería para un uso puntual. Si en el futuro se usa en más páginas, se puede extraer entonces.

## Risks / Trade-offs

- **[Riesgo] JSON Server en localhost no es una URL pública** → El enlace compartido (`http://localhost:3001/...`) no será accesible para el destinatario. Mitigation: En este contexto de curso/desarrollo es aceptable; en producción se usaría la URL real del dominio.
- **[Trade-off] `window.location.href` vs URL construida** → Si la app se embebe en un iframe, `location.href` podría dar la URL del frame. Mitigation: No aplicable en este proyecto.
