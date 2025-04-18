import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import vuetify from "@/utils/vuetify"

import "./assets/index.css"

const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify)

app.mount("#app")
