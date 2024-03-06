let db = require("./src/config/db");
 getStatistics=async ()=> {
    
      let data = [];
      let banks = ["Davr", "Hamkor", "Asaka", "QQB"];
    //   () => {
    //     banks.forEach(async (item, index) => {
    //       let zayavkalarUspeshna = await new Promise(function (
    //         resolve,
    //         reject
    //       ) {

    //         db.query(
    //           `SELECT count(id) from Zayavka where step=8  and bank='${item}'`,
    //           function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //               resolve(null);
    //               return null;
    //             }
    //             console.log(results);
    //             return resolve(results);
    //           }
    //         );
    //       });


    //       let zayavkalarScoringOtkaz = await new Promise(function (
    //         resolve,
    //         reject
    //       ) {
    //         db.query(
    //           `SELECT count(id) from Zayavka where status='canceled_by_scoring' and bank=${item}`,
    //           function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //               resolve(null);
    //               return null;
    //             }
    //             return resolve(results);
    //           }
    //         );
    //       });
    //       let zayavkalarClienttOtkaz = await new Promise(function (
    //         resolve,
    //         reject
    //       ) {
    //         db.query(
    //           `SELECT count(id) from Zayavka where status='canceled_by_client' and bank=${item}`,
    //           function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //               resolve(null);
    //               return null;
    //             }
    //             return resolve(results);
    //           }
    //         );
    //       });

    //       let zayavkalarTimeOtkaz = await new Promise(function (
    //         resolve,
    //         reject
    //       ) {
    //         db.query(
    //           `SELECT count(id) from Zayavka where status='canceled_by_daily' and bank=${item}`,
    //           function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //               resolve(null);
    //               return null;
    //             }
    //             return resolve(results);
    //           }
    //         );
    //       });
    //       let getZayavka = await new Promise(function (resolve, reject) {
    //         db.query(
    //           `SELECT count(id) from Zayavka where bank=${item}  status not in("progress")`,
    //           function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //               resolve(null);
    //               return null;
    //             }
    //             return resolve(results);
    //           }
    //         );
    //       });
    //       if (getZayavka) {
    //         let percentUspeshna = (zayavkalarUspeshna / getZayavka) * 100;
    //         let percentScoring = (zayavkalarScoringOtkaz / getZayavka) * 100;
    //         let percentClient = (zayavkalarClienttOtkaz / getZayavka) * 100;
    //         let percentTime = (zayavkalarTimeOtkaz / getZayavka) * 100;
    //         data.push({
    //           name: item,
    //           statistika: {
    //             success: {
    //               percent: percentUspeshna,
    //               count: zayavkalarUspeshna,
    //             },
    //             scoring_otkaz: {
    //               percent: percentScoring,
    //               count: zayavkalarScoringOtkaz,
    //             },
    //             client_otkaz: {
    //               percent: percentClient,
    //               count: zayavkalarClienttOtkaz,
    //             },
    //             time_otkaz: {
    //               percent: percentTime,
    //               count: zayavkalarTimeOtkaz,
    //             },
    //           },
    //         });
    //       } else {
    //         data.push({
    //           name: item,
    //           statistika: null,
    //         });
    //       }
    //     });
    //   };

      for await (let item of banks) {
        let zayavkalarUspeshna = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT count(id) from Zayavka where step=8 and bank='${item}'`,
            function (err, results, fields) {
              if (err) {
                console.log(err);
                resolve(null);
                return null;
              }
              return resolve(results);
            }
          );
        });
        let zayavkalarScoringOtkaz = await new Promise(function (
          resolve,
          reject
        ) {
          db.query(
            `SELECT count(id) from Zayavka where status='canceled_by_scoring' and bank='${item}'`,
            function (err, results, fields) {
              if (err) {
                console.log(err);
                resolve(null);
                return null;
              }
              return resolve(results);
            }
          );
        });
        let zayavkalarClienttOtkaz = await new Promise(function (
          resolve,
          reject
        ) {
          db.query(
            `SELECT count(id) from Zayavka where status='canceled_by_client' and bank='${item}'`,
            function (err, results, fields) {
              if (err) {
                console.log(err);
                resolve(null);
                return null;
              }
              return resolve(results);
            }
          );
        });

        let zayavkalarTimeOtkaz = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT count(id) from Zayavka where status='canceled_by_daily' and bank='${item}'`,
            function (err, results, fields) {
              if (err) {
                console.log(err);
                resolve(null);
                return null;
              }
              return resolve(results);
            }
          );
        });

        console.log(zayavkalarUspeshna["count(id)"]);
        console.log(zayavkalarClienttOtkaz["count(id)"]);
        console.log(zayavkalarScoringOtkaz["count(id)"]);
        console.log(zayavkalarTimeOtkaz["count(id)"]);

        let getZayavka =
          zayavkalarUspeshna["count(id)"] +
          zayavkalarClienttOtkaz["count(id)"] +
          zayavkalarScoringOtkaz["count(id)"] +
          zayavkalarTimeOtkaz["count(id)"];
        //  await new Promise(function (resolve, reject) {
        //   db.query(
        //     `SELECT count(id) from Zayavka where bank='${item}' `,
        //     function (err, results, fields) {
        //       if (err) {
        //         resolve(null);
        //         return null;
        //       }
        //       return resolve(results);
        //     }
        //   );
        // });
        console.log("getZayavka>>", getZayavka);
        if (getZayavka) {
          let percentUspeshna = (zayavkalarUspeshna / getZayavka) * 100;
          let percentScoring = (zayavkalarScoringOtkaz / getZayavka) * 100;
          let percentClient = (zayavkalarClienttOtkaz / getZayavka) * 100;
          let percentTime = (zayavkalarTimeOtkaz / getZayavka) * 100;

          data.push({
            name: item,
            statistics: {
              success: {
                percent: percentUspeshna,
                count: zayavkalarUspeshna,
              },
              scoring_otkaz: {
                percent: percentScoring,
                count: zayavkalarScoringOtkaz,
              },
              client_otkaz: {
                percent: percentClient,
                count: zayavkalarClienttOtkaz,
              },
              time_otkaz: {
                percent: percentTime,
                count: zayavkalarTimeOtkaz,
              },
            },
          });
        } else {
          data.push({
            name: item,
            statistics: null,
          });
        }
      }

      console.log(data);
    
  }


getStatistics();

