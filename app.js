require("./src/config/_index.js");


var express = require("express");
let bodyParser =require("body-parser")
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
let axios = require("axios");


let router3 = require("./src/routes/_index_3");
// built in middlewares
const logger = require("./src/middlewares/logger.js");
const rateLimit = require("./src/middlewares/rate-limit.js");
const errorHandler = require("./src/middlewares/error-handler.js");
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true })); 
const app = express();

let db = require("./src/config/db");


const checkToken = require("./src/middlewares/check-token.js");
let PREMIUM = require("./Premium-Query").PREMIUM;

// PORT
const PORT = process.env.TEST_PORT || 1212;

app.use((req, res, next) => {
  // console.log(`${req.method} ${req.originalUrl} [STARTED]`)
  // const start = process.hrtime()

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(
      req.duration_start
    );
 
    if (req.errorMethod) {
      req.duration = `${durationInMilliseconds.toLocaleString()} ms`;
      let text =
        "<b>ERROR ON TEST-SERVER : %0A" +
        req.errorMethod +
        " " +
        res.statusCode +
        " " +
        req.duration +
        "</b>" +
        req.errorText;
      let url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendmessage?chat_id=-${process.env.ERROR_GROUP_ID}&text=${text}&parse_mode=HTML`;
      axios
        .post(url)
        .then((res) => res)
        .catch((err) => console.log(err));
    }
  });


  req.duration_start = process.hrtime();
  next();
});
app.use(morgan("dev"));


app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));



app.use(cors(), rateLimit());

// static
app.use("/static",checkToken, express.static(path.join(__dirname, "public")));



app.use("/api/v3",router3);


app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);

// testing server
app.get("/", (req, res) => res.send("premium pay"));

// starting server
app.listen(PORT, async () => {
  console.log(`server ready on port:${PORT}`);
  // db.query(PREMIUM.createTestZayavkaTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
    
  //   console.log({ results });
  // });


  // db.query(`DROP TABLE Zayavka;`, function (err, results, fields) {
  //   if (err) {
      
  //   }
  //   db.query(PREMIUM.createZayavkaTable, function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({ err });
  //     }
      
  //     console.log({ results });
  //   });
  // });


  // db.query(`DROP TABLE merchant;`, function (err, results, fields) {
  //   if (err) {
      
  //   }
  //   db.query(PREMIUM.createMerchantTable, function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({ err });
  //     }
      
  //     console.log({ results });
  //   });
  // });


  // db.query(`DROP TABLE fillial;`, function (err, results, fields) {
  //   if (err) {
      
  //   }
  //   db.query(PREMIUM.createFillialTable, function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({ err });
  //     }
      
  //     console.log({ results });
  //   });
  // });



 
  // db.query(`DROP TABLE FillialAdmin;`, function (err, results, fields) {
  //   if (err) {
      
  //   }
  //   db.query(PREMIUM.createFillialAdminTable, function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({ err });
  //     }
      
  //     console.log({ results });
  //   });
  // });


















  // db.query(PREMIUM.createAccountantTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
    
  //   console.log({ results });
  // });
  // db.query(
  //   "DROP TABLE fillial",
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );
  // db.query(
  //   "DROP TABLE Zayavka",
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );
  // db.query(
  //   "DROP TABLE merchant",
  //   function (err, results, fields) {
  //     console.log(err);
  //     if (err) {
  //       console.log({err})
  //     }
  //     console.log({results})
  //   }
  // );

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

  // db.query(PREMIUM.createMerchantTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
  //   console.log({ results });
  // });
  // db.query(PREMIUM.createFillialTable, function (err, results, fields) {
  //   console.log(err);
  //   if (err) {
  //     console.log({ err });
  //   }
  //   console.log({ results });
  // });
  // db.query(PREMIUM.createZayavkaTable, function (err, results, fields) {
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
  //   "DROP TABLE fillial",
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

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
