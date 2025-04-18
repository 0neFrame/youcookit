import type { Recipe, RecipeList } from "@/types"
import { defineStore } from "pinia"

export const useFavoritesStore = defineStore("favorites", {
   state: () => ({
      favorites: [] as RecipeList,
   }),

   actions: {
      addFavorite(recipe: Recipe) {
         if (!this.favorites.some((favorite) => favorite?.id === recipe.id)) {
            this.favorites.push(recipe)
         }
      },
      removeFavorite(id: number) {
         this.favorites = this.favorites.filter((favId) => favId?.id !== id)
      },
   },
})
