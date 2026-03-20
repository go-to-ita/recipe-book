## 1. Implementación del botón de compartir

- [x] 1.1 En `src/features/recipes/pages/RecipeDetailPage.tsx`, crear la función `buildWhatsAppUrl(recipe)` que construya el enlace `https://wa.me/?text=...` con el nombre, categoría y URL actual de la receta usando `encodeURIComponent`
- [x] 1.2 Agregar el botón/enlace "Compartir por WhatsApp" como elemento `<a>` con `href`, `target="_blank"` y `rel="noopener noreferrer"`, visible únicamente cuando los datos de la receta están disponibles (no durante carga ni error)
- [x] 1.3 Aplicar estilos Tailwind al botón (color verde WhatsApp, ícono o texto descriptivo, hover state)

## 2. Verificación

- [x] 2.1 Verificar en escritorio que el botón aparece en la página de detalle y abre WhatsApp Web con el mensaje pre-formateado correcto (nombre + categoría + URL)
- [x] 2.2 Verificar que el botón NO aparece en los estados de carga y error de la receta
- [x] 2.3 Verificar que el enlace incluye `rel="noopener noreferrer"` inspeccionando el DOM
