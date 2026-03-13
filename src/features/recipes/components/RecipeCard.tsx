import { Link } from "react-router-dom";
import type { Recipe } from "../../../store/recipesApi";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-100">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 leading-tight">
          {recipe.name}
        </h2>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
            {recipe.category}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-auto">
          ⏱ {recipe.prepTime} min
        </p>
      </div>
    </Link>
  );
}
