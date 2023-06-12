const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/nutrition", require("./nutrition.routes"))
router.use("/training", require("./training.routes"))
router.use("/chat", require("./chat.routes"))
router.use("/social", require("./social.routes"))
router.use("/user", require("./user.routes"))



module.exports = router