const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db")
const axios = require("axios")
const { cleanRecipes, cleanRecipesDB } = require("../controllers/cleanersData")
const auxiliarRecipes = require("./auxiliarRecetas")

const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
   
const getAllRecipes = async()=>{
    const dataBaseRaw = await Recipe.findAll({
        include: [{
          model: Diets,
          as: 'diets',
          attributes: ["name"], // Puedes especificar los atributos que deseas traer de la tabla Diets
          through: { attributes: [] }, // Opcionalmente, puedes excluir los atributos de la tabla intermedia RecipeDiets
        }],
      })
    
    // const apiRecipesRaw = (await axios.get(`${URL}`)).data.results
    // const apiRecipes = cleanRecipes(apiRecipesRaw);
    const apiRecipes = cleanRecipes(auxiliarRecipes)
    const dataBaseRecipes = cleanRecipesDB(dataBaseRaw)
    return [...dataBaseRecipes, ...apiRecipes]

}
module.exports =  getAllRecipes;
