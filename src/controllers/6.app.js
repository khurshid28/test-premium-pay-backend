const {
  InternalServerError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors.js");

const AppModel = require("../models/App.js");
let db = require("../config/db");
let axios = require("axios");

class App {
  async update1(req, res, next) {
    try {
      if (req.user.role != "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }

      await new Promise(function (resolve, reject) {
        db.query(update3ZayavkaFunc(req.body), function (err, results, fields) {
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
        message: "Update 3 is done",
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async update4(req, res, next) {
    try {
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }

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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }

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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
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
      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
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
  

  async getPercents(req, res, next) {
    try {



      if (req.user.role !== "User") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }

      let {merchant_id} =req.params;

      let merchant = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * from merchant WHERE id=${merchant_id}`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }else if (results.length !=0) {
              return resolve(results[0]);
            }else{
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
            `SELECT * from Zayavka WHERE user_id=${req.user.id} ORDER BY id DESC`,
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
          db.query(`SELECT * from Zayavka ORDER BY id DESC`, function (err, results, fields) {
            if (err) {
              reject(err);
            }
            return resolve(results);
          });
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

  async get(req, res, next) {
    if (req.user.role !== "user") {
      return next(
        new ForbiddenError(
          403,
          "You do not have permission to access this resource"
        )
      );
    }
    try {
      const apps = await AppModel.find({ user_id: req.user.id });
      res.status(200).json(apps);
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500, error.message));
    }
  }
}

function update1ZayavkaFunc(data) {
  let { user_id, merchant_id } = data;
  return `INSERT INTO Zayavka (user_id,merchant_id) VALUES (${user_id},${merchant_id}) ; `;
}

function update2ZayavkaFunc(data) {
  let { id, fullname, phoneNumber, phoneNumber2, cardNumber, passport } = data;
  fullname = `${fullname}`;
  fullname = fullname.replaceAll("'", "ʻ");
  return `UPDATE Zayavka SET step=2,fullname='${fullname}',phoneNumber ='${phoneNumber}',phoneNumber2 ='${phoneNumber2}',cardNumber='${cardNumber}',passport='${passport}' WHERE id = ${id};`;
}

function update3ZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=3 WHERE id = ${id};`;
}

function update4ZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=4 WHERE id = ${id};`;
}

function update5ZayavkaFunc(data) {
  let { id } = data;
  return `UPDATE Zayavka SET step=5,agree = TRUE WHERE id = ${id};`;
}

function update6ZayavkaFunc(data) {
  let { id, products, location, device } = data;
  let productsString = `'[`;
  products.forEach((product) => {
    productsString += toMyString(product).slice(1, -1);
    productsString += `,`;
  });
  productsString = productsString.slice(0, -1);
  productsString += "]'";
  console.log(productsString);
  return `UPDATE Zayavka SET step=6,products=${productsString},location=${toMyString(
    location
  )},device=${toMyString(device)} WHERE id = ${id};`;
}

function update7ZayavkaFunc(data) {
  let { id, amount, payment_amount, expired_month } = data;
  return `UPDATE Zayavka SET step=7,amount=${amount},payment_amount=${payment_amount},expired_month = ${expired_month} WHERE id = ${id};`;
}

function updateFinishZayavkaFunc(data) {
  let { id, selfie } = data;
  return `UPDATE Zayavka SET step=8,selfie='${selfie}',status = 'finished',finished_time = CURRENT_TIMESTAMP + INTERVAL 5 HOUR WHERE id = ${id};`;
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
