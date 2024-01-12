const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
let db = require("../config/db");
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);

  if (
    chatId === 6001596917 ||
    chatId === 702623697 ||
    chatId === 1955031743 ||
    chatId === 2053690211
  ) {
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
          `SELECT count(id) from Zayavka WHERE  status='finished'`,
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
          `SELECT count(id) from Zayavka WHERE  status='paid'`,
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

      let conceled_zayavkalar = zayavkalar2[0]["count(id)"] + zayavkalar3[0]["count(id)"] + zayavkalar4[0]["count(id)"];
      let paid_zayavkalar = zayavkalar8[0]["count(id)"];
      let finished_zayavkalar = zayavkalar5[0]["count(id)"];
      console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));

      bot.sendMessage(
        chatId,
        `uspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring orkaz : ${zayavkalar2[0]["count(id)"]}`
      );
    }
    else if (msg.text =="/bugun") {
      
        zayavkalar1 = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT count(id)  from Zayavka WHERE  status='progress' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
            `SELECT count(id)  from Zayavka WHERE  status='canceled_by_scoring' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
            `SELECT count(id) from Zayavka WHERE  status='canceled_by_client' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
            `SELECT count(id) from Zayavka WHERE  status='canceled_by_daily' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
            `SELECT count(id) from Zayavka WHERE  status='finished' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
            `SELECT count(id) from Zayavka WHERE status='paid' and DATE(now() - 5 INTERVAL HOUR)=DATE(created_time)`,
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
  
        let conceled_zayavkalar = zayavkalar2[0]["count(id)"] + zayavkalar3[0]["count(id)"] + zayavkalar4[0]["count(id)"];
        let paid_zayavkalar = zayavkalar8[0]["count(id)"];
        let finished_zayavkalar = zayavkalar5[0]["count(id)"];
        console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));
  
        bot.sendMessage(
          chatId,
          `-- Bugun --\nuspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring orkaz : ${zayavkalar2[0]["count(id)"]}`
        );
      
    }
    else if (msg.text =="/kecha") {
      
      zayavkalar1 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT count(id)  from Zayavka WHERE  status='progress' and  DATE(now() - 5 INTERVAL HOUR) - 1 = DATE(created_time)`,
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
          `SELECT count(id)  from Zayavka WHERE  status='canceled_by_scoring' and  DATE(now() - 5 INTERVAL HOUR) - 1 = DATE(created_time)`,
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
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_client' and  DATE(now() - 5 INTERVAL HOUR) - 1 = DATE(created_time)`,
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
          `SELECT count(id) from Zayavka WHERE  status='canceled_by_daily' and  DATE(now() - 5 INTERVAL HOUR) - 1 = DATE(created_time)`,
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
          `SELECT count(id) from Zayavka WHERE  status='finished' and  DATE(now() - 5 INTERVAL HOUR) - 1 = DATE(created_time)`,
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
          `SELECT count(id) from Zayavka WHERE status='paid' and  DATE(now() - 5 INTERVAL HOUR) - 1 < DATE(created_time)`,
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

      let conceled_zayavkalar = zayavkalar2[0]["count(id)"] + zayavkalar3[0]["count(id)"] + zayavkalar4[0]["count(id)"];
      let paid_zayavkalar = zayavkalar8[0]["count(id)"];
      let finished_zayavkalar = zayavkalar5[0]["count(id)"];
      console.log(JSON.stringify(zayavkalar5[0]["count(id)"]));

      bot.sendMessage(
        chatId,
        `-- Kecha --\nuspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \npul ko'chirilgan : ${paid_zayavkalar} \nscoring orkaz : ${zayavkalar2[0]["count(id)"]}`
      );
    
  }
  }
});
