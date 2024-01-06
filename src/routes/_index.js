const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");

const router = Router();
// router.use((req, res, next) => {
//   try {
//     console.log("try >>>>");
//     next();
//   } catch (error) {
//     console.log("catch error >>", `${error}`.substring(0, 30));
//   }
// });

const myidRouter = require("./myid.js");

const loginRouter = require("./7.login.js");

const userRouter = require("./5.user.js");

const superRouter = require("./3.super.js");

const appRouter = require("./6.app.js");

const merchantRouter = require("./1.merchant.js");
const adminRouter = require("./4.1.admin.js");
const fillialAdminRouter = require("./4.2.fillial_admin.js");
const fillialRouter = require("./2.fillial");

const extraRouter = require("./extra.js");

const swaggerDoc = require("../docs/swagger.js");
const pdfRouter = require("./createPDF.js");
const uploadRouter = require("./uploadImage.js");

const scoringRouter = require("./8.scoring");

const supportRouter = require("./9.support");

const errorRouter = require("./10.errors");

router.use("/api/v1/login", loginRouter);
router.use("/api/v1/myid", myidRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/super", superRouter);




router.use("/api/v1/fillial-admin", fillialAdminRouter);
router.use("/api", extraRouter);
router.use("/create-pdf", pdfRouter);
router.use("/upload-image", uploadRouter);
router.use("/api/v1/zayavka", appRouter);
router.use("/api/v1/merchant", merchantRouter);

router.use("/api/v1/admin", adminRouter);

router.use("/api/v1/fillial", fillialRouter);


router.use("/api/v1/scoring", scoringRouter);
router.use("/api/v1/support", supportRouter);
router.use("/api/v1/error", errorRouter);

router.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


module.exports = router;
