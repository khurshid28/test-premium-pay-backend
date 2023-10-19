const { Router } = require("express");
const myidController = require("../controllers/myid.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");
const checkUser = require("../middlewares/check-user.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);
router.use(checkUser);

router.post("/", myidController.getMe);

router.post("/check", myidController.check);


module.exports = router;