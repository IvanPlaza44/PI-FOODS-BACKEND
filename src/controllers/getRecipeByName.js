const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { cleanRecipes, cleanRecipesDB } = require("./cleanersData");
const { Op } = require("sequelize");

const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`


const getRecipeByName = async (name)=>{
    





    const dataBaseRecipeRaw = await Recipe.findAll({
        where: {name: {[Op.iLike]: `%${name}%`}},
        include: {
            model: Diets,
            as: 'diets',
            attributes: ['name'], // Puedes especificar los atributos que deseas traer de la tabla Diets
            through: { attributes: [] }, // Opcionalmente, puedes excluir los atributos de la tabla intermedia RecipeDiets
          },
    });
    const apiRecipesRaw = (await axios.get(`${URL}`)).data.results
    const apiRecipes = cleanRecipes(apiRecipesRaw);
    const filteredApi = (await apiRecipes).filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
    const dataBaseRecipe = cleanRecipesDB(dataBaseRecipeRaw)
    return [...filteredApi, ...dataBaseRecipe]

}


module.exports = getRecipeByName; 