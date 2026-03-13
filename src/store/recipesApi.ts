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
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetCategoriesQuery, useGetRecipeByIdQuery } = recipesApi;
