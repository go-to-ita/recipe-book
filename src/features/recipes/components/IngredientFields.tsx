import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../schemas/recipeForm.schema";

export function IngredientFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RecipeFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ingredientes <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-2">
              <input
                {...register(`ingredients.${index}.value`)}
                placeholder={`Ingrediente ${index + 1}`}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ✕
              </button>
            </div>
            {errors.ingredients?.[index]?.value && (
              <p className="text-sm text-red-500 mt-1">
                {errors.ingredients[index]?.value?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      {typeof errors.ingredients?.message === "string" && (
        <p className="text-sm text-red-500 mt-1">{errors.ingredients.message}</p>
      )}
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        + Agregar ingrediente
      </button>
    </div>
  );
}
