import { mount } from "@vue/test-utils"
import { test, expect } from "vitest"

import HomeView from "@/views/HomeView.vue"

test("renders search input and button", () => {
   const wrapper = mount(HomeView)
   expect(wrapper.find("input").exists()).toBe(true)
   expect(wrapper.find("button").text()).toBe("Поиск")
})
