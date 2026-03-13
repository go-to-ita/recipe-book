import type { Recipe } from "../../../store/recipesApi";
import { RecipeCard } from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  hasActiveFilters: boolean;
}

export function RecipeList({ recipes, hasActiveFilters }: RecipeListProps) {
  if (recipes.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No se encontraron recetas</p>
          <p className="text-sm text-gray-400 mt-1">
            Prueba con otros términos de búsqueda o categoría
          </p>
        </div>
      );
    }

    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No hay recetas disponibles en el catálogo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
