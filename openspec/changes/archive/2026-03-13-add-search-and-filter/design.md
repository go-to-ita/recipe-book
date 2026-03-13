## Context

El listado de recetas (`RecipesPage` + `RecipeList`) ya funciona con RTK Query. Este change añade dos controles de filtrado que operan sobre los datos ya cargados en cliente: una búsqueda por texto libre y un selector de categoría. Las categorías se obtienen de un segundo endpoint (`GET /categories`).

El filtrado se implementa en cliente (sobre el array en memoria) dado que el volumen de datos es pequeño y la API mock no soporta query params de filtrado.

## Goals / Non-Goals

**Goals:**
- Filtrado en cliente sobre el array de recetas ya cargado por RTK Query
- Búsqueda por `name` y `description` (case-insensitive)
- Filtro de categoría con opciones cargadas desde `GET /categories`
- Ambos filtros combinados con AND
- Contador "X recetas encontradas" actualizado en tiempo real
- Estado vacío específico cuando no hay coincidencias (distinto del estado "sin recetas")

**Non-Goals:**
- Filtrado server-side (fuera del alcance con JSON Server)
- Búsqueda con debounce/throttle avanzado (el volumen no lo requiere)
- Filtros adicionales (dificultad, tiempo) — feature separado
- Persistencia del estado de filtros en URL o localStorage

## Decisions

### 1. Estado de filtros en `RecipesPage` con hook `useRecipeFilters`
El estado (`searchText`, `selectedCategory`) vive en `RecipesPage` y se extrae a un hook `useRecipeFilters` que también expone la lógica de filtrado. Así `RecipeList` permanece "tonto" (recibe las recetas ya filtradas) y los controles son componentes controlados.

**Alternativa descartada**: estado global en Redux — innecesario para estado UI local efímero.

### 2. Filtrado en cliente con `useMemo`
`useRecipeFilters` aplica los filtros sobre el array completo usando `useMemo` para evitar recálculos innecesarios. La búsqueda normaliza texto con `.toLowerCase()`.

**Alternativa descartada**: RTK Query con query params — JSON Server soporta `?name_like=` pero no búsqueda combinada; además requeriría debounce y más endpoints.

### 3. `CategoryFilter` como `<select>` nativo
Se usa un `<select>` HTML nativo con Tailwind en lugar de un componente de dropdown custom. Simple, accesible, sin dependencias adicionales.

### 4. Endpoint `getCategories` en `recipesApi.ts`
Se añade el endpoint `getCategories` al mismo `createApi` existente. Las categorías se asumen como array de strings o de objetos `{ id, name }` — el componente normaliza ambos casos.

## Risks / Trade-offs

- **[Riesgo] Formato de `/categories` desconocido** → El componente `CategoryFilter` normaliza tanto `string[]` como `{id, name}[]`. Si el formato difiere, mostrar las opciones como JSON stringify es aceptable para el MVP.
- **[Trade-off] Filtrado en cliente** → Con catálogos grandes (>500 recetas) puede haber lag perceptible. Aceptable para el MVP; se migra a server-side cuando sea necesario.
- **[Riesgo] `description` ausente en los datos** → La búsqueda sobre `description` es tolerante a undefined (`?.includes`).
