<script setup lang="ts">
import { computed, type Ref } from "vue"
import ChipsWrapper from "./ChipsWrapper.vue"

import Cuisines from "@/constants/Cuisines"
import MealTypes from "@/constants/MealTypes"
import Ingredients from "@/constants/Ingredients"

const selectIngredients = defineModel<string[]>("selectIngredients", {
   default: [],
})
const selectMealType = defineModel<string[]>("selectMealType", {
   default: [],
})
const selectCuisines = defineModel<string[]>("selectCuisines", {
   default: [],
})

const emit = defineEmits(["searchRecipes"])

const disabledBtnReset = computed(() => !selectIngredients.value.length && !selectMealType.value.length && !selectCuisines.value.length)

function resetParams() {
   selectCuisines.value = []
   selectIngredients.value = []
   selectMealType.value = []
}
function goToSearch(isDialog: Ref<boolean>) {
   emit("searchRecipes")
   isDialog.value = false
}
</script>

<template>
   <v-dialog persistent max-width="960">
      <template #activator="{ props: activatorProps }">
         <v-btn v-bind="activatorProps" block class="bg-yellow"> GO TO FILTER RECIPES </v-btn>
      </template>

      <template #default="{ isActive }">
         <v-card-actions>
            <b class="text-white">FILTERS</b>
            <v-spacer></v-spacer>
            <v-btn class="bg-white" density="compact" icon="mdi-close" @click="isActive.value = false"></v-btn>
         </v-card-actions>

         <v-card class="px-2">
            <ChipsWrapper v-model:chips-value="selectIngredients" :chips-list="Ingredients" />
            <ChipsWrapper v-model:chips-value="selectMealType" :chips-list="[{ list: MealTypes, title: 'Meal type' }]" />
            <ChipsWrapper v-model:chips-value="selectCuisines" :chips-list="[{ list: Cuisines, title: 'Cuisines countries' }]" />
         </v-card>

         <v-card-actions>
            <v-btn :disabled="disabledBtnReset" class="bg-grey" @click="resetParams()">RESET SELECTED</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-yellow" @click="goToSearch(isActive)">SEARCH</v-btn>
         </v-card-actions>
      </template>
   </v-dialog>
</template>
