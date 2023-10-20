require("./src/config/_index.js");

require("./src/utils/schedule")

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
app.get("/test", (req, res) => res.send("premium pay test api"));

let db = require("./src/config/db");
const checkToken = require("./src/middlewares/check-token.js");
let PREMIUM = require("./Premium-Query").PREMIUM;


// PORT
const PORT = process.env.PORT || 8090;

// middlewares
app.use(morgan("dev"), cors(), rateLimit(), express.json({limit: '10mb'}));



// all routes
app.use(router);

app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);

// static
app.use( "static", express.static(path.join(__dirname, "public")));







// starting server
app.listen(PORT, async () => {
  console.log(`server ready on port:${PORT}`);
  // db.query(`DELETE FROM Zayavka WHERE user_id=1`, function (err, results, fields) {
  //   if (err) { 
  //     console.log({ err }); 
  //   }
  //   console.log({ results });
  // });
  

 
   
  db.query(PREMIUM.createCallCenterTable, function (err, results, fields) {
    console.log(err);
    if (err) {
      console.log({ err });
    }
    console.log({ results });
  });
  db.query(PREMIUM.createAccountantTable, function (err, results, fields) {
    console.log(err);
    if (err) {
      console.log({ err });
    }
    console.log({ results });
  });
  db.query(
    PREMIUM.createMerchantTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );
  db.query(
    PREMIUM.createFillialTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );


  db.query(
    PREMIUM.createUserTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );
  db.query(
    PREMIUM.createSuperAdminTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );
  db.query(
    PREMIUM.createAdminTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );
  db.query(
    PREMIUM.createZayavkaTable,
    function (err, results, fields) {
      console.log(err);
      if (err) {
        console.log({err})
      }
      console.log({results})
    }
  );
});




