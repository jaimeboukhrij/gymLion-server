const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { getUserMealPlanDay,
    saveUserMealPlaneDay } = require("./../controllers/nutrition.controllers.js")


router.get('/mealDayPlan/:idUser', getUserMealPlanDay)
router.post("/mealDayPlan", isAuthenticated, saveUserMealPlaneDay)







module.exports = router