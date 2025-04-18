import type { RecipeList, RecipeParams } from "@/types"
import { defineStore } from "pinia"

export const useRecipesStore = defineStore("recipes", {
   state: () => ({
      savedRecipes: [] as Required<RecipeList>,
      savedRecipesSearchParams: {
         cuisine: "",
         includeIngredients: "",
         type: "",
         offset: 0,
      } as Required<RecipeParams>,
      savedTotalRecipes: 0 as Required<number>,
   }),

   actions: {
      saveSearchedRecipes(recipes: Required<RecipeList>) {
         this.savedRecipes = recipes
      },
      saveSearchParams(searchParams: Required<RecipeParams>) {
         this.savedRecipesSearchParams = searchParams
      },
      saveTotalRecipes(totalRecipes: number) {
         this.savedTotalRecipes = totalRecipes
      },
   },
})
