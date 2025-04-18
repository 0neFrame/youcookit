import axios from "@/utils/axios"

const searchRecipes = async (params: object) => {
   const response = await axios.get(`/recipes/complexSearch`, {
      params: deleteEmptyParam(params as Record<string, unknown>),
   })
   return response.data
}

const getRecipeDetails = async (id: number) => {
   const response = await axios.get(`/recipes/${id}/information`, {
      params: {
         includeNutrition: true,
      },
   })
   return response.data
}

function deleteEmptyParam<T extends Record<string, unknown>>(params: T): Partial<T> {
   return Object.fromEntries(Object.entries(params).filter(([, value]) => Boolean(value))) as Partial<T>
}

export default { getRecipeDetails, searchRecipes }
