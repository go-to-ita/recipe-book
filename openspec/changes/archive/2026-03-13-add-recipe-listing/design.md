## Context

El Recipe Book es una aplicación React + TypeScript construida con Vite. El stack incluye RTK Query para data fetching y Tailwind CSS v4 para estilos. Actualmente no existe ninguna vista de listado; este es el primer feature de presentación de datos de la app.

La API mock corre en JSON Server (`http://localhost:3001`) y expone `GET /recipes` con los campos necesarios para las cards.

## Goals / Non-Goals

**Goals:**
- Mostrar todas las recetas en cards con imagen, nombre, categoría, dificultad y tiempo de preparación
- Implementar el data fetching con RTK Query siguiendo el patrón del proyecto
- Manejar estados de carga, error y lista vacía en la UI
- Integrar la página en el routing principal como ruta `/`

**Non-Goals:**
- Filtrado o búsqueda de recetas (feature separado)
- Paginación (se implementa cuando el volumen lo requiera)
- Detalle de receta (feature separado)
- Creación/edición de recetas

## Decisions

### 1. Feature slice en `features/recipes/`
Se crea una carpeta `features/recipes/` con sub-carpetas `components/`, `pages/` y `api/`. Esta estructura sigue la arquitectura por dominio del proyecto, manteniendo cohesión y facilitando escalar a otros features de recetas.

**Alternativa descartada**: poner los componentes directamente en `shared/` — no aplica porque son componentes específicos de dominio, no reutilizables entre features.

### 2. RTK Query endpoint en `store/recipesApi.ts`
Se define un `createApi` con `baseUrl: 'http://localhost:3001'` y el endpoint `getRecipes`. El store existente se configura para incluir el reducer y el middleware de RTK Query.

**Alternativa descartada**: `useEffect` + `useState` para el fetch manual — contradice el patrón del proyecto y no aprovecha caché, deduplicación ni estados automáticos.

### 3. Componente `RecipeCard` en `shared/` vs `features/`
`RecipeCard` va en `features/recipes/components/` porque, por ahora, solo se usa en este feature. Si en el futuro se reutiliza en otros contextos, se mueve a `shared/`.

### 4. Tailwind CSS v4 para estilos
Se usan utility classes de Tailwind directamente en JSX. No se crean clases CSS custom para este feature.

## Risks / Trade-offs

- **[Riesgo] JSON Server no está corriendo** → La app muestra el estado de error de RTK Query. Mitigación: documentar en README que el servidor mock debe estar activo.
- **[Trade-off] Sin paginación** → Con muchas recetas el render puede ser lento. Aceptable para el MVP; se añade paginación cuando sea necesario.
- **[Riesgo] Campos faltantes en la API** → Si `image`, `category`, `difficulty` o `prepTime` no están en la respuesta, las cards muestran valores vacíos. Mitigación: el tipo TypeScript de `Recipe` define todos los campos como requeridos y el dato mock debe incluirlos.
