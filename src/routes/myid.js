const { Router } = require("express");
const myidController = require("../controllers/myid.js");

const router = Router();

router.post("/", myidController.getMe);


module.exports = router;