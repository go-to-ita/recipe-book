import { useGetRecipesQuery } from "../../../store/recipesApi";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        <p className="text-lg font-medium">Error al cargar las recetas</p>
        <p className="text-sm text-red-400 mt-1">
          Verifica que el servidor mock esté activo en http://localhost:3001
        </p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No hay recetas disponibles</p>
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
