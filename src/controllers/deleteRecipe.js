const { Recipe } = require("../db")

const deleteRecipe = async (id)=>{
    const deleteRecip = await Recipe.destroy({where:{id}})
    const allRecipes = await Recipe.findAll()



    return allRecipes
}

module.exports = deleteRecipe;