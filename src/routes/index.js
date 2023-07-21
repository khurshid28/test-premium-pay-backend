const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");

const router = Router();
const myidRouter = require("./myid.js");
const loginRouter = require("./login.js");
const userRouter = require("./user.js");
const superRouter = require("./super.js");
const extraRouter = require("./extra.js");
const swaggerDoc = require("../docs/swagger.js");
const pdfRouter = require("./createPDF");

router.use("/api/login", loginRouter);
router.use("/api/myid", myidRouter);
router.use("/api/user", userRouter);
router.use("/api/super", superRouter);
router.use("/api", extraRouter);
router.use("/create-pdf", pdfRouter);

router.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;
