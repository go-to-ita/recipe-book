import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Recipe {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  prepTime: string;
  image: string;
}

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
