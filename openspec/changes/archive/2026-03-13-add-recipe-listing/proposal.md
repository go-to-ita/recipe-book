## Why

El Recipe Book necesita una página principal que muestre el catálogo de recetas disponibles. Actualmente no existe ninguna vista de listado, por lo que los usuarios no tienen forma de explorar ni descubrir las recetas de la aplicación.

## What Changes

- Nueva página de listado de recetas accesible como vista principal
- Cards de receta que muestran imagen, nombre, categoría, dificultad y tiempo de preparación
- Integración con la API mock (`GET /recipes`) mediante RTK Query
- Estados de carga y error gestionados en la UI

## Capabilities

### New Capabilities

- `recipe-listing`: Página principal que lista todas las recetas en formato card, con datos obtenidos via RTK Query desde `/recipes`. Incluye manejo de estados de carga, error y lista vacía.

### Modified Capabilities

<!-- No existing capabilities are changing -->

## Impact

- **Nuevos archivos**: feature `recipes/` con componentes `RecipeCard`, `RecipeList`, página `RecipesPage`
- **Store**: nuevo slice RTK Query `recipesApi` en `store/`
- **Routing**: ruta raíz `/` apuntará a `RecipesPage`
- **Dependencias**: RTK Query (`@reduxjs/toolkit`, `react-redux`) ya deben estar en el stack
- **API**: `http://localhost:3001/recipes` debe devolver array de recetas con campos `id`, `name`, `category`, `difficulty`, `prepTime`, `image`
