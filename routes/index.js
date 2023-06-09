const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/nutrition", require("./nutrition.routes"))
router.use("/training", require("./training.routes"))

module.exports = router