const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { getOneUser, addGym, getGymMembers
} = require("./../controllers/user.controllers.js")


router.get('/:id', isAuthenticated, getOneUser)
router.put('/:_idGym', isAuthenticated, addGym)
router.get('/gymMembers/list', isAuthenticated, getGymMembers)










module.exports = router