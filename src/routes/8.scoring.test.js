const { Router } = require("express");
const scoringTestController = require("../controllers/8.scoring.test.js");

// const checkToken = require("../middlewares/check-token.js");
// const checkBlocked = require("../middlewares/check-blocked.js");

const router = Router();

// router.use(checkToken);
// router.use(checkBlocked);

// router.get("/result", scoringController.get);


router.post("/result", scoringTestController.post);


module.exports = router;

