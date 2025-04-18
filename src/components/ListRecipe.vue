<script setup lang="ts">
import type { RecipeList } from "@/types"

const props = defineProps<{
   loading: boolean
   recipes: RecipeList
}>()
</script>

<template>
   <div v-if="props.loading">Loading...</div>
   <div v-else>
      <ul v-if="props.recipes.length" class="mb-5 recipe-list">
         <li v-for="recipe in props.recipes" :key="recipe.id">
            <router-link :to="`/recipe/${recipe.id}`">
               {{ recipe.title }}
            </router-link>
         </li>
      </ul>
   </div>
</template>
