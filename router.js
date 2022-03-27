const router            = require("express").Router()
const mainController    = require("./controllers/maincontroller")

router.get("/", mainController.home)

module.exports = router;