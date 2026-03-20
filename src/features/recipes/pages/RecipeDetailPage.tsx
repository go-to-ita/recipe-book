import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery, type Recipe } from "../../../store/recipesApi";

function buildWhatsAppUrl(recipe: Recipe): string {
  const text = `🍽️ *${recipe.name}* (${recipe.category})\n\n${window.location.href}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

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

      {/* Compartir */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <a
          href={buildWhatsAppUrl(recipe)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1ebe5d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.054 23.25a.75.75 0 00.916.989l5.579-1.459A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.355l-.355-.211-3.676.962.98-3.578-.231-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          Compartir por WhatsApp
        </a>
      </div>
    </div>
  );
}
