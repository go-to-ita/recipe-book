## Why

El usuario no tiene forma de guardar las recetas que le interesan: cada vez que entra a la app debe recordar cuáles le gustaron. Agregar favoritos permite marcar recetas de interés y filtrar el listado para ver solo ellas, con el estado persistido entre sesiones.

## What Changes

- Nuevo slice de Redux (`favoritesSlice`) que almacena los IDs de recetas favoritas y persiste en `localStorage`.
- Las cards del listado muestran un botón de corazón para marcar/desmarcar favoritos.
- La página de detalle también permite marcar/desmarcar la receta como favorita.
- El listado incluye un toggle "Solo favoritos" que filtra las recetas mostradas.
- Sin nuevos endpoints en JSON Server — el estado de favoritos es local al dispositivo.

## Capabilities

### New Capabilities

- `recipe-favorites`: Gestión del estado de favoritos: toggle, persistencia en localStorage y lectura del estado por ID de receta.

### Modified Capabilities

- `recipe-listing`: Las cards ahora muestran un botón de corazón, y la barra de filtros incluye un toggle "Solo favoritos".
- `recipe-detail`: La página de detalle incluye un botón para marcar/desmarcar la receta como favorita.

## Impact

- **Código nuevo**: `store/favoritesSlice.ts`, lógica de persistencia en `store/store.ts`.
- **Código modificado**: `RecipeCard.tsx` (botón corazón), `RecipesPage.tsx` (toggle favoritos), `RecipeDetailPage.tsx` (botón favorito), `useRecipeFilters.ts` (nuevo filtro `showOnlyFavorites`).
- **Sin cambios en la API**: No se requieren nuevos endpoints en JSON Server.
- **Dependencias**: Sin dependencias nuevas — la persistencia se implementa manualmente con `localStorage`.
