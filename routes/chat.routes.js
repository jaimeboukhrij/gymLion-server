const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { getUserMealPlanDay,
} = require("./../controllers/nutrition.controllers.js")


router.get('/mealDayPlan/:date/:idOwner', getUserMealPlanDay)







module.exports = router