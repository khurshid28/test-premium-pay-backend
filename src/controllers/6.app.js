const {
  InternalServerError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors.js");

const AppModel = require("../models/App.js");
let db = require("../config/db");
// let dbtest = require("../config/dbtest");
let axios = require("axios");

const fs = require("fs");
const path = require("path");

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
              resolve(null);
              return null;
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
      req.body.fillial_id = user.fillial_id;

      let id = await new Promise(function (resolve, reject) {
        db.query(update1ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            resolve(null);
            return null;
          }
          console.log();
          if (results.insertId) {
            resolve(results.insertId);
          } else {
            resolve(null);
            return null;
          }
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
      return next(new InternalServerError(500, error));
    }
  }
  async update2(req, res, next) {
    try {
      let { id, fullname, phoneNumber, phoneNumber2, cardNumber,passport_date,passport_by,address,region_id } = req.body;
      fullname = `${fullname}`;
      fullname = fullname.replaceAll("ʻ", "'");
      passport_by = passport_by.replaceAll("ʻ", "'");
      console.log(req.body);
      await new Promise(function (resolve, reject) {
        db.query(
          update2ZayavkaFunc(req.body),
          [ 2, phoneNumber, phoneNumber2, cardNumber,passport_date,passport_by,JSON.stringify(address),region_id,id],
          function (err, results, fields) {
            console.log(err);
            if (err) {
              resolve(null);
              return null;
            }

            resolve(results);
          }
        );
      });

      let zayavkaUpdated = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
        message: "Update 2 is done",
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }
  async update3(req, res, next) {
    try {
      let {
        id,
        max_amount,
        selfie_with_passport,
        cardNumber,
        birthDate,
        IdentificationVideoBase64,
      } = req.body;

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });
      let fillial = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from fillial WHERE id=${zayavka.fillial_id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });
      console.log(fillial);

      //  fillial.expired_months =[
      //   {
      //       "month" :12,
      //       "percent" :41,
      //   },
      //    {
      //       "month" :9,
      //       "percent" :34,
      //   },
      //    {
      //       "month" :6,
      //       "percent" :30,
      //   },
      //   ];
      let arr = fillial.expired_months.map((obj) => {
        return obj.month;
      });

      var largest = Math.max.apply(0, arr);
      console.log(largest);
      let val = fillial.expired_months[arr.indexOf(`${largest}`)];
      for (let index = 0; index < 20; index++) {
        console.log(">>>>>>>>>>>>>>>");
        console.log( Math.floor((max_amount * (100 + val["percent"])) / 100));

      }
      console.log(val);

      let alldata = {
        orderId: "PremiumPayDavr-" + zayavka.id,
        amount: Math.floor((max_amount * (100 + val["percent"]))/ 100),
        duration: "12",
        term: "12",
        passSeria: zayavka.passport.substring(0, 2),
        passNumber: zayavka.passport.substring(2),
        birthDate: birthDate,
        phoneNumber: zayavka.phoneNumber,
        phoneNumber2: zayavka.phoneNumber2,
        cardNumber: cardNumber,
        inn: process.env.PREMIUM_INN,
        selfie: selfie_with_passport.substring(0, 30),
        identificationVideoBase64: IdentificationVideoBase64.substring(0, 30),
      };


      fs.appendFile(
        path.join(__dirname, "output.txt"),
        `\n ${Date().toString()}` + " >> " + JSON.stringify(alldata),
        (err) => {
          if (err)
            throw {
              err,
              type: "file",
            };
        }
      );

      return next(new InternalServerError(500, error));
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

      console.log("IdentificationVideoBase64 : " + IdentificationVideoBase64);

      const response2 = await axios.post(
        url2,
        {
          orderId: "PremiumPayDavr-" + zayavka.id,
          amount: Math.floor((max_amount * (100 + val["percent"])) / 100),
          term: "12",
          duration: "12",
          passSeria: zayavka.passport.substring(0, 2),
          passNumber: zayavka.passport.substring(2),
          birthDate: birthDate,
          phoneNumber: zayavka.phoneNumber.substring(1),
          phoneNumber2: zayavka.phoneNumber2.substring(1),
          cardNumber: cardNumber,
          // inn: process.env.PREMIUM_INN,
          // inn: "200655453",
          // inn: "303107528", elma
          // inn:"303085034", // javohir
          inn: "305207299", // surat

          identificationVideoBase64: IdentificationVideoBase64,
          selfie: selfie_with_passport,
        },
        {
          headers: {
            Authorization: "Bearer " + response1.data["token"],
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response2.data);

      await new Promise(function (resolve, reject) {
        db.query(update3ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return resolve(null);
            return null;
          }
          resolve(results);
        });
      });

      let zayavkaUpdated = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
      return next(new InternalServerError(500, error));
    }
  }
  async update4(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update4ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return resolve(null);
            return null;
          }

          resolve(results);
        });
      });

      let zayavkaUpdated = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
        message: "Update 4 is done",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }
  async update5(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update5ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return resolve(null);
            return null;
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
      return next(new InternalServerError(500, error));
    }
  }
  async update6(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(update6ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return resolve(null);
            return null;
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
      return next(new InternalServerError(500, error));
    }
  }
  async updateFinish(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(
          updateFinishZayavkaFunc(req.body),
          function (err, results, fields) {
            if (err) {
              return resolve(null);
              return null;
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
              resolve(null);
              return null;
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
        message: "Update is finished Successfully",
      });
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error));
    }
  }

  async update7(req, res, next) {
    try {
      let url1 = process.env.DAVR_BASE_URL + process.env.DAVR_LOGIN;
      let url2 = process.env.DAVR_BASE_URL + process.env.DAVR_AGREEMENT;
      let { contractPdf, id } = req.body;
      let date = new Date();
      let singedAt = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      console.log(singedAt);
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

      let zayavka1 = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            }
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });
      //   console.log({ "orderId": `PremiumPayDavr-${zayavka1.id}`,
      //   "term": "12",
      //   singedAt,
      //   "oferta":true,
      // });
      const response2 = await axios.post(
        url2,

        {
          orderId: `PremiumPayDavr-${id}`,
          term: `${zayavka1.expired_month}`,
          oferta: true,
          contractPdf: contractPdf,
        },
        {
          headers: {
            Authorization: "Bearer " + response1.data["token"],
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response2.data);

      await new Promise(function (resolve, reject) {
        db.query(update7ZayavkaFunc(req.body), function (err, results, fields) {
          if (err) {
            return resolve(null);
            return null;
          }

          resolve(results);
        });
      });

      let zayavka = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from Zayavka WHERE id=${req.body.id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
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
        message: "Update 7 is done , oferta is sent ",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }

  async cancel_by_client(req, res, next) {
    try {
      await new Promise(function (resolve, reject) {
        db.query(
          cancelByClientZayavkaFunc(req.body),
          function (err, results, fields) {
            if (err) {
              return resolve(null);
              return null;
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
              resolve(null);
              return null;
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
        message: "Zayavka is canceled by client",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error));
    }
  }
  async getPercents(req, res, next) {
    try {
      let { fillial_id } = req.params;

      let fillial = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from fillial WHERE id=${fillial_id}`,
          function (err, results, fields) {
            if (err) {
              resolve(null);
              return null;
            } else if (results.length != 0) {
              return resolve(results[0]);
            } else {
              return resolve(null);
            }
          }
        );
      });

      return res.status(200).json({
        data: fillial.expired_months,
        type: fillial.percent_type,
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
                resolve(null);
                return null;
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
                resolve(null);
                return null;
              }
              return resolve(results);
            }
          );
        });
      } else if (req.user.role === "FillialAdmin") {
        let user = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT * from FillialAdmin WHERE id=${req.user.id}`,
            function (err, results, fields) {
              if (err) {
                resolve(null);
                return null;
              }
              if (results.length != 0) {
                resolve(results[0]);
              } else {
                resolve(null);
              }
            }
          );
        });
        console.log(user);
        zayavkalar = await new Promise(function (resolve, reject) {
          db.query(
            `SELECT * from Zayavka WHERE fillial_id='${user.fillial_id}' ORDER BY id DESC `,
            function (err, results, fields) {
              if (err) {
                resolve(null);
                return null;
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
                resolve(null);
                return null;
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
        //          resolve(null);
        return null;
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
                resolve(null);
                return null;
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
  let { user_id, merchant_id, fillial_id, fullname, passport } = data;
  fullname = `${fullname}`;
  fullname = fullname.replaceAll("ʻ", "'");
  return `INSERT INTO Zayavka (user_id,merchant_id,fillial_id,fullname,passport) VALUES (${user_id},${merchant_id},${fillial_id},'${fullname}','${passport}') ; `;
}

function update2ZayavkaFunc(data) {
  let {
    id,
    phoneNumber,
    phoneNumber2,
    cardNumber,
    passport_by,
    passport_date,
    address,
    region_id,
  } = data;
  
  // passport_by = passport_by.replaceAll("ʻ", "'");
  // address = address.replaceAll("ʻ", "'");
  return `UPDATE Zayavka SET step=?,phoneNumber=?,phoneNumber2=?,cardNumber=?,passport_date=?,passport_by=?,address=?,region_id=? WHERE id = ?`;
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
  let { id } = data;
  return `UPDATE Zayavka SET step=7,agree = TRUE WHERE id = ${id};`;
}

function updateFinishZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=8,selfie='/static/images/zayavka${id}.jpg',status = 'finished',finished_time = CURRENT_TIMESTAMP  WHERE id = ${id};`;
}

function cancelByClientZayavkaFunc(data) {
  let { id, canceled_reason } = data;
  return `UPDATE Zayavka SET status = 'canceled_by_client', finished_time = CURRENT_TIMESTAMP ,canceled_reason='${canceled_reason}' WHERE id = ${id}`;
}

function toMyString(ob) {
  let result = `'{`;
  let li = [];
  for (let [key, value] of Object.entries(ob)) {
    value = `${value}`;
    value = value.replaceAll("ʻ", "'");
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
