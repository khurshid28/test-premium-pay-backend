require("./src/config/_index.js");
require("./src/utils/schedule");

var express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
let axios = require("axios");

// all routes
let router = require("./src/routes/_index");

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

app.use((req, res, next) => {
  // console.log(`${req.method} ${req.originalUrl} [STARTED]`)
  // const start = process.hrtime()

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(
      req.duration_start
    );
    // console.log(
    //   `${req.method} ${req.originalUrl} ${
    //     res.statusCode
    //   } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`
    // );

    if (req.errorMethod) {
      req.duration = `${durationInMilliseconds.toLocaleString()} ms`;
      let text =
        "<b>ERROR ON SERVER : %0A" +
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

  // res.on('close', () => {
  //     const durationInMilliseconds = getDurationInMilliseconds (req.duration_start)
  //     console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
  //     req.duration=`${durationInMilliseconds.toLocaleString()} ms`

  //     console.log("req.errorText >> "+req.errorText)
  //     let text=  req.duration +  req.errorText
  //     let url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendmessage?chat_id=-${process.env.ERROR_GROUP_ID}&text=${text}&parse_mode=HTML`;
  //     axios.post(url);

  // })
  req.duration_start = process.hrtime();
  next();
});
app.use(morgan("dev"));
// middlewares

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(), rateLimit());

// static
app.use("static", express.static(path.join(__dirname, "public")));

// app.all('*', function(req, res, next) {
//   try {
//     console.log("try *** >>");
//     next();
//   } catch (error) {
//     console.log("catch error >>");
//   }
// })

// all routes
app.use("/api/v1",router);

app.use("/api/v2",router);

// router.use((req,res,next)=>{
//   try {
//     next();
//   } catch (error) {
//     console.log("catch error");
//   }
// });

// app.use("/test",router);

app.use(helmet());

// error handling
app.use(errorHandler);
app.use(logger);

// testing server
app.get("/", (req, res) => res.send("premium pay"));

require("./src/bot/bot")
require("./src/bot/register_bot")
// starting server
app.listen(PORT, async () => {
  console.log(`server ready on port:${PORT}`);


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
