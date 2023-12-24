const Super = require("../models/Super.js");
const Admin = require("../models/Admin.js");
const User = require("../models/User.js");
const Merchant = require("../models/Merchant.js");
const fs = require('fs')
let path =require('path');

const {
    InternalServerError,
    AuthorizationError, 
    BadRequestError,
    NotFoundError,
    ForbiddenError
} = require("../utils/errors.js");
const jwt = require("../utils/jwt.js");


let db =require("../config/db")

class Scoring {
    async get(req, res, next) {
        try {
            return res
            .status(200)
            .json({  message: "Here is result" });
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500,  error));
        }
    }
    async post(req, res, next) {
        console.log("post")
        try {


            let { orderId,status,reason,summa } = req.body;
            console.log(req.body);
            let id = `${orderId}`.split("-")[1]
            if(reason){
              reason = reason.replaceAll("'", "ʻ")
            }

            const filePath = path.resolve(__dirname, 'scoring_data.txt')
             fs.appendFileSync(filePath,`\n ${Date().toString()}` +" >> "+ JSON.stringify(req.body) , (err) => {
              if (err) throw {
                  err,
                  type:"file"
              };
             });
           if (status == "1") {
              await new Promise(function (resolve, reject) {
                  db.query(
                    `UPDATE Zayavka SET scoring_start = CURRENT_TIMESTAMP WHERE id = ${id};`,
                    function (err, results, fields) {
                      if (err) {
                         reject(err);
                      }
                      if (results) {
                        resolve(results);
                      } else {
                        reject(err);
                      }
                    }
                  );
                });
             }

           else if (status == "3") {
           
              await new Promise(function (resolve, reject) {
                db.query(
                  `UPDATE Zayavka SET scoring_end = CURRENT_TIMESTAMP,status = 'canceled_by_scoring', finished_time = CURRENT_TIMESTAMP ,canceled_reason='${reason}' WHERE id = ${id};`,
                  function (err, results, fields) {
                    if (err) {
                       reject(err);
                    }
                    if (results) {
                      resolve(results);
                    } else {
                      reject(err);
                    }
                  }
                );
              });
           }else if (status == "4") {
           
            await new Promise(function (resolve, reject) {
              db.query(
                `UPDATE Zayavka SET step=4,paid_status='waiting',scoring_end = CURRENT_TIMESTAMP WHERE id = ${id};`,
                function (err, results, fields) {
                  if (err) {
                     reject(err);
                  }
                  if (results) {
                    resolve(results);
                  } else {
                     reject(err);
                  }
                }
              );
            });
           
           }
           else if (status == "7") {
            
            await new Promise(function (resolve, reject) {
              db.query(
                `UPDATE Zayavka SET paid_status='paid' WHERE id = ${id};`,
                function (err, results, fields) {
                  if (err) {
                     reject(err);
                  }
                  if (results) {
                    resolve(results);
                  } else {
                     reject(err);
                  }
                }
              );
            });
           }
           else if (status == "8") {
            
            await new Promise(function (resolve, reject) {
              db.query(
                `UPDATE Zayavka SET paid_status='canceled' WHERE id = ${id};`,
                function (err, results, fields) {
                  if (err) {
                     reject(err);
                  }
                  if (results) {
                    resolve(results);
                  } else {
                     reject(err);
                  }
                }
              );
            });
           }

           return res
           .status(200)
           .json({
               "status":true,
               "message":"qabul qilindi"
             });


        } catch (error) {
          console.log(error);
            return next(new InternalServerError(500,  error));
        }
    }
   
}




module.exports = new Scoring();