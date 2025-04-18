<script setup lang="ts">
import { computed, ref, shallowRef } from "vue"
import { useRecipesStore } from "@/stores/recipes"
import recipeService from "@/api/recipeService"

import DialogFilterSearch from "@/components/DialogFilterSearch.vue"
import ControlsRecipePages from "@/components/ControlsRecipePages.vue"
import ListRecipe from "@/components/ListRecipe.vue"
import type { RecipeList } from "@/types"

const { savedRecipes, savedRecipesSearchParams, savedTotalRecipes, saveSearchParams, saveSearchedRecipes, saveTotalRecipes } = useRecipesStore()

const loading = shallowRef<boolean>(false)

const cuisinesCountries = shallowRef<string[]>(savedRecipesSearchParams.cuisine.split(","))
const includeIngredients = shallowRef<string[]>(savedRecipesSearchParams.includeIngredients.split(","))
const mealType = shallowRef<string[]>(savedRecipesSearchParams.type.split(","))

const recipes = ref<RecipeList>(savedRecipes)
const skipRecipes = shallowRef<number>(savedRecipesSearchParams.offset)
const totalRecipes = shallowRef<number>(savedTotalRecipes)

const searchRecipesParams = computed(() => ({
   cuisine: cuisinesCountries.value.join(),
   includeIngredients: includeIngredients.value.join(),
   offset: skipRecipes.value,
   type: mealType.value.join(),
}))

async function searchRecipes() {
   loading.value = true

   try {
      const dataRecipes = await recipeService.searchRecipes(searchRecipesParams.value)

      recipes.value = dataRecipes.results
      totalRecipes.value = dataRecipes.totalResults

      saveSearchParams(searchRecipesParams.value)
      saveSearchedRecipes(dataRecipes.results)
      saveTotalRecipes(dataRecipes.totalResults)
   } catch (error) {
      console.error("Ошибка при поиске рецептов:", error)
   } finally {
      loading.value = false
   }
}
</script>

<template>
   <div class="home">
      <DialogFilterSearch
         v-model:select-cuisines="cuisinesCountries"
         v-model:select-ingredients="includeIngredients"
         v-model:select-meal-type="mealType"
         @search-recipes="searchRecipes"
      ></DialogFilterSearch>

      <ControlsRecipePages v-model:skip-recipes="skipRecipes" :loading="loading" :recipes="recipes" :total-recipes="totalRecipes" @search-recipes="searchRecipes"></ControlsRecipePages>

      <ListRecipe :loading="loading" :recipes="recipes"></ListRecipe>
   </div>
</template>
