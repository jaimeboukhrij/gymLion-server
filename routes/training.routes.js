const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { getUserFavouriteExercise, saveUserFavouriteExercise, deleteUserFavouriteExercise,
    getUserMarks, editUserMarks, deleteUserMarks } = require("./../controllers/training.controllers.js")



router.get('/favouriteExercise', isAuthenticated, getUserFavouriteExercise)
router.put('/favouriteExercise/:idExcercise', isAuthenticated, saveUserFavouriteExercise)
router.put('/favouriteExercise/delete/:idExcercise', isAuthenticated, deleteUserFavouriteExercise)
router.post("/favouriteExercise", isAuthenticated, getUserFavouriteExercise)
router.put("/favouriteExercise", isAuthenticated, getUserFavouriteExercise)

router.get("/mark/:showExercise", isAuthenticated, getUserMarks)
router.put("/addMark", isAuthenticated, editUserMarks)
router.put("/deleteMark", isAuthenticated, deleteUserMarks)








module.exports = router