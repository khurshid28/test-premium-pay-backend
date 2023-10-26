const schedule = require("node-schedule");
let db = require("../config/db");

schedule.scheduleJob({ hour: 0, minute: 0 }, () => {
  let date = new Date(Date.now());
  console.log("Job runs every day at = " + date.toString());

  db.query(
    `Update Zayavka SET status='canceled_by_daily',canceled_reason='Автоматический',finished_time = CURRENT_TIMESTAMP WHERE status='progress';`,
    function (err, results, fields) {
      console.log(err);
      console.log("okkk");
      if (err) {
        console.log({ err });
      }
      console.log({ results });
    }
  );
});

schedule.scheduleJob({ second: 0 }, () => {
  let date = new Date(Date.now());
  console.log("Job runs every day at = " + date.toString());
  



  if (date.getMinutes() % 2 == 0) {
    let randomNum = Math.floor(Math.random() * 10);
    console.log(randomNum);
    if (randomNum == 0 || randomNum == 1) {
      let canceled_reason = "";
      if (randomNum == 0) {
        canceled_reason = "У клиента плохая кредитная история ";
      } else {
        canceled_reason = "У клиента есть долг ";
      }
      db.query(
        `UPDATE Zayavka SET status = 'canceled_by_scoring', finished_time = CURRENT_TIMESTAMP ,canceled_reason='${canceled_reason}' WHERE step=3 AND status='progress';`,
        function (err, results, fields) {
          console.log(err);
          console.log("okkk");
          if (err) {
            console.log({ err });
          }
          console.log({ results });
        }
      );
     

    } else {
      db.query(
        `Update Zayavka SET step=4 WHERE step=3 AND status='progress';`,
        function (err, results, fields) {
          console.log(err);
          console.log("okkk");
          if (err) {
            console.log({ err });
          }
          console.log({ results });
        }
      );
    }
  }
});
