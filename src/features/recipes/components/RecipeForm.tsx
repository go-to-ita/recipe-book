import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { recipeFormSchema, type RecipeFormData } from "../schemas/recipeForm.schema";
import { useCreateRecipeMutation, useGetCategoriesQuery, type Category } from "../../../store/recipesApi";
import { IngredientFields } from "./IngredientFields";
import { StepFields } from "./StepFields";

function getCategoryLabel(cat: Category): string {
  return typeof cat === "string" ? cat : cat.name;
}

export function RecipeForm() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading, isError }] = useCreateRecipeMutation();
  const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();

  const methods = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      difficulty: undefined as unknown as RecipeFormData["difficulty"],
      prepTime: undefined as unknown as number,
      imageUrl: "",
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RecipeFormData) => {
    try {
      await createRecipe({
        name: data.name,
        description: data.description,
        category: data.category,
        difficulty: data.difficulty,
        prepTime: data.prepTime,
        imageUrl: data.imageUrl,
        ingredients: data.ingredients.map((i) => i.value),
        steps: data.steps.map((s) => s.value),
      }).unwrap();
      navigate("/recipes");
    } catch {
      // isError from the hook handles the UI feedback
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
            Error al guardar la receta. Por favor intenta de nuevo.
          </div>
        )}

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Ej. Tacos al Pastor"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            placeholder="Breve descripción de la receta..."
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Categoría + Dificultad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category")}
              disabled={loadingCategories}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-white disabled:opacity-60"
            >
              <option value="">
                {loadingCategories ? "Cargando..." : "Selecciona una categoría"}
              </option>
              {categories.map((cat, i) => {
                const label = getCategoryLabel(cat);
                return (
                  <option key={i} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dificultad <span className="text-red-500">*</span>
            </label>
            <select
              {...register("difficulty")}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 bg-white"
            >
              <option value="">Selecciona dificultad</option>
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
            {errors.difficulty && (
              <p className="text-sm text-red-500 mt-1">{errors.difficulty.message}</p>
            )}
          </div>
        </div>

        {/* Tiempo de preparación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiempo de preparación (minutos) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("prepTime", { valueAsNumber: true })}
            type="number"
            min={1}
            placeholder="Ej. 30"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          {errors.prepTime && (
            <p className="text-sm text-red-500 mt-1">{errors.prepTime.message}</p>
          )}
        </div>

        {/* URL de imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de imagen{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            {...register("imageUrl")}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
          />
          {errors.imageUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Ingredientes */}
        <IngredientFields />

        {/* Pasos */}
        <StepFields />

        {/* Botón envío */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar receta"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
