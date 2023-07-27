const { Router } = require("express");
const appController = require("../controllers/app.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);

router.post("/upload", appController.upload);
router.get("/get/:user_id", appController.get);
router.get("/getAll/:merchant_id", appController.getAll);


module.exports = router;