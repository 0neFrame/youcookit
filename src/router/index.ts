import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/HomeView.vue"
import RecipeView from "@/views/RecipeView.vue"
import FavoritesView from "@/views/FavoritesView.vue"
import StatisticView from "@/views/StatisticView.vue"

const routes = [
   { path: "/:pathMatch(.*)*", redirect: "/" }, // Обработка ошибки 404
   { path: "/", component: Home },
   { path: "/favorites", component: FavoritesView },
   { path: "/recipe/:id", component: RecipeView },
   { path: "/statistic", component: StatisticView },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
})

export default router
