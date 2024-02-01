const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const XLSX = require("xlsx");
const fs = require("fs");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


let db = require("../config/db");
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);

  if (
    chatId === 6001596917 ||
    chatId === 702623697 ||
    chatId === 1955031743 ||
    chatId === 2053690211 ||
    chatId === 2907182
  ) {
    if ((msg.text = "/go")) {
      zayavkalar = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT id,fullName,passport,pinfl,amount from Zayavka where pinfl<>"" and status="canceled_by_scoring" and id not in(142,143,181);`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      console.log(zayavkalar);
      console.log(zayavkalar.length);

      // Sample JSON data
      const data = zayavkalar;

      // Create a new workbook
      const workbook1 = XLSX.utils.book_new();
      const sheetName1 = "Sheet1";

      // Convert JSON data to worksheet
      const worksheet1 = XLSX.utils.json_to_sheet(data);

      worksheet1["!cols"] = [
        { width: 5 },
        { width: 40 },
        { width: 10 },
        { width: 15 },
        { width: 15 },
      
     
      ];
      // console.log(workbook1["!cols"]);
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook1, worksheet1, sheetName1);

      // Save the workbook to a file
      const outputFilePath = "zayavkalar.xlsx";
      XLSX.writeFile(workbook1, outputFilePath);

      console.log(
        `Styled Excel sheet created successfully at ${outputFilePath}`
      );
      await bot.sendDocument(
        chatId,
       outputFilePath
      );


    }

    if (msg.text == "/get" && chatId === 2053690211) {
      let zayavkalar = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT id,fullname,status,Date(created_time -interval 5 hour) as date from Zayavka where status in("finished","paid","progress","canceled_by_scoring") and id>55;`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      console.log(zayavkalar.length);
      for (let index = 0; index < zayavkalar.length; index++) {
        const element = zayavkalar[index];
        await bot.sendMessage(
          chatId,
          `ID : ${element.id} \nFULLNAME : ${element.fullname} \nSTATUS : ${element.status}\nDATE : ${element.date}`
        );
      }
    }
    if (msg.text == "/data") {
      zayavkalar1 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='progress'`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar2 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='canceled_by_scoring'`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar3 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_client'`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar4 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_daily'`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar5 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='finished' or status='paid'`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      zayavkalar8 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE paid_status='paid'`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      let conceled_zayavkalar =
        zayavkalar2[0]["count(id)"] +
        zayavkalar3[0]["count(id)"] +
        zayavkalar4[0]["count(id)"];
      let paid_zayavkalar = zayavkalar8[0]["count(id)"];
      let finished_zayavkalar = zayavkalar5[0]["count(id)"];
      console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));

      bot.sendMessage(
        chatId,
        `uspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring orkaz : ${zayavkalar2[0]["count(id)"]}`
      );
    } else if (msg.text == "/bugun") {
      zayavkalar1 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='progress' and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar2 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='canceled_by_scoring' and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar3 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_client' and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar4 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_daily' and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar5 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  (status='finished' or status='paid') and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      zayavkalar8 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE paid_status='paid' and DATE(now() - INTERVAL 5 HOUR)=DATE(created_time - INTERVAL 5 HOUR);`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      let conceled_zayavkalar =
        zayavkalar2[0]["count(id)"] +
        zayavkalar3[0]["count(id)"] +
        zayavkalar4[0]["count(id)"];
      let paid_zayavkalar = zayavkalar8[0]["count(id)"];
      let finished_zayavkalar = zayavkalar5[0]["count(id)"];
      console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));

      bot.sendMessage(
        chatId,
        `-- Bugun --\nuspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring orkaz : ${zayavkalar2[0]["count(id)"]}`
      );
    } else if (msg.text == "/kecha") {
      zayavkalar1 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='progress' and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR)`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar2 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='canceled_by_scoring' and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR)`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar3 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_client' and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR)`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar4 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_daily' and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR)`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });
      zayavkalar5 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE (status='finished' or status='paid') and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR)`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      zayavkalar8 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id) from Zayavka WHERE paid_status='paid' and  DATE(now() - INTERVAL 5 HOUR) - 1 = DATE(created_time - INTERVAL 5 HOUR )`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }
            return resolve(results);
          }
        );
      });

      let conceled_zayavkalar =
        zayavkalar2[0]["count(id)"] +
        zayavkalar3[0]["count(id)"] +
        zayavkalar4[0]["count(id)"];
      let paid_zayavkalar = zayavkalar8[0]["count(id)"];
      let finished_zayavkalar = zayavkalar5[0]["count(id)"];
      console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));

      bot.sendMessage(
        chatId,
        `-- Kecha --\nuspeshna : ${finished_zayavkalar} \notkaz Zayavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring otkaz : ${zayavkalar2[0]["count(id)"]}`
      );
    } else {
      var filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "myid",
        `${msg.text}.png`
      );
      if (fs.existsSync(filePath)) {
        console.log("File is exist");
        bot.sendPhoto(chatId, filePath);
        // bot.sendPhoto(chatId,path.join(
        //   __dirname,
        //   "..",
        //   "..",
        //   "public",
        //   "images",
        //   `zayavka192.jpg`
        // ))
      } else {
        bot.sendMessage(chatId, "Not Found");
      }
    }
  }
});
