## 1. Store — endpoint de categorías

- [x] 1.1 Añadir el tipo `Category` (normalizar `string | { id: number; name: string }`) en `recipesApi.ts`
- [x] 1.2 Añadir el endpoint `getCategories` con query `GET /categories` en `recipesApi.ts`
- [x] 1.3 Exportar el hook `useGetCategoriesQuery` desde `recipesApi.ts`

## 2. Hook useRecipeFilters

- [x] 2.1 Crear `src/features/recipes/hooks/useRecipeFilters.ts` con estado `searchText` y `selectedCategory`
- [x] 2.2 Implementar la lógica de filtrado con `useMemo`: AND de búsqueda por `name`/`description` (case-insensitive) y filtro por `category`
- [x] 2.3 Retornar `filteredRecipes`, `searchText`, `setSearchText`, `selectedCategory`, `setSelectedCategory` y `resultCount`

## 3. Componentes de control

- [x] 3.1 Crear `src/features/recipes/components/SearchBar.tsx` — input controlado con placeholder "Buscar recetas..."
- [x] 3.2 Crear `src/features/recipes/components/CategoryFilter.tsx` — `<select>` controlado que usa `useGetCategoriesQuery`, con opción "Todas las categorías" por defecto
- [x] 3.3 Normalizar en `CategoryFilter` tanto `string[]` como `{id, name}[]` en las opciones del select

## 4. Integración en RecipesPage

- [x] 4.1 Usar `useRecipeFilters` en `RecipesPage` y pasar `filteredRecipes` a `RecipeList`
- [x] 4.2 Renderizar `SearchBar` y `CategoryFilter` en `RecipesPage` conectados al estado del hook
- [x] 4.3 Mostrar el contador "X recetas encontradas" en `RecipesPage`

## 5. Actualizar RecipeList

- [x] 5.1 Modificar `RecipeList` para aceptar un prop `recipes: Recipe[]` en lugar de hacer el fetch internamente
- [x] 5.2 Actualizar el estado vacío de `RecipeList`: distinguir "sin recetas en el catálogo" (sin filtros) de "sin coincidencias" (con filtros activos)
- [x] 5.3 Asegurar que `RecipesPage` sigue gestionando los estados de carga y error de RTK Query y los muestra adecuadamente
