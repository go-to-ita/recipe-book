## 1. Crear el slice de favoritos

- [ ] 1.1 Crear `src/store/favoritesSlice.ts` con estado `{ ids: number[] }` y acción `toggleFavorite(id: number)`
- [ ] 1.2 Agregar selector `selectFavoriteIds` que retorna `state.favorites.ids`
- [ ] 1.3 Agregar selector `selectIsFavorite` como función que recibe `id` y retorna `boolean`

## 2. Persistencia en localStorage

- [ ] 2.1 En `store.ts`, leer `localStorage['recipe-favorites']` al inicializar y usarlo como `preloadedState` para `favorites.ids`
- [ ] 2.2 En `store.ts`, suscribirse al store con `store.subscribe` para guardar `favorites.ids` en `localStorage['recipe-favorites']` en cada cambio
- [ ] 2.3 Envolver la lectura/escritura de `localStorage` en `try/catch` para manejar el caso en que no esté disponible

## 3. Registrar el slice en el store

- [ ] 3.1 Agregar `favoritesReducer` al `configureStore` en `store.ts`
- [ ] 3.2 Exportar los tipos `RootState` y `AppDispatch` actualizados (ya existen, verificar que reflejan el nuevo slice)

## 4. Refactorizar RecipeCard para el botón de corazón

- [ ] 4.1 Cambiar el elemento raíz de `RecipeCard` de `<Link>` a `<div className="relative">` con `<Link>` dentro para la navegación
- [ ] 4.2 Agregar `<button>` con posición `absolute top-2 right-2` que despacha `toggleFavorite(recipe.id)`
- [ ] 4.3 Leer el estado del favorito con `useSelector` y mostrar el corazón relleno (♥) o vacío (♡) según corresponda

## 5. Extender useRecipeFilters con filtro de favoritos

- [ ] 5.1 Agregar parámetro `favoriteIds: number[]` al hook `useRecipeFilters`
- [ ] 5.2 Agregar estado `showOnlyFavorites` (boolean, default `false`) al hook
- [ ] 5.3 Agregar el filtro de favoritos al pipeline de `useMemo`: si `showOnlyFavorites` es `true`, filtrar por `favoriteIds`
- [ ] 5.4 Retornar `showOnlyFavorites` y `setShowOnlyFavorites` desde el hook

## 6. Actualizar RecipesPage

- [ ] 6.1 Leer `favoriteIds` con `useSelector(selectFavoriteIds)` en `RecipesPage`
- [ ] 6.2 Pasar `favoriteIds` a `useRecipeFilters`
- [ ] 6.3 Agregar toggle "Solo favoritos" en la barra de filtros usando `showOnlyFavorites` y `setShowOnlyFavorites`
- [ ] 6.4 Agregar mensaje vacío específico cuando `showOnlyFavorites` está activo y no hay favoritos

## 7. Agregar botón de favorito en RecipeDetailPage

- [ ] 7.1 Leer el estado del favorito con `useSelector` usando el `id` de la receta actual
- [ ] 7.2 Agregar botón de corazón junto al título de la receta que despacha `toggleFavorite(recipe.id)`
- [ ] 7.3 Mostrar el corazón relleno o vacío según el estado actual del favorito
