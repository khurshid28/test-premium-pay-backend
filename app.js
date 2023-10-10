require("./src/config/_index.js");
require("./src/config/db.js");

var express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const { Buffer } = require('buffer');

// all routes
const router = require("./src/routes/_index.js");

// built in middlewares
const logger = require("./src/middlewares/logger.js");
const rateLimit = require("./src/middlewares/rate-limit.js");
const errorHandler = require("./src/middlewares/error-handler.js");

const app = express();

// testing server
app.get("/", (req, res) => res.send("premium pay"));

let db = require("./src/config/db");
let PREMIUM = require("./Premium-Query").PREMIUM;


// PORT
const PORT = process.env.PORT || 8090;

// middlewares
app.use(morgan("dev"), cors(), rateLimit(), express.json({limit: '50mb'}));

// auth for APIs
// app.use(authenticateToken);

// all routes
app.use(router);

app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);

// static
app.use("/static", express.static(path.join(__dirname, "public")));

// app.use(express.limit(10*1024*1024*1024));









app.get("/test", (req, res) => {
  // db.query("insert into test_table (name) values(?)",['fffd'], function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     return res.send({ err });
  //   }
  //   return res.send({ results });
  // });
  try {
    const inputSring = req.body.image;
    var decodedImage = Buffer.from( inputSring).toString("base64");
// const buffer = Buffer.from(inputSring);
// const base64String = buffer.toString('base64');
 
// console.log(base64String);
    return res.send({
      "status":"ok",
      decodedImage
    })
  } catch (error) {
    console.log(error);
    return res.send({
      "status":"ok",
      error
    })
  }
});

// starting server
app.listen(PORT, async () => {
  console.log(`server ready on port:${PORT}`);
  // db.query(`DELETE FROM Zayavka WHERE user_id=1`, function (err, results, fields) {
  //   if (err) { 
  //     console.log({ err }); 
  //   }
  //   console.log({ results });
  // });
 

   
  // db.query(PREMIUM.createCallCenterTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
  //   console.log({ results });
  // });
  // db.query(
  //   PREMIUM.createMerchantTable,
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );
  // db.query(
  //   PREMIUM.createFillialTable,
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );

  // db.query(
  //   PREMIUM.createZayavkaTable,
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );
});
