const { Router } = require("express");
const fillialController = require("../controllers/fillial.js");
const checkToken = require("../middlewares/check-token.js");
const router = Router();

router.use(checkToken);
router.post("/create", fillialController.create);
router.get("/getAll", fillialController.getAll);


module.exports = router;