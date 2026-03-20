## Why

El libro de recetas actualmente solo permite ver recetas existentes; los usuarios no tienen forma de agregar nuevas recetas desde la interfaz. Esta funcionalidad es esencial para que la aplicación sea útil como un libro de recetas personal y colaborativo.

## What Changes

- Nueva página/ruta para el formulario de creación de recetas (`/recipes/new`)
- Formulario completo con campos: nombre, descripción, ingredientes (lista dinámica), pasos de preparación (lista dinámica con reordenamiento), categoría (dropdown desde API), dificultad (Fácil/Media/Difícil), tiempo de preparación y URL de imagen
- Validación de todos los campos requeridos con mensajes de error en español
- Integración con `POST /recipes` mediante RTK Query mutation
- Botón "Agregar Receta" en la lista de recetas para navegar al formulario

## Capabilities

### New Capabilities

- `recipe-create-form`: Formulario completo para crear nuevas recetas con validación, campos dinámicos (ingredientes y pasos), y persistencia mediante POST /recipes

### Modified Capabilities

- `recipe-listing`: Se agrega un botón/enlace "Nueva Receta" que navega a `/recipes/new`. El requisito de navegación hacia la creación es nuevo.

## Impact

- **Nuevos archivos**: `src/features/recipes/pages/CreateRecipePage.tsx`, `src/features/recipes/components/RecipeForm.tsx`, componentes auxiliares para ingredientes y pasos
- **Archivos modificados**: `src/app/router.tsx` (nueva ruta), `src/features/recipes/api/recipesApi.ts` (mutation `createRecipe`), `src/features/recipes/pages/RecipeListPage.tsx` (botón de navegación)
- **Dependencias**: React Hook Form + Zod (ya en el stack), `@dnd-kit` o reordenamiento manual para los pasos
- **API**: Usa `POST /recipes` ya disponible en JSON Server
