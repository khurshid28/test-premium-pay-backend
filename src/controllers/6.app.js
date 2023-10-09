const {
  InternalServerError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors.js");

const AppModel = require("../models/App.js");
let db = require("../config/db");
let axios = require("axios");

const fs = require('fs')
const path=require('path');

class App {
  async update1(req, res, next) {
    try {
      let { fullname, passport } = req.body;
      req.body.user_id = req.user.id;
      let user = await new Promise(function (resolve, reject) {
        db.query(
          `Select * from User WHERE id=${req.user.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });
      req.body.merchant_id = user.merchant_id;
      let id = await new Promise(function (resolve, reject) {
        db.query(update1ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            reject(err);
          }
          console.log();
          if (results.insertId) {
            resolve(results.insertId);
          } else {
            reject(err);
          }
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      res.status(201).json({
        data: zayavka,
        message: "Update 1 is done and Zayavka is created Successfully",
      });
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update2(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update2ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });

      return res.status(200).json({
        message: "Update 2 is done",
      });

      // let token;
      // let urlScoring = ""
      // let urlToken = ""
      // let responseToken = await axios.post(
      //   urlToken,
      //   {
      //     "username": "PP02",
      //     "password": "1500000"

      // },
      //   {
      //     headers: {
      //       "Content-Type":  "application/json"
      //     },
      //   }
      // );
      // token= responseToken.data.token;

      // let response = await axios.post(
      //   urlScoring,
      //   {
      //     "orderId": "PP02",
      //     "amount": "1500000",
      //     "duration": "12",
      //     "passSeria": "AA",
      //     "passNumber": "1234567",
      //     "birthDate": "1986-02-11",
      //     "phoneNumber": "998900051616",
      //     "cardNumber": "8600510387444544",
      //     "inn": "305269071",
      //     "selfie": "/9asdfasdfasdf"
      // },
      //   {
      //     headers: {
      //       "Authorization": "Bearer " + token,
      //       "Content-Type":  "application/json"

      //     },
      //   }
      // );

      // if(response.data.status =="ok"){
      //   await new Promise(function (resolve, reject) {
      //     db.query(update2ZayavkaFunc(req.body), function (err, results, fields) {
      //       if (err) {
      //         return reject(err);
      //       }

      //       resolve(results);
      //     });
      //   });

      //   let zayavka = await new Promise(function (resolve, reject) {
      //     db.query(
      //       `SELECT * from Zayavka WHERE id=${req.body.id}`,
      //       function (err, results, fields) {
      //         if (err) {
      //           reject(err);
      //         }
      //         if (results.length != 0) {
      //           resolve(results[0]);
      //         } else {
      //           resolve(null);
      //         }
      //       }
      //     );
      //   });
      //   return res.status(200).json({
      //     data: zayavka,
      //     message: "Update 2 is done",
      //   });
      // }

      throw new Error("Something Error");
    } catch (error) {
      console.log("error");
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update3(req, res, next) {
    try {
      let { id, max_amount, selfie_with_passport,cardNumber,birthDate } = req.body;
      let url1 = process.env.DAVR_BASE_URL + process.env.DAVR_LOGIN;
      let url2 = process.env.DAVR_BASE_URL + process.env.DAVR_SCORING;
      const response1 = await axios.post(
        url1,
        {
          username: process.env.DAVR_USERNAME,
          password: process.env.DAVR_PASSWORD, 
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });
      let alldata = {
        orderId: "PP-test-" + zayavka.id,
        amount: max_amount,
        duration: "12",
        passSeria: zayavka.passport.substring(0, 2),
        passNumber: zayavka.passport.substring(2),
        birthDate: birthDate,
        phoneNumber: zayavka.phoneNumber,
        phoneNumber2: zayavka.phoneNumber2,
        cardNumber: cardNumber,
        inn: process.env.PREMIUM_INN,
        selfie: "data:image/jpeg;base64,"+ selfie_with_passport,
      };
      fs.writeFileSync(path.join(__dirname, 'output.txt'),JSON.stringify(alldata) , (err) => {
        if (err) throw {
            err,
            type:"file"
        };
       });
      const response2 = await axios.post(url2,{
        orderId: "PP-test-" + zayavka.id,
        amount: max_amount,
        duration: "12",
        passSeria: zayavka.passport.substring(0, 2),
        passNumber: zayavka.passport.substring(2),
        birthDate: birthDate,
        phoneNumber: zayavka.phoneNumber.substring(2),
        phoneNumber2: zayavka.phoneNumber2.substring(2),
        cardNumber: cardNumber,
        inn: process.env.PREMIUM_INN,
        selfie: selfie_with_passport.substring(0, 20),
      },

        {
          headers: {
              "Authorization": "Bearer " + response1.data["token"],
              "Content-Type": "application/json",

          }
      });
      // console.log(response2.data);


      // return next(new InternalServerError(500, "error.message"));

      await new Promise(function (resolve, reject) {
        db.query(update3ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });

      let zayavkaUpdated = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavkaUpdated,
        message: "Update 3 is done",
      });
    } catch (error) {
      console.log("update 3");
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update4(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update4ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Update 4 is done",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update5(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update5ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Update 5 is done",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update6(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update6ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Update 6 is done",
      });
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update7(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update7ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Update 7 is done",
      });
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error.message));
    }
  }

  async updateFinish(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(
          updateFinishZayavkaFunc(req.body),
          function (err, results, fields) {
            if (err) {
              return reject(err);
            }

            resolve(results);
          }
        );
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Update Finish is done",
      });
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error.message));
    }
  }
  async cancel_by_client(req,res,next){
    try {
      await new Promise(function (resolve, reject) {
        db.query(
          cancelByClientZayavkaFunc(req.body),
          function (err, results, fields) {
            if (err) {
              return reject(err);
            }

            resolve(results);
          }
        );
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: zayavka,
        message: "Zayavka is deleted by client",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async getPercents(req, res, next) {
    try {
      let { merchant_id } = req.params;

      let merchant = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from merchant WHERE id=${merchant_id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            } else if (results.length != 0) {
              return resolve(results[0]);
            } else {
              return resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: merchant.expired_months,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }
  async getAll(req, res, next) {
    try {
      let zayavkalar;

      if (req.user.role === "User") {
        zayavkalar = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT * from Zayavka WHERE user_id=${req.user.id} AND step > 0 ORDER BY id DESC `,
            function (err, results, fields) {
              if (err) {
                reject(err);
              }
              return resolve(results);
            }
          );
        });
      } else if (req.user.role === "SuperAdmin") {
        zayavkalar = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT * from Zayavka ORDER BY id DESC`,
            function (err, results, fields) {
              if (err) {
                reject(err);
              }
              return resolve(results);
            }
          );
        });
      } else {
        console.log("keldi >>");
        let user = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT *  from Admin WHERE id=${req.user.id} ORDER BY id DESC`,
            function (err, results, fields) {
              if (err) {
                reject(err);
              }
              return resolve(results[0]);
            }
          );
        });
        if (!user) {
          return next(new NotFoundError(404, "Admin Not Found"));
        }
        // let users = await new Promise(function (resolve, reject) {
        //   db.query(
        //     `SELECT * from User WHERE merchant_id=${user.merchant_id}`,
        //     function (err, results, fields) {
        //       if (err) {
        //         reject(err);
        //       }
        //       return resolve(results);
        //     }
        //   );
        // });
        // if (!users) {
        //   return res.status(200).json({
        //     data: [],
        //   });
        // }
        // let condition = [];
        // users.forEach((u) => {
        //   condition.push(`user_id=${u.id}`);
        // });
        // condition = condition.join(` OR `);
        zayavkalar = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT * from Zayavka WHERE merchant_id=${user.merchant_id} ORDER BY id DESC`,
            function (err, results, fields) {
              if (err) {
                reject(err);
              }
              return resolve(results);
            }
          );
        });
      }
      return res.status(200).json({
        data: zayavkalar,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }
   



}

function update1ZayavkaFunc(data) {
  let { user_id, merchant_id, fullname, passport } = data;
  fullname = `${fullname}`;
  fullname = fullname.replaceAll("'", "ʻ");
  return `INSERT INTO Zayavka (user_id,merchant_id,fullname,passport) VALUES (${user_id},${merchant_id},'${fullname}','${passport}') ; `;
}

function update2ZayavkaFunc(data) {
  let { id, phoneNumber, phoneNumber2, cardNumber } = data;

  return `UPDATE Zayavka SET step=2,phoneNumber ='${phoneNumber}',phoneNumber2 ='${phoneNumber2}',cardNumber='${cardNumber}' WHERE id = ${id};`;
}

function update3ZayavkaFunc(data) {
  let { id, max_amount } = data;
  return `UPDATE Zayavka SET step=3,max_amount='${max_amount}' WHERE id = ${id};`;
}

function update4ZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=4 WHERE id = ${id};`;
}

