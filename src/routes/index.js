const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getRecipeByIdHandler, getRecipeByNameHandler, postRecipeHandler, deleteRecipeHandler} = require("../handlers/recipesHandlers")
const getDietsHandler = require('../handlers/dietsHandlers');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", getRecipeByIdHandler);

router.get("/recipes/", getRecipeByNameHandler);

router.post("/recipes", postRecipeHandler);

router.get("/diets", getDietsHandler);

router.delete("/recipes/:id", deleteRecipeHandler);



module.exports = router;
