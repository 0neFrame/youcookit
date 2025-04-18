<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
   <header>
      <div class="wrapper">
         <nav>
            <RouterLink to="/">Search</RouterLink>
            <RouterLink to="/favorites">Favorites</RouterLink>
            <RouterLink to="/statistic">Statistic</RouterLink>
         </nav>
      </div>
   </header>
</template>

<style scoped>
header {
   justify-content: center;
   line-height: 1.5;
   padding: 18px;
   margin-bottom: 12px;
}

nav {
   display: flex;
   font-size: 16px;
   justify-content: center;
   width: 100%;
}

nav a:hover {
   background-color: #125049;
}

nav a.router-link-exact-active {
   color: #00af75;
   font-weight: 700;
}

nav a.router-link-exact-active:hover {
   background-color: transparent;
}

nav a {
   display: inline-block;
   border-left: 1px solid #00bd7e;
   min-width: 90px;
   max-width: 90px;
   text-align: center;
}

nav a:first-of-type {
   border: 0;
}

@media (min-width: 1024px) {
   header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
   }

   header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
   }

   nav {
      font-size: 1rem;
      padding: 1rem 0;
   }
}
</style>
