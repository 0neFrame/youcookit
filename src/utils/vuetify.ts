import "vuetify/styles"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"

import { createVuetify } from "vuetify"

export default createVuetify({
   components,
   directives,

   defaults: {
      VCheckbox: {
         hideDetails: true,
         density: "compact",
      },
      VSelect: {
         hideDetails: true,
         density: "comfortable",
      },
      VOverlay: {
         style: "backdrop-filter: blur(10px);",
      },
   },

   theme: {
      themes: {
         light: {
            dark: false,
            colors: {
               background: "#0A2E2A",
               surface: "#0A2E2A",

               primary: "#00bd7e",
               secondary: "#F8F9FA",
            },
         },
      },
   },
})
