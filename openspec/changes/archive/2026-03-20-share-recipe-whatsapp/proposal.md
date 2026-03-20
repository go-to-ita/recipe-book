## Why

Los usuarios no pueden compartir las recetas que encuentran en la app, lo que limita la difusión y el uso colaborativo del libro de recetas. Agregar un botón de WhatsApp en el detalle de cada receta permite compartirlas con un solo tap, sin necesidad de copiar URLs manualmente.

## What Changes

- Nuevo botón "Compartir por WhatsApp" en la página de detalle de receta (`/recipes/:id`)
- Al presionar el botón, se abre WhatsApp con un mensaje pre-formateado que incluye: nombre de la receta, categoría y URL de la página de detalle
- El enlace de WhatsApp se construye como `https://wa.me/?text=...` (API de WhatsApp Web, sin dependencias externas)

**In scope:**
- Botón de compartir en la página de detalle únicamente
- Mensaje pre-formateado en español con nombre, categoría y enlace

**Out of scope:**
- Compartir desde el listado de recetas o las cards
- Otros canales de compartir (Twitter, email, etc.)
- Seguimiento de clics o analytics

## Capabilities

### New Capabilities

_(ninguna — la funcionalidad se añade a la capability existente)_

### Modified Capabilities

- `recipe-detail`: Se agrega el requisito de compartir la receta por WhatsApp desde la página de detalle

## Impact

- **Archivos modificados**: `src/features/recipes/pages/RecipeDetailPage.tsx`
- **Sin nuevas dependencias**: La URL de WhatsApp se construye con `window.location.href` y template literals
- **Sin cambios en la API**: No se realiza ninguna petición adicional
