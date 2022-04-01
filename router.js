const router            = require("express").Router()
const mainController    = require("./controllers/maincontroller")

router.get("/",         mainController.home);
router.get("/shop",     mainController.renderShop);
router.get("/contact",  mainController.renderContact);
router.get("/review",   mainController.renderReview);

module.exports = router;