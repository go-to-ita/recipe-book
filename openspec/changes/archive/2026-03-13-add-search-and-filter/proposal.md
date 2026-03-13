## Why

El listado de recetas muestra todas las recetas sin posibilidad de filtrar, lo que se vuelve inmanejable a medida que crece el catálogo. Los usuarios necesitan encontrar recetas rápidamente por nombre o por categoría sin tener que desplazarse por todo el listado.

## What Changes

- Nueva barra de búsqueda por texto que filtra recetas por nombre y descripción (case-insensitive)
- Nuevo dropdown de categorías cargado desde `GET /categories` para filtrar por categoría
- Ambos filtros operan en combinación (AND)
- Contador de resultados visible ("X recetas encontradas")
- Estado vacío específico cuando ninguna receta coincide con los filtros activos

## Capabilities

### New Capabilities

- `recipe-search-filter`: Controles de búsqueda y filtrado sobre el listado de recetas, incluyendo búsqueda por texto, filtro por categoría, contador de resultados y estado vacío de filtrado.

### Modified Capabilities

- `recipe-listing`: El listado ahora recibe los filtros activos y muestra solo las recetas que los satisfacen, además de exponer el contador de resultados.

## Impact

- **Modificados**: `RecipeList` acepta props de filtro; `RecipesPage` gestiona el estado de búsqueda y filtro
- **Nuevos**: componente `SearchBar`, componente `CategoryFilter`, hook `useRecipeFilters`
- **Store**: nuevo endpoint RTK Query `getCategories` en `recipesApi.ts`
- **API**: `http://localhost:3001/categories` debe devolver array de categorías (strings o `{id, name}`)
- **Sin nuevas dependencias** externas
