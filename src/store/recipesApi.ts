import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Recipe {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  prepTime: number;
  imageUrl: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
}

export type Category = string | { id: number; name: string };

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipe"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: ["Recipe"],
    }),
    createRecipe: builder.mutation<Recipe, Omit<Recipe, "id">>({
      query: (newRecipe) => ({
        url: "/recipes",
        method: "POST",
        body: newRecipe,
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetCategoriesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
} = recipesApi;
