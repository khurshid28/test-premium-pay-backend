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
const pdf_generate = require("./src/utils/pdf_generate.js");
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

    // let Zayavka ={}
    // let browser;
    // (async () => {
    //   browser = await puppeteer.launch();
    //   const [page] = await browser.pages();
    //   const html = await ejs.renderFile(path.join(__dirname,"/public/templetes/graph-templete.ejs"), Zayavka);
    //   await page.setContent(html);
    //   const pdf = await page.pdf({format: "A4"});

    //   res.contentType("application/pdf");
      
  
    //   // optionally:
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=graph-${Zayavka.id}.pdf`
    //   );
  
    //   res.send(pdf);

    //   fs.writeFileSync(path.join(__dirname,"/public/graphs/graph-2.pdf"), pdf, {}, (err) => {
    //     if(err){
    //         return console.error('error')
    //     }

    //     console.log('success!')
    // })
    // })()
    //   .catch(err => {
    //     console.error(err);
    //     res.sendStatus(500).json({
    //       "error": err
    //     });
    //   }) 
    //   .finally(() => browser?.close());






    // let pdfData = fs.readFileSync(path.join(__dirname,"/public/test-graph.pdf"), );
    // res.contentType("application/pdf");
      
  
    //   // optionally:
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=graph-test.pdf`
    //   );
  
    //   res.send(pdfData);
    let Zayavka ={
      "id": 705,
      "merchant_id": 2,
      "fillial_id": 1,
      "user_id": 3,
      "fullname": "Xurshid Ismoilov O‘tkir o‘g‘li",
      "phoneNumber": "+998950642827",
      "phoneNumber2": "+998950642827",
      "cardNumber": "860014******0006",
      "passport": "AB6935244",
      "passport_date": "15.06.2017",
      "passport_by": "Buxoro viloyati Qorako'l tumani Ichki ishlar boshqarmasi",
      "address": {
          "city": "ҚОРАКЎЛ ТУМАНИ",
          "home": "Бухарская область, Каракульский район, Арабхона МСГ, Арабхона, дом 53",
          "region": "БУХОРО ВИЛОЯТИ"
      },
      "region_id": 20,
      "status": "canceled_by_daily",
      "canceled_reason": "Автоматический",
      "device": {
          "id": "UP1A.231005.007",
          "name": "Redmi fire"
      },
      "location": {
          "lat": "41.2719656",
          "long": "69.2319445"
      },
      "products": [
          {
              "name": "xgfsgd",
              "price": "500000"
          }
      ],
      "amount": 500000,
      "max_amount": 40000000,
      "payment_amount": 834000,
      "expired_month": 12,
      "created_time": "2024-04-01T17:10:29.000Z",
      "finished_time": "2024-04-02T00:00:00.000Z",
      "bank": "Davr",
      "selfie": null,
      "agree": null,
      "step": 8,
      "scoring_start": "2024-03-29T11:07:24.000Z",
      "scoring_end": "2024-03-29T11:07:53.000Z",
      "paid_status": "no_value",
      "term": null,
      "pinfl": "53107005320039",
      "limit_summa": 9000000,
      "cardId": null,
      "fillial": {
          "inn": "306028283",
          "mfo": "01095",
          "nds": "326060092299",
          "name": "TEST OUT FIRMA",
          "address": {
              "city": "",
              "home": "ZAFAR KO`CHASI, 23-UY",
              "region": "Toshkent"
          },
          "admin_id": null,
          "bank_name": "ASIA ALLIANCE BANK",
          "hisob_raqam": "20208000700980700001",
          "work_status": "working",
          "created_time": "2023-12-28 15:59:19.000000",
          "percent_type": "OUT",
          "director_name": "YULDASHEV KAXRAMON KASIMOVICH",
          "director_phone": "",
          "expired_months": [
              {
                  "month": 12,
                  "percent": 39
              },
              {
                  "month": 9,
                  "percent": 34
              },
              {
                  "month": 6,
                  "percent": 30
              },
              {
                  "month": 3,
                  "percent": 25
              }
          ]
      },
      "admin": null
  };
   let newFilePath = await  pdf_generate(Zayavka);

    let pdfData = fs.readFileSync(newFilePath );
    res.contentType("application/pdf");
      
  
    //   // optionally:
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=graph-${Zayavka.id}.pdf`
      );
  
      res.send(pdfData);
    

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

