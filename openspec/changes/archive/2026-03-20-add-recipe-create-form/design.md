## Context

El proyecto tiene una arquitectura de features por dominio (`src/features/recipes/`). Ya existe un slice de RTK Query para recetas con queries (`getRecipes`, `getRecipeById`), pero no hay mutation para crear. El formulario debe integrarse al mismo patrón: React Hook Form + Zod para validación, RTK Query para persistencia, Tailwind v4 para estilos.

Estado actual: la app es read-only; solo lista y muestra detalle de recetas.

## Goals / Non-Goals

**Goals:**
- Agregar ruta `/recipes/new` con formulario de creación completo
- Campos dinámicos para ingredientes (agregar/quitar) y pasos (agregar/quitar/reordenar)
- Validación client-side con Zod + mensajes de error en español
- Persistencia via `POST /recipes` usando RTK Query mutation
- Botón "Nueva Receta" en la página de listado
- Redirección al listado tras crear exitosamente

**Non-Goals:**
- Edición de recetas existentes (PATCH/PUT)
- Upload de imágenes (solo URL de imagen)
- Drag-and-drop avanzado para reordenar pasos (se usará botones up/down)
- Autenticación/autorización

## Decisions

### 1. Reordenamiento de pasos: botones up/down en lugar de drag-and-drop

**Decisión**: Botones ▲/▼ junto a cada paso para mover hacia arriba/abajo.

**Alternativa considerada**: `@dnd-kit/sortable` para drag-and-drop.

**Rationale**: Añadir `@dnd-kit` es una dependencia nueva no trivial. Los botones up/down son suficientes para el caso de uso y mantienen la coherencia con el stack actual sin overhead de configuración.

### 2. Validación con Zod + React Hook Form (patrón existente)

**Decisión**: Usar `useForm` con `zodResolver` y un schema Zod centralizado.

**Rationale**: Es el patrón definido en el stack del proyecto. No se introduce nada nuevo; se replica lo que ya existe en el proyecto.

### 3. Categorías desde API (GET /categories)

**Decisión**: El dropdown de categorías carga datos de `GET /categories` via RTK Query (query existente o nuevo endpoint en el mismo slice).

**Alternativa considerada**: Lista hardcodeada de categorías.

**Rationale**: Los datos ya están disponibles en la API y usar la API mantiene consistencia con el resto de la app. También evita desincronización si se agregan categorías.

### 4. Estructura de archivos

```
src/features/recipes/
  pages/
    CreateRecipePage.tsx          ← nueva página/ruta
  components/
    RecipeForm.tsx                ← formulario principal
    IngredientFields.tsx          ← sub-componente lista de ingredientes
    StepFields.tsx                ← sub-componente lista de pasos
  schemas/
    recipeForm.schema.ts          ← schema Zod + tipos inferidos
  api/
    recipesApi.ts                 ← agregar mutation createRecipe
```

**Archivos modificados:**
- `src/app/router.tsx` — agregar ruta `/recipes/new`
- `src/features/recipes/api/recipesApi.ts` — agregar endpoint `createRecipe`
- `src/features/recipes/pages/RecipeListPage.tsx` — agregar botón "Nueva Receta"

## Risks / Trade-offs

- **[Riesgo] JSON Server acepta cualquier cuerpo en POST** → No hay validación server-side, toda la validación es client-side. Mitigation: El schema Zod es exhaustivo y se aplica antes de enviar.
- **[Trade-off] Reordenamiento con botones vs DnD** → UX menos fluida para listas largas. Mitigation: Aceptable para un libro de recetas personal; se puede mejorar después.
- **[Riesgo] URLs de imagen inválidas** → El campo acepta cualquier string. Mitigation: Validar formato URL en el schema Zod; mostrar placeholder si la imagen no carga (patrón ya existente en RecipeCard).
