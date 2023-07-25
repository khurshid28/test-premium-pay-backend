const { Router } = require("express");
const merchantController = require("../controllers/merchant.js");
const checkToken = require("../middlewares/check-token.js");
const router = Router();

router.use(checkToken);
router.post("/create", merchantController.create);
router.get("/getAll", merchantController.getAll);


module.exports = router;