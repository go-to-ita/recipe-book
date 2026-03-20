import { z } from "zod";

export const recipeFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  category: z.string().min(1, "Selecciona una categoría"),
  difficulty: z.enum(["Fácil", "Media", "Difícil"]),
  prepTime: z.number().positive("El tiempo debe ser mayor a 0").int("El tiempo debe ser un número entero"),
  imageUrl: z.string().refine(
    (val) => val === "" || /^https?:\/\/.+/.test(val),
    { message: "Debe ser una URL válida (http:// o https://)" }
  ),
  ingredients: z
    .array(z.object({ value: z.string().min(1, "El ingrediente no puede estar vacío") }))
    .min(1, "Agrega al menos un ingrediente"),
  steps: z
    .array(z.object({ value: z.string().min(1, "El paso no puede estar vacío") }))
    .min(1, "Agrega al menos un paso"),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;
