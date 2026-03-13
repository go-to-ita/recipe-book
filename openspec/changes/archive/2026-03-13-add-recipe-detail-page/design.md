## Context

La app ya tiene `BrowserRouter` y `react-router-dom` configurados en `App.tsx`, con una única ruta `/` que renderiza `RecipesPage`. La capa de datos usa RTK Query (`recipesApi`) con un endpoint `getRecipes` que devuelve `Recipe[]`.

El tipo `Recipe` en `recipesApi.ts` está incompleto: solo define los campos del listado (`name`, `category`, `difficulty`, `prepTime`, `image`) y no incluye `ingredients`, `steps` ni `description` que sí existen en la API. Además, el campo de imagen en la API se llama `imageUrl`, no `image`.

## Goals / Non-Goals

**Goals:**
- Agregar la ruta `/recipes/:id` con su página de detalle.
- Hacer las cards del listado navegables a esa ruta.
- Extender el tipo `Recipe` con los campos completos que devuelve la API.
- Agregar el endpoint `getRecipeById` a `recipesApi`.

**Non-Goals:**
- Editar o eliminar recetas desde el detalle.
- Añadir favoritos, valoraciones o comentarios.
- Cambiar el layout o diseño visual del listado existente.

## Decisions

### 1. Ruta: `/recipes/:id` en lugar de `/:id`

Mantiene coherencia con el listado en `/` (que se renombrará a `/recipes`) o simplemente agrega `/recipes/:id` coexistiendo con `/`. Se elige agregar la nueva ruta como `/recipes/:id` y redirigir `/` a `/recipes` para tener URLs semánticas.

**Alternativa descartada:** ruta plana `/:id` — colisiona fácilmente con otras rutas futuras.

### 2. Endpoint individual vs reutilizar la lista

RTK Query ya cachea `getRecipes`. Para el detalle se agrega `getRecipeById(id)` que llama a `GET /recipes/:id`. Esto evita traer todas las recetas solo para mostrar una.

**Alternativa descartada:** seleccionar del cache de `getRecipes` con `selectFromResult` — solo funciona si el listado ya fue cargado; falla en acceso directo por URL.

### 3. Extensión del tipo `Recipe`

Se amplía la interfaz `Recipe` existente en `recipesApi.ts` añadiendo los campos opcionales `ingredients?: string[]`, `steps?: string[]`. También se corrige el campo de imagen: la API retorna `imageUrl`, no `image`. Se unifican en el tipo.

**Alternativa descartada:** tipo separado `RecipeDetail` — introduce duplicación innecesaria cuando la API retorna el mismo objeto con más campos.

### 4. Navegación desde `RecipeCard`

`RecipeCard` se envuelve en un `<Link to={`/recipes/${recipe.id}`}>` de react-router-dom. No se agrega prop `onClick` externa para mantener el componente simple.

## Risks / Trade-offs

- **Discrepancia `image` vs `imageUrl`**: La API usa `imageUrl` pero el tipo actual define `image`. Corregirlo puede romper referencias existentes en `RecipeCard` y `RecipeList`. → Migración: actualizar el tipo y todos los usos en el mismo PR.
- **Acceso directo por URL**: Si el usuario accede directamente a `/recipes/99` con un ID inexistente, RTK Query devolverá un error 404. → Manejar el estado de error en `RecipeDetailPage` mostrando un mensaje y el botón de volver.
- **`prepTime` es número en la API** (`25`) pero el tipo lo define como `string`. → Corregir el tipo a `number` y actualizar el display en `RecipeCard`.
