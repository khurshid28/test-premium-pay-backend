const { Router } = require("express");
const appController = require("../controllers/6.app.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);


router.post("/update/1", appController.update1);
router.post("/update/2", appController.update2);
router.post("/update/3", appController.update3);
router.post("/update/4", appController.update4);
router.post("/update/5", appController.update5);
router.post("/update/6", appController.update6);
router.post("/update/7", appController.update7);
router.post("/update/finish", appController.updateFinish);




// router.post("/upload", appController.upload);
router.get("/get/:id", appController.get);
router.get("/getAll/", appController.getAll);

router.get("/percents/:merchant_id", appController.getPercents);



module.exports = router;