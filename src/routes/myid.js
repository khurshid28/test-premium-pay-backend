const { Router } = require("express");
const myidController = require("../controllers/myid.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);
router.post("/", myidController.getMe);


module.exports = router;