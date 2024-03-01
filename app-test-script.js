let db = require("./src/config/db");

let data = new Promise(function (resolve, reject) {
    db.query(
      `SELECT id,fullname,status,Date(created_time - interval 5 hour) as date  from Zayavka WHERE  status in ('canceled_by_scoring','finished','paid') and  ('2024-01-31' < Date(created_time - interval 5 hour) and Date(created_time - interval 5 hour) < '2024-03-01')`,
      function (err, results, fields) {
        if (err) {
          resolve(null);
          return null;
        }
        return resolve(results);
      }
    );
  });
  
 toFormattedDate = (d) => d.toISOString().slice(0, 10)

  data.then(function (results) {
    if (results && results.length) {
      let check = results[0].status == "canceled_by_scoring";
      let res = [
        {
          ...results[0],
          canceled: check ? 1 : 0,
          finished: !check ? 1 : 0,
        },
      ];
      
      for (let i = 1; i < results.length; i++) {
        if (toFormattedDate(results[i].date)  == toFormattedDate(res[res.length - 1].date)  ) {
          res[res.length - 1].fullname += ("\n"+ results[i].fullname);
        } else {
          res.push(results[i]);
        }
  
        check = results[i].status == "canceled_by_scoring";

        res[res.length - 1] = {
          ...res[res.length - 1],
          canceled: (check ? 1 : 0) + (res[res.length - 1].canceled ?? 0),
          finished: (!check ? 1 : 0) + (res[res.length - 1].finished ?? 0),
        };
      }
      console.log(res);
    //   console.log(res[res.length-1].date.toISOString().slice(0, 10));
    }
    
    
  }).catch((err)=>console.log(err));