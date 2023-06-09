const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { getUserMealPlanDay,
    saveUserMealPlaneDay,
    editUserMealPlaneDay,
    deleteUserMealPlaneDay,
    getUserFavouriteFood,
    saverUserFavouriteFood,
    deleteUserFavouriteFood } = require("./../controllers/nutrition.controllers.js")


router.get('/mealDayPlan/:date/:idOwner', getUserMealPlanDay)
router.post("/mealDayPlan/:date", isAuthenticated, saveUserMealPlaneDay)
router.put("/mealDayPlan/:date", isAuthenticated, editUserMealPlaneDay)
router.put("/mealDayPlan/delete/:date", isAuthenticated, deleteUserMealPlaneDay)

router.get("/favouriteFood", isAuthenticated, getUserFavouriteFood)
router.put("/favouriteFood/:idFood", isAuthenticated, saverUserFavouriteFood)
router.put("/favouriteFood/delete/:idFood", isAuthenticated, deleteUserFavouriteFood)







module.exports = router