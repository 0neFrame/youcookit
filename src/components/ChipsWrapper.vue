<script setup lang="ts">
import type { ChipList } from "@/types"

const modelValue = defineModel<string[]>("chipsValue", {
   default: [],
})

const props = defineProps<{
   chipsList: ChipList
}>()
</script>

<template>
   <v-sheet class="py-4 px-1">
      <v-chip-group v-model="modelValue" selected-class="text-primary" multiple>
         <div v-for="(item, itemIndx) in props.chipsList" :key="itemIndx" class="py-4">
            <p>
               <b>{{ item.title }}</b>
            </p>

            <p>
               <v-chip v-for="(chip, chipIndx) in item.list" :key="chipIndx" :text="chip" :value="chip" variant="outlined"></v-chip>
            </p>
         </div>
      </v-chip-group>
   </v-sheet>
</template>
