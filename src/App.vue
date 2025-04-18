<script setup lang="ts">
import { RouterView } from "vue-router"
import NavHeader from "./components/NavHeader.vue"
</script>

<template>
   <v-app>
      <v-main>
         <NavHeader />
         <RouterView />
      </v-main>
   </v-app>
</template>
