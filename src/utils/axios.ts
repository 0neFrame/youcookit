import axios from "axios"

axios.defaults.baseURL = "https://api.spoonacular.com"

axios.defaults.params = {
   apiKey: import.meta.env.VITE_API_KEY,
}

export default axios
