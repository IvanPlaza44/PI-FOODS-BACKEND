const getDiets = require("../controllers/getDiets");

const getDietsHandler = async (req, res)=>{
    try {
        const results = await getDiets()
        res.status(200).json(results)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = getDietsHandler; 