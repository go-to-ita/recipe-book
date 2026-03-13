## 1. Correcciones al tipo Recipe y API

- [x] 1.1 Corregir el campo `image` → `imageUrl` en la interfaz `Recipe` de `recipesApi.ts`
- [x] 1.2 Corregir el tipo de `prepTime` de `string` a `number` en la interfaz `Recipe`
- [x] 1.3 Agregar los campos `ingredients?: string[]`, `steps?: string[]` a la interfaz `Recipe`
- [x] 1.4 Agregar el endpoint `getRecipeById` en `recipesApi.ts`: `GET /recipes/:id`
- [x] 1.5 Exportar el hook `useGetRecipeByIdQuery` desde `recipesApi.ts`

## 2. Actualizar RecipeCard para usar imageUrl y navegar

- [x] 2.1 Actualizar `RecipeCard.tsx`: cambiar `recipe.image` por `recipe.imageUrl`
- [x] 2.2 Actualizar `RecipeCard.tsx`: mostrar `prepTime` como número (ej. `⏱ ${recipe.prepTime} min`)
- [x] 2.3 Envolver el contenido de `RecipeCard` en un `<Link to={/recipes/${recipe.id}}>` de react-router-dom

## 3. Actualizar rutas en App.tsx

- [x] 3.1 Cambiar la ruta `/` a `/recipes` en `App.tsx` para `RecipesPage`
- [x] 3.2 Agregar la ruta `/recipes/:id` apuntando al nuevo `RecipeDetailPage`
- [x] 3.3 Agregar redirección de `/` → `/recipes` (o ruta catch-all)

## 4. Crear la página de detalle

- [x] 4.1 Crear `src/features/recipes/pages/RecipeDetailPage.tsx` con `useParams` para leer el `id`
- [x] 4.2 Usar `useGetRecipeByIdQuery(id)` para obtener los datos de la receta
- [x] 4.3 Renderizar estado de carga (spinner o skeleton) mientras `isLoading` es `true`
- [x] 4.4 Renderizar mensaje de error + botón volver cuando `isError` es `true` o receta no encontrada
- [x] 4.5 Renderizar imagen grande (`imageUrl`) con placeholder si no hay URL
- [x] 4.6 Renderizar nombre, descripción, categoría, dificultad y tiempo de preparación
- [x] 4.7 Renderizar lista de ingredientes (`ingredients`)
- [x] 4.8 Renderizar pasos numerados (`steps`)
- [x] 4.9 Agregar botón "Volver al listado" que navega a `/recipes` con `useNavigate`
