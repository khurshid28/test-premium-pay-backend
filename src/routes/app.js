const { Router } = require("express");
const appController = require("../controllers/app.js");
const checkToken = require("../middlewares/check-token.js");
const router = Router();

// router.use(checkToken);
router.post("/upload", appController.upload);
router.get("/get", appController.get);
router.get("/getAll", appController.getAll);


module.exports = router;