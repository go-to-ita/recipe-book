## 1. Types y Schema

- [x] 1.1 Crear `src/features/recipes/schemas/recipeForm.schema.ts` con schema Zod para el formulario (nombre, descripción, ingredientes, pasos, categoría, dificultad, tiempo, imageUrl opcional con validación URL)
- [x] 1.2 Inferir y exportar el tipo `RecipeFormData` desde el schema Zod

## 2. API — Mutation createRecipe

- [x] 2.1 Agregar endpoint `createRecipe` (mutation POST /recipes) al slice RTK Query existente en `src/features/recipes/api/recipesApi.ts`
- [x] 2.2 Verificar que el endpoint `getCategories` exista en el slice (o agregarlo si falta) para poblar el dropdown de categorías

## 3. Componentes del Formulario

- [x] 3.1 Crear `src/features/recipes/components/IngredientFields.tsx` — lista dinámica de ingredientes con botones Agregar/Quitar; el botón Quitar está deshabilitado cuando solo hay un ingrediente
- [x] 3.2 Crear `src/features/recipes/components/StepFields.tsx` — lista dinámica de pasos con botones Agregar/Quitar/▲/▼; los botones ▲/▼ se deshabilitan en los extremos
- [x] 3.3 Crear `src/features/recipes/components/RecipeForm.tsx` — formulario principal que integra React Hook Form + zodResolver, todos los campos (nombre, descripción, categoría dropdown, dificultad radio/select, tiempo, imageUrl), `IngredientFields`, `StepFields`, y muestra mensajes de error por campo
- [x] 3.4 Mostrar estado de carga en el botón "Guardar receta" mientras `POST /recipes` está en curso y deshabilitar el botón para evitar doble envío
- [x] 3.5 Mostrar mensaje de error global si `POST /recipes` falla, sin perder los datos del formulario

## 4. Página y Ruta

- [x] 4.1 Crear `src/features/recipes/pages/CreateRecipePage.tsx` — página que renderiza `RecipeForm`, incluye título y enlace "Volver" a `/`
- [x] 4.2 Agregar la ruta `/recipes/new` en `src/app/router.tsx` apuntando a `CreateRecipePage`
- [x] 4.3 Confirmar que la ruta `/recipes/new` tiene prioridad sobre `/recipes/:id` en el router

## 5. Integración en el Listado

- [x] 5.1 Agregar botón/enlace "Nueva Receta" en `src/features/recipes/pages/RecipeListPage.tsx` que navegue a `/recipes/new`

## 6. Flujo post-envío

- [x] 6.1 Implementar redirección automática a `/` (listado) tras `POST /recipes` exitoso
- [x] 6.2 Verificar que RTK Query invalida o refetch la query `getRecipes` tras la creación exitosa, para que el listado refleje la nueva receta

## 7. Verificación Visual

- [x] 7.1 Probar flujo completo: navegar a `/recipes/new`, completar todos los campos, guardar y verificar que la receta aparece en el listado
- [x] 7.2 Probar validación: intentar enviar con campos vacíos y verificar que aparecen mensajes de error en español junto a cada campo
- [x] 7.3 Probar campos dinámicos: agregar/quitar ingredientes y pasos; reordenar pasos con ▲/▼
- [x] 7.4 Probar URL de imagen inválida: verificar mensaje de error de formato URL
