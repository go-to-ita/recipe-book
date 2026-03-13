import { RecipeList } from "../components/RecipeList";

export function RecipesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Recetas</h1>
      <RecipeList />
    </main>
  );
}
