require("./src/config/_index.js");

require("./src/utils/schedule")

var express = require("express");


const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require('body-parser');

// all routes
const router = require("./src/routes/_index.js");

// built in middlewares
const logger = require("./src/middlewares/logger.js");
const rateLimit = require("./src/middlewares/rate-limit.js");
const errorHandler = require("./src/middlewares/error-handler.js");

const app = express();


let db = require("./src/config/db");
// let dbtest = require("./src/config/dbtest");

const checkToken = require("./src/middlewares/check-token.js");
let PREMIUM = require("./Premium-Query").PREMIUM;


// PORT
const PORT = process.env.PORT || 8090;

// middlewares

app.use(express.json({limit: '10mb'}),);
app.use(express.urlencoded({extended:false,limit: '10mb',parameterLimit : 10}));

// app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"), cors(), rateLimit(), );


 


// all routes
app.use(router);
app.use("/test",router);

app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);

// static
app.use( "static", express.static(path.join(__dirname, "public")));



















// testing server
app.get("/", (req, res) => res.send("premium pay"));

app.get("/test/delete", (req, res) =>{
    db.query(`DELETE FROM Zayavka WHERE user_id=1`, function (err, results, fields) {
    if (err) { 
      return res.send({ err });
    }
    return res.send({ results });
  });
  

});


app.get("/test/droptable", (req, res) =>{
  db.query(`DROP TABLE Zayavka;`, function (err, results, fields) {
  if (err) { 
    db.query(
      PREMIUM.createZayavkaTable,
      function (err, results, fields) {
        console.log(err);
        if (err) {
          console.log({err})
        }
        console.log({results})
      });
    return res.send({ err });
  }
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
  return res.send({ results });
});


});






// starting server
app.listen(PORT, async () => {
  console.log(`server ready on port:${PORT}`);

  // db.query("SELECT * from Zayavka", function (err, results, fields) {
    // for (let index = 0; index < 40; index++) {
    //   console.log(">>>>>>>>>>>>");
      
    // }
  //   if (err) {
  //     console.log({ err });
  //   }
  //   console.log({ results });
  // });

  // 
 
   
  // db.query(PREMIUM.createFillialAdminTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
  //   console.log({ results });
  // });
  // db.query(PREMIUM.createAccountantTable, function (err, results, fields) {
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
  //   PREMIUM.createUserTable,
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );
  // db.query(
  //   PREMIUM.createSuperAdminTable,
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




