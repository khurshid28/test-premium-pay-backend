require("./src/config/_index.js");

let fs =require("fs");

var express = require("express");
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

const app = express();


let db = require("./src/config/db");


const checkToken = require("./src/middlewares/check-token.js");
let PREMIUM = require("./Premium-Query").PREMIUM;

// PORT
const PORT = 1212;
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(bodyParser.json({ limit: "50mb" }));

// app.use((req, res, next) => {
//   // console.log(`${req.method} ${req.originalUrl} [STARTED]`)
//   // const start = process.hrtime()

//   res.on("finish", () => {
//     const durationInMilliseconds = getDurationInMilliseconds(
//       req.duration_start
//     );
 
//     if (req.errorMethod) {
//       req.duration = `${durationInMilliseconds.toLocaleString()} ms`;
//       let text =
//         "<b>ERROR ON TEST-SERVER : %0A" +
//         req.errorMethod +
//         " " +
//         res.statusCode +
//         " " +
//         req.duration +
//         "</b>" +
//         req.errorText;
//       let url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendmessage?chat_id=-${process.env.ERROR_GROUP_ID}&text=${text}&parse_mode=HTML`;
//       axios
//         .post(url)
//         .then((res) => res)
//         .catch((err) => console.log(err));
//     }
//   });


//   req.duration_start = process.hrtime();
//   next();
// });


app.use(morgan("dev"));


app.use(bodyParser.json({
  limit: "50mb" 
}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));



app.use(cors(), rateLimit());

// static 

let mime = require("mime-types");
const { InternalServerError, NotFoundError } = require("./src/utils/errors.js");

// app.get('/api', async (req,res,next)=>{
//  try {
//    console.log(res.statusCode);
//    console.log(req.body);
//    let fpath = path.join(
//      __dirname,
//      "public",
//      "graphs",
//      `graph-${req.orderId}.pdf`
//    );
//    console.log(fpath);
//    const contentType = mime.contentType(fpath);
//    let pdfData =  fs.readFileSync(fpath);
//    console.log(contentType);
//    console.log(pdfData);
//    res.setHeader("Content-Type", contentType);
//    res.setHeader(
//      "Content-Disposition",
//      `attachment; filename=graph-${req.orderId}-${Date.now()}.pdf`
//    );
//    return res.status(200).send(pdfData);
//  } catch (error) {
//   console.log(error);
//   return next(new InternalServerError(500,error))
  
//  }

      
// });


const ejs = require("ejs"); // 3.1.8
const puppeteer = require("puppeteer");
app.get('/graph', async(req, res,next) => {

  try {
    // if (!req.orderId) {
    //   return next( new NotFoundError(400,"orderId required"))
    // }

    // let Zayavka = await new Promise(function (resolve, reject) {
    //   db.query(
    //     `SELECT merchant.name as merchant_name,TestZayavka.* from TestZayavka,merchant where TestZayavka.id=${req.orderId} and merchant.id=TestZayavka.merchant_id;`,

    //     // `select TestZayavka.* ,merchant.name as merchant_name from TestZayavka join merchant on TestZayavka.merchant_id=merchant.id where TestZayavka.id=${id};`,
    //     function (err, results, fields) {
    //       if (err) {
    //         console.log(err);
    //         reject(err);
    //         return null;
    //       }
    //       if (results.length > 0) {
    //         resolve(results[0]);
    //       } else {
    //         resolve(null);
    //       }
    //     }
    //   );
    // });

    let Zayavka ={}
    let browser;
    (async () => {
      browser = await puppeteer.launch();
      const [page] = await browser.pages();
      const html = await ejs.renderFile(path.join(__dirname,"/public/templetes/graph-templete.ejs"), Zayavka);
      await page.setContent(html);
      const pdf = await page.pdf({format: "A4"});

      res.contentType("application/pdf");
      
  
      // optionally:
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=graph-${Zayavka.id}.pdf`
      );
  
      res.send(pdf);

      fs.writeFileSync(path.join(__dirname,"/public/graphs/graph-2.pdf"), pdf, {}, (err) => {
        if(err){
            return console.error('error')
        }

        console.log('success!')
    })
    })()
      .catch(err => {
        console.error(err);
        res.sendStatus(500).json({
          "error": err
        });
      }) 
      .finally(() => browser?.close());


    // let pdfData = fs.readFileSync(path.join(__dirname,"/public/test-graph.pdf"), );
    // res.contentType("application/pdf");
      
  
    //   // optionally:
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=graph-test.pdf`
    //   );
  
    //   res.send(pdfData);

 } catch (error) {
  console.log(error);
  return next(new InternalServerError(500,error))
  
 }

});

app.use("/static",checkToken, express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//       'Access-Control-Allow-headers',
//       'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// });




// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//       console.error(err);
//       return res.status(400).send({ status: 400, message: err.message }); // Bad request
//   }
//   next();
// });


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

