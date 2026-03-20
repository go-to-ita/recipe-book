import { useFieldArray, useFormContext } from "react-hook-form";
import type { RecipeFormData } from "../schemas/recipeForm.schema";

export function StepFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RecipeFormData>();

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pasos de preparación <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-2 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center mt-2">
                {index + 1}
              </span>
              <textarea
                {...register(`steps.${index}.value`)}
                placeholder={`Paso ${index + 1}`}
                rows={2}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none"
              />
              <div className="flex flex-col gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => swap(index, index - 1)}
                  disabled={index === 0}
                  className="px-2 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-xs leading-none"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => swap(index, index + 1)}
                  disabled={index === fields.length - 1}
                  className="px-2 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-xs leading-none"
                >
                  ▼
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors self-center"
              >
                ✕
              </button>
            </div>
            {errors.steps?.[index]?.value && (
              <p className="text-sm text-red-500 mt-1 ml-9">
                {errors.steps[index]?.value?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      {typeof errors.steps?.message === "string" && (
        <p className="text-sm text-red-500 mt-1">{errors.steps.message}</p>
      )}
      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
      >
        + Agregar paso
      </button>
    </div>
  );
}
