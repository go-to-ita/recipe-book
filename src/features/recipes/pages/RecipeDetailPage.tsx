import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../../../store/recipesApi";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
        <p className="text-gray-500 text-lg">No se encontró la receta.</p>
        <button
          onClick={() => navigate("/recipes")}
          className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/recipes")}
        className="mb-6 flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        ← Volver al listado
      </button>

      {/* Imagen */}
      <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Nombre y metadatos */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{recipe.name}</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{recipe.category}</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{recipe.difficulty}</span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">⏱ {recipe.prepTime} min</span>
      </div>

      {recipe.description && (
        <p className="text-gray-600 mb-6">{recipe.description}</p>
      )}

      {/* Ingredientes */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Ingredientes</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="mt-1 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pasos */}
      {recipe.steps && recipe.steps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Preparación</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-600 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
