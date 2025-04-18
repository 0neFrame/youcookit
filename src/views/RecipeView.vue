<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

import recipeService from "@/api/recipeService"
import IndexedDB from "@/utils/IndexedDB"
import type { Recipe } from "@/types"

const isFavorite = ref<boolean>(false)
const isLoadRecipe = ref<boolean>(true)
const route = useRoute()
const recipe = ref<Recipe>()

async function setRecipeFavorite(recipe: Recipe) {
   if (!isFavorite.value) {
      isFavorite.value = true

      const { analyzedInstructions, extendedIngredients, nutrition } = recipe

      IndexedDB.addRecord("favorites", {
         ...recipe,
         analyzedInstructions: JSON.stringify(analyzedInstructions),
         extendedIngredients: JSON.stringify(extendedIngredients),
         nutrition: JSON.stringify(nutrition),
      })
   } else {
      isFavorite.value = false
      IndexedDB.deleteRecord("favorites", recipe.id)
   }
}

function showIngredientNameClean(nameOriginal: string, nameClean: string) {
   return !nameOriginal.toLocaleLowerCase().includes(nameClean.toLocaleLowerCase()) || nameOriginal.length < nameClean.length
}

onMounted(async () => {
   const id = parseInt(route.params.id as string, 10)
   if (isNaN(id)) return

   try {
      const data = await IndexedDB.getRecord("favorites", id)
      recipe.value = data as typeof recipe.value
      isFavorite.value = true
      isLoadRecipe.value = false
   } catch (error1) {
      console.error("Ошибка:", error1)

      try {
         const data = await recipeService.getRecipeDetails(id)
         recipe.value = data as typeof recipe.value
         isLoadRecipe.value = false
      } catch (error2) {
         console.error("Ошибка при получении деталей рецепта:", error2)
         isLoadRecipe.value = false
      }
   }
})
</script>

<template>
   <div v-if="recipe?.id" class="recipe-details">
      <h1>{{ recipe.title }}</h1>

      <v-img :src="recipe.image" :alt="recipe.title" max-width="600" cover rounded>
         <div class="favorite-btn">
            <v-btn density="comfortable" :color="isFavorite ? 'red' : 'black'" icon="mdi-heart" @click="setRecipeFavorite(recipe)"></v-btn>
         </div>
      </v-img>

      <p>Время приготовления: {{ recipe.readyInMinutes }} минут</p>

      <p v-if="typeof recipe.nutrition !== 'string' && recipe.nutrition?.weightPerServing">Порция: {{ recipe.nutrition.weightPerServing.amount }}{{ recipe.nutrition.weightPerServing.unit }}</p>

      <h2>Питательные вещества:</h2>

      <P v-if="typeof recipe.nutrition !== 'string' && recipe.nutrition?.nutrients">
         <ul v-for="(nutrient, nutrientIndx) in recipe.nutrition.nutrients" :key="nutrientIndx">
            <span v-if="typeof nutrient !== 'string' && (nutrient.amount as number) > 10 && nutrient.unit === 'g'">
               <li>{{ nutrient.name }} - {{ nutrient.amount }}{{ nutrient.unit }}</li>
            </span>
         </ul>
      </P>

      <h2>Ингредиенты:</h2>

      <ul>
         <li v-for="(ingredient, ingredientIndx) in recipe.extendedIngredients" :key="ingredientIndx">
            <span v-if="typeof ingredient !== 'string' && ingredient">
               {{ ingredient.original }}
               <span v-if="showIngredientNameClean(ingredient.original, ingredient.nameClean)"> ({{ ingredient.nameClean }}) </span>
            </span>
         </li>
      </ul>

      <h2>Шаги:</h2>

      <ol v-if="typeof recipe !== 'string' && typeof recipe.analyzedInstructions !== 'string' && recipe.analyzedInstructions">
         <li v-for="(step, stepIndx) in recipe.analyzedInstructions[0]?.steps" :key="stepIndx">
            {{ step.step }}
         </li>
      </ol>
   </div>

   <div v-else class="ma-8">
      <v-progress-circular v-if="isLoadRecipe" color="primary" indeterminate :size="128"></v-progress-circular>
      <h1 v-else>Нет такого рецепта</h1>
   </div>
</template>
