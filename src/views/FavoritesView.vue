<script setup lang="ts">
import type { RecipeList } from "@/types"
import IndexedDB from "@/utils/IndexedDB"
import { onUnmounted, shallowReactive, shallowRef } from "vue"

const favoriteList = shallowRef<RecipeList>([])
const deleteList = shallowReactive<number[]>([])

IndexedDB.getRecords("favorites").then((favorites) => {
   favoriteList.value = favorites as typeof favoriteList.value
})

function checkOnDelete(id: number) {
   return deleteList.includes(id)
}

function setDeleteFavorite(id: number) {
   if (checkOnDelete(id)) {
      const foundIndx = deleteList.findIndex((item) => item === id)
      deleteList.splice(foundIndx, 1)
   } else {
      deleteList.push(id)
   }
}

function deleteFavorite(id: number) {
   IndexedDB.deleteRecord("favorites", id)
}

onUnmounted(() => {
   if (deleteList.length) {
      deleteList.forEach((item) => {
         deleteFavorite(item)
      })
   }
})
</script>

<template>
   <div class="favorite-list">
      <router-link v-for="item in favoriteList" :key="item.id" :to="`/recipe/${item.id}`">
         <v-card class="mx-auto" max-width="300" width="300">
            <div class="favorite-btn">
               <v-btn density="comfortable" :color="checkOnDelete(item.id) ? 'black' : 'red'" icon="mdi-heart" @click="setDeleteFavorite(item.id)"></v-btn>
            </div>

            <v-img :src="item.image" color="surface-variant" cover gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" rounded class="align-end justify-space-between">
               <v-card-title class="text-white">{{ item.title }}</v-card-title>
            </v-img>
         </v-card>
      </router-link>
   </div>
</template>
