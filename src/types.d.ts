export interface Recipe {
   analyzedInstructions?: { steps?: { step?: string }[] }[] | string
   extendedIngredients?: { id: number; original: string; nameClean: string }[] | string
   id: number
   image?: string
   nutrition?:
      | {
           nutrients?: {
              name?: string
              amount?: number
              unit?: string
              percentOfDailyNeeds?: number
           }[]
           weightPerServing?: {
              amount?: number
              unit?: string
           }
        }
      | string
   readyInMinutes?: number
   title: string
}

export interface RecipeParams {
   cuisine: string
   includeIngredients: string
   offset: number
   type: string
}

export interface Chip {
   list: string[]
   title: string
}

export type RecipeList = Recipe[]
export type ChipList = Chip[]
