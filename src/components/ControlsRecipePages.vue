<script setup lang="ts">
import type { RecipeList } from "@/types"
import { computed } from "vue"

const skipRecipes = defineModel<number>("skipRecipes", {
   default: 0,
})

const props = defineProps<{
   loading: boolean
   recipes: RecipeList
   totalRecipes: number
}>()

const emit = defineEmits(["searchRecipes"])

const disabledBtnNext = computed(() => skipRecipes.value + 10 >= props.totalRecipes)
const pageCounter = computed(() => skipRecipes.value / 10 + 1)
const totalPages = computed(() => (props.totalRecipes > 10 ? Math.floor(props.totalRecipes / 10) + 1 : 1))
const showPagesCount = computed(() => props.totalRecipes > props.recipes.length || !(skipRecipes.value === 0 && disabledBtnNext.value) || pageCounter.value !== totalPages.value)

function setOffsetRecipes(quantity: number) {
   skipRecipes.value += quantity
   emit("searchRecipes")
}
</script>

<template>
   <div class="my-4">
      <p v-if="totalRecipes">
         <span class="mx-5">
            <b> {{ totalRecipes }} </b> recipes found
         </span>

         <span v-if="showPagesCount" class="align-center">
            <v-btn :disabled="!skipRecipes" icon="mdi-chevron-left" @click="setOffsetRecipes(-10)"></v-btn>
            <b class="mx-2">Pages: {{ pageCounter }} / {{ totalPages }}</b>
            <v-btn :disabled="disabledBtnNext" icon="mdi-chevron-right" @click="setOffsetRecipes(10)"></v-btn>
         </span>
      </p>
      <p v-else><span v-if="!loading"> There are no recipes. Use filters wisely.</span></p>
   </div>
</template>
