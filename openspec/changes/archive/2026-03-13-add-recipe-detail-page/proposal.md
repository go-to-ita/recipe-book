## Why

El listado de recetas muestra cards con información resumida, pero no existe una vista que permita al usuario ver el detalle completo de una receta: ingredientes, pasos de preparación, dificultad y tiempo. Sin esta página el flujo de uso principal está incompleto.

## What Changes

- Agregar ruta `/recipes/:id` que renderiza la vista de detalle de una receta.
- Las cards del listado se vuelven clickeables y navegan a dicha ruta.
- La vista de detalle muestra: imagen grande, nombre, descripción, categoría, dificultad, tiempo de preparación, lista de ingredientes y pasos numerados.
- Agregar un botón "Volver al listado" que regresa a `/recipes`.
- Consumir el endpoint `GET /recipes/:id` desde JSON Server para obtener los datos de la receta individual.

## Capabilities

### New Capabilities

- `recipe-detail`: Vista de detalle de una receta individual con todos sus atributos, accesible desde el listado mediante navegación por ID.

### Modified Capabilities

- `recipe-listing`: Las cards del listado ahora son navegables (añaden un enlace/click handler a `/recipes/:id`). El requisito de que las cards sean interactivas cambia la interfaz de este componente.

## Impact

- **Código nuevo**: `features/recipes/pages/RecipeDetailPage.tsx`, componente `RecipeDetail`, hook RTK Query para `getRecipeById`.
- **Código modificado**: `RecipeCard` (añadir navegación), configuración de rutas en `App.tsx` o router.
- **API**: Nuevo endpoint utilizado: `GET /recipes/:id` (ya disponible en JSON Server).
- **Dependencias**: React Router DOM (ya instalado para el listado).
