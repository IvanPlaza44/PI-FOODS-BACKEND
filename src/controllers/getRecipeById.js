const { Recipe, Diets } = require("../db")
const axios = require("axios")
const { API_KEY } = process.env;
const { cleanRecipes, cleanRecipesDB } = require("./cleanersData")



const getRecipeById = async (id, source)=>{
    const URL = `https://api.spoonacular.com/recipes/`;
    let recipe = {}
    if( source === "API"){
        recipe = (await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)).data
        recipe = cleanRecipes([recipe])
        
    }else{
        recipe = await Recipe.findByPk(id, { include: {
            model: Diets,
            as: 'diets',
            attributes: ['name'],
            through: { attributes: [] },
          },});

          recipe = cleanRecipesDB([recipe])
          
          
    }
    return recipe[0];
}
module.exports = getRecipeById;



