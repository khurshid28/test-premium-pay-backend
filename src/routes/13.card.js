const { Router } = require("express");
const CardController = require("../controllers/13.card.js");
const checkUser = require("../middlewares/check-user.js");
const router = Router();

router.post("/sendOtp", CardController.sendOtp);

router.post("/verify", CardController.verify);

module.exports = router;

