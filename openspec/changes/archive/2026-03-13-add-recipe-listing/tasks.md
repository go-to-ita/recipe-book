## 1. Store y RTK Query API

- [x] 1.1 Crear `src/store/recipesApi.ts` con `createApi`, `baseQuery` apuntando a `http://localhost:3001` y el endpoint `getRecipes`
- [x] 1.2 Definir el tipo TypeScript `Recipe` con campos `id`, `name`, `category`, `difficulty`, `prepTime`, `image`
- [x] 1.3 Registrar `recipesApi.reducer` y `recipesApi.middleware` en el store de Redux

## 2. Componente RecipeCard

- [x] 2.1 Crear `src/features/recipes/components/RecipeCard.tsx` que reciba una `Recipe` como prop
- [x] 2.2 Renderizar imagen (con fallback a placeholder si no hay URL), nombre, categoría, dificultad y tiempo de preparación
- [x] 2.3 Aplicar estilos con Tailwind CSS v4 (card con sombra, imagen con aspect-ratio, layout interno en flex/grid)

## 3. Componente RecipeList

- [x] 3.1 Crear `src/features/recipes/components/RecipeList.tsx` que use el hook `useGetRecipesQuery` de RTK Query
- [x] 3.2 Mostrar indicador de carga mientras `isLoading` es `true`
- [x] 3.3 Mostrar mensaje de error cuando `isError` es `true`
- [x] 3.4 Mostrar mensaje de lista vacía cuando el array de recetas está vacío
- [x] 3.5 Renderizar cuadrícula responsiva de `RecipeCard` cuando los datos están disponibles

## 4. Página y Routing

- [x] 4.1 Crear `src/features/recipes/pages/RecipesPage.tsx` que componga `RecipeList`
- [x] 4.2 Configurar el router (React Router) para que la ruta `/` renderice `RecipesPage`
