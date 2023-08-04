const cleanSteps = (arr)=>{
    if(arr.length === 0) return[]
    const { steps } = arr[0]
    let cleanArr = steps.map((step => `Paso #${step.number}: ${step.step}\n`))
    return cleanArr
}

const cleanRecipes = (arr)=>
    arr.map((recip) => {
        if(recip.vegetarian && !recip.diets.includes("vegetarian")) recip.diets = [...recip.diets, "vegetarian"]
        return{
            id: recip.id,
            name: recip.title,
            image: recip.image,
            summary: recip.summary.replace(/<[^>]+>/g,""),
            healthScore: recip.healthScore,
            steps: cleanSteps(recip.analyzedInstructions),
            diets: recip.diets,
            created: false
            };
        });


const cleanRecipesDB = (arr) =>
  arr.map((recip) => ({
    id: recip.id,
    name: recip.name,
    image: recip.image,
    summary: recip.summary,
    healthScore: recip.healthScore,
    steps: recip.steps,
    diets: recip.diets.map((diet) => diet.name),
    created: true,
  }));


module.exports ={
    cleanRecipes, cleanSteps, cleanRecipesDB,
}