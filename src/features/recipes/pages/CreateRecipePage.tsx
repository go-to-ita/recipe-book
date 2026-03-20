import { Link } from "react-router-dom";
import { RecipeForm } from "../components/RecipeForm";

export function CreateRecipePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link
        to="/recipes"
        className="mb-6 inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        ← Volver al listado
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Nueva receta</h1>

      <RecipeForm />
    </main>
  );
}
