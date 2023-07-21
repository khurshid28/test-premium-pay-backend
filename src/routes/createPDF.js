const { Router } = require("express");
const pdfController = require("../controllers/create_pdf.js");

const router = Router();

router.post("/", pdfController.create);


module.exports = router;