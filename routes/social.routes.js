const router = require("express").Router()
const { isAuthenticated } = require("./../middlewares/verifyToken.middleware")
const { savePost, getPost
} = require("./../controllers/social.controllers.js")


router.post('/postCreate', isAuthenticated, savePost)
router.get('/post', isAuthenticated, getPost)









module.exports = router