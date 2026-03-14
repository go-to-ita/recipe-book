## Context

El store de Redux actualmente solo contiene el reducer de RTK Query (`recipesApi`). No existe ningún slice de estado local. Los favoritos son el primer estado propio de la app (no derivado del servidor), lo que requiere introducir `createSlice`. La persistencia debe sobrevivir a recargas de página sin depender del servidor mock.

## Goals / Non-Goals

**Goals:**
- Agregar `favoritesSlice` con acción `toggleFavorite(id)` y selectores `selectFavoriteIds` / `selectIsFavorite(id)`.
- Persistir el estado de favoritos en `localStorage` mediante suscripción al store.
- Mostrar botón de corazón en `RecipeCard` y `RecipeDetailPage`.
- Agregar toggle "Solo favoritos" en `RecipesPage` que filtra el listado.

**Non-Goals:**
- Sincronización entre dispositivos o usuarios.
- Endpoint de favoritos en JSON Server.
- Dependencia de `redux-persist` u otras librerías externas.

## Decisions

### 1. Redux slice en lugar de hook con localStorage

El estado de favoritos es necesario en tres componentes sin relación directa de padre-hijo: `RecipeCard` (dentro de la grid), `RecipeDetailPage` y `RecipesPage` (para el filtro). Pasarlo por props requeriría elevar el estado hasta `App.tsx` con múltiples niveles de prop drilling. Redux resuelve esto con acceso directo desde cualquier componente.

**Alternativa descartada:** custom hook `useFavorites` con `useState` + `localStorage` — funciona para un componente, pero no sincroniza el estado entre `RecipeCard` y `RecipeDetailPage` si se usa en ambos.

### 2. Persistencia manual con localStorage (sin redux-persist)

El estado de favoritos es un array de números (`number[]`), trivialmente serializable. Se implementa con una suscripción al store (`store.subscribe`) que guarda en `localStorage['recipe-favorites']` cada vez que cambia el slice. Al iniciar, se lee `localStorage` como `preloadedState`.

**Alternativa descartada:** `redux-persist` — añade una dependencia y complejidad (purga, versioning, rehydration) innecesaria para un array simple.

### 3. Botón corazón fuera del flujo del `<Link>` en RecipeCard

`RecipeCard` es actualmente un `<Link>` que envuelve toda la card. Poner un `<button>` dentro de un `<Link>` es HTML inválido (elementos interactivos anidados). La solución es envolver la card en un `<div className="relative">`, mantener el `<Link>` para la navegación, y posicionar el botón de corazón con `absolute top-2 right-2`.

**Alternativa descartada:** `e.stopPropagation()` dentro del link — técnicamente funciona pero viola la semántica HTML y puede causar problemas de accesibilidad.

### 4. Filtro "Solo favoritos" en useRecipeFilters

El hook ya centraliza toda la lógica de filtrado (búsqueda + categoría). Se agrega `showOnlyFavorites: boolean` como tercer filtro. Cuando está activo, se intersecta con los resultados de los otros filtros (no los reemplaza). El hook necesita recibir los `favoriteIds` como parámetro.

## Risks / Trade-offs

- **localStorage puede estar deshabilitado** (modo privado en algunos browsers) → `try/catch` en lectura/escritura; si falla, los favoritos funcionan en memoria sin persistir.
- **El botón corazón en RecipeCard necesita refactor del markup** → `RecipeCard` pasa de ser un `<Link>` raíz a un `<div>` con `<Link>` y `<button>` hermanos. Cambio estructural acotado.
- **`selectIsFavorite` recibe `id`** → para usarlo en `RecipeCard` necesita un selector con argumento. Se puede implementar como selector factory o derivar inline con `useSelector(state => state.favorites.ids.includes(recipe.id))`.
