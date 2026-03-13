import { useMemo, useState } from "react";
import type { Recipe } from "../../../store/recipesApi";

export function useRecipeFilters(recipes: Recipe[]) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = searchText.toLowerCase().trim();

    return recipes.filter((recipe) => {
      const matchesText =
        normalizedSearch === "" ||
        recipe.name.toLowerCase().includes(normalizedSearch) ||
        recipe.description?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "" || recipe.category === selectedCategory;

      return matchesText && matchesCategory;
    });
  }, [recipes, searchText, selectedCategory]);

  return {
    filteredRecipes,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    resultCount: filteredRecipes.length,
  };
}
