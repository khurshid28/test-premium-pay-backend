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
                
              }
               resolve(results);
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
                 null;
              }
               resolve(results);
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
          
              }
               resolve(results);
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
               
              }
               resolve(results);
            }
          );
        });

        console.log(zayavkalarUspeshna[0]["count(id)"]);
        console.log(zayavkalarClienttOtkaz[0]["count(id)"]);
        console.log(zayavkalarScoringOtkaz[0]["count(id)"]);
        console.log(zayavkalarTimeOtkaz[0]["count(id)"]);

        let getZayavka =
          zayavkalarUspeshna[0]["count(id)"] +
          zayavkalarClienttOtkaz[0]["count(id)"] +
          zayavkalarScoringOtkaz[0]["count(id)"] +
          zayavkalarTimeOtkaz[0]["count(id)"];
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
          let percentUspeshna = (zayavkalarUspeshna[0]["count(id)"] / getZayavka) * 100;
          let percentScoring = (zayavkalarScoringOtkaz[0]["count(id)"] / getZayavka) * 100;
          let percentClient = (zayavkalarClienttOtkaz[0]["count(id)"] / getZayavka) * 100;
          let percentTime = (zayavkalarTimeOtkaz[0]["count(id)"] / getZayavka) * 100;

          data.push({
            name: item,
            statistics: {
              success: {
                percent: percentUspeshna,
                count: zayavkalarUspeshna[0]["count(id)"],
              },
              scoring_otkaz: {
                percent: percentScoring,
                count: zayavkalarScoringOtkaz[0]["count(id)"],
              },
              client_otkaz: {
                percent: percentClient,
                count: zayavkalarClienttOtkaz[0]["count(id)"],
              },
              time_otkaz: {
                percent: percentTime,
                count: zayavkalarTimeOtkaz[0]["count(id)"],
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

      console.log(JSON.stringify(data));
    
  }


getStatistics();