function update5ZayavkaFunc(data) {
  let { id, products, location, device, amount } = data;
  let productsString = `'[`;
  products.forEach((product) => {
    productsString += toMyString(product).slice(1, -1);
    productsString += `,`;
  });
  productsString = productsString.slice(0, -1);
  productsString += "]'";
  console.log(productsString);
  return `UPDATE Zayavka SET step=5,amount=${amount},products=${productsString},location=${toMyString(
    location
  )},device=${toMyString(device)} WHERE id = ${id};`;
}

function update6ZayavkaFunc(data) {
  let { id, payment_amount, expired_month } = data;
  return `UPDATE Zayavka SET step=6,payment_amount=${payment_amount},expired_month = ${expired_month} WHERE id = ${id};`;
}

function update7ZayavkaFunc(data) {
  let { id, selfie } = data;
  return `UPDATE Zayavka SET step=7,selfie='${selfie}' WHERE id = ${id};`;
}

function updateFinishZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=8,agree = TRUE,status = 'finished',finished_time = CURRENT_TIMESTAMP + INTERVAL 5 HOUR WHERE id = ${id};`;
}
function cancelByClientZayavkaFunc(data) {
  let { id, canceled_reason } = data;
  return `UPDATE Zayavka SET status = 'canceled_by_client', finished_time = CURRENT_TIMESTAMP + INTERVAL 5 HOUR,canceled_reason='${canceled_reason}' WHERE id = ${id}`;
}

function toMyString(ob) {
  let result = `'{`;
  let li = [];
  for (let [key, value] of Object.entries(ob)) {
    value = `${value}`;
    value = value.replaceAll("'", "ʻ");
    li.push(`"${key}":"${value}"`);
  }
  result += li.join();
  if (ob.role) {
    result += `,"date": "${new Date().addHours(5).toISOString()}"`;
  }
  result = result + `}'`;
  return result;
}

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

module.exports = new App();
