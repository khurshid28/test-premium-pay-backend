const { Router } = require("express");
const myidController = require("../controllers/myid.js");
const checkToken = require("../middlewares/check-token.js");
const router = Router();
router.use(checkToken);
router.post("/", myidController.getMe);


module.exports = router;