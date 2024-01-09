
const multer = require("multer");
const Storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file,cb) =>{
    cb(null,"zayavka"+ req.body.id +".jpg")
  }
})


const upload = multer({
  storage: Storage,
}).single('selfie')



const { Router } = require("express");
const appController = require("../controllers/6.app.js");
const checkToken = require("../middlewares/check-token.js");
const checkBlocked = require("../middlewares/check-blocked.js");
const checkZayavka = require("../middlewares/check-zayavka.js");
const checkUser = require("../middlewares/check-user.js");

const router = Router();

router.use(checkToken);
router.use(checkBlocked);

router.post("/update/1",checkUser, appController.update1);
router.post("/update/2",checkUser,checkZayavka, appController.update2);
router.post("/update/3",checkUser,checkZayavka, appController.update3);
router.post("/update/4",checkUser,checkZayavka, appController.update4);
router.post("/update/5",checkUser,checkZayavka, appController.update5);
router.post("/update/6",checkUser,checkZayavka, appController.update6);
router.post("/update/7",checkUser,checkZayavka,  appController.update7);
router.post("/update/finish",checkUser,checkZayavka, upload, appController.updateFinish);
router.post("/cancel_by_client/",checkUser, appController.cancel_by_client);

// router.post("/upload", appController.upload);
// router.get("/get/:id",checkUser, appController.get);
router.get("/getAll/", appController.getAll);


router.get("/percents/:fillial_id",checkUser, appController.getPercents);



module.exports = router;




