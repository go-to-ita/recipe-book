import { useGetRecipesQuery } from "../../../store/recipesApi";
import { CategoryFilter } from "../components/CategoryFilter";
import { RecipeList } from "../components/RecipeList";
import { SearchBar } from "../components/SearchBar";
import { useRecipeFilters } from "../hooks/useRecipeFilters";

export function RecipesPage() {
  const { data: recipes = [], isLoading, isError } = useGetRecipesQuery();
  const {
    filteredRecipes,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    resultCount,
  } = useRecipeFilters(recipes);

  const hasActiveFilters = searchText.trim() !== "" || selectedCategory !== "";

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recetas</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <SearchBar value={searchText} onChange={setSearchText} />
        </div>
        <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {!isLoading && !isError && (
        <p className="text-sm text-gray-500 mb-6">
          {resultCount} {resultCount === 1 ? "receta encontrada" : "recetas encontradas"}
        </p>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-600">
          <p className="text-lg font-medium">Error al cargar las recetas</p>
          <p className="text-sm text-red-400 mt-1">
            Verifica que el servidor mock esté activo en http://localhost:3001
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <RecipeList recipes={filteredRecipes} hasActiveFilters={hasActiveFilters} />
      )}
    </main>
  );
}
