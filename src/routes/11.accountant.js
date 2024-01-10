const { Router } = require("express");
const accountantController = require("../controllers/11.accountant.js");

const router = Router();

router.post("/create", accountantController.create);


module.exports = router;