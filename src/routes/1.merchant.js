const { Router } = require("express");
const merchantController = require("../controllers/1.merchant.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);
router.post("/create", merchantController.create);
router.get("/get/:id", merchantController.get);
router.get("/getAll", merchantController.getAll);


module.exports = router;