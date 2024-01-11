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

      let conceled_zayavkalar = zayavkalar2 + zayavkalar3 + zayavkalar4;
      let paid_zayavkalar = zayavkalar8;
      let finished_zayavkalar = zayavkalar5;
      console.log(JSON.stringify(zayavkalar5));

      bot.sendMessage(
        chatId,
        `uspeshna : ${finished_zayavkalar} \notkaz Zavkalar : ${conceled_zayavkalar} \n pul ko'chirilgan : ${paid_zayavkalar} \n scoring orkaz : ${zayavkalar2}`
      );
    }
  }
});
