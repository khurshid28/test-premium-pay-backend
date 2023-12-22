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
// const { mockUser, mockSuper } = require("../../mock.js");

let db =require("../config/db")

class Scoring {
    async get(req, res, next) {
        try {
            return res
            .status(200)
            .json({  message: "Here is result" });
        

          
        } catch (error) {
            console.log(error.message)
            return next(new InternalServerError(500, error.message));
        }
    }
    async post(req, res, next) {
        console.log("post")
        try {


            let { orderId,status,reason,summa } = req.body;
            const filePath = path.resolve(__dirname, 'scoring_data.txt')
             fs.appendFileSync(filePath,Date.now().toString +" >> "+ JSON.stringify(req.body) , (err) => {
              if (err) throw {
                  err,
                  type:"file"
              };
             });
           if (status == "3") {
            await new Promise(function (resolve, reject) {
                db.query(
                    cancelByScoringZayavkaFunc({id:orderId,reason:reason}),
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
                  update4ZayavkaFunc({id:orderId}),
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
            return next(new InternalServerError(500, error.message));
        }
    }
   
}


function cancelByScoringZayavkaFunc(data) {
    let { id,reason } = data;
    id = `${id}`.split("-")[1]
    reason = reason.replaceAll("'", "ʻ")
    return `UPDATE Zayavka SET status = 'canceled_by_scoring', finished_time = CURRENT_TIMESTAMP ,canceled_reason='${reason}' WHERE id = ${id}`;
  }
  function update4ZayavkaFunc(data) {
    let { id } = data;
    console.log(id);
    id = `${id}`.split("-")[1]
    return `UPDATE Zayavka SET step=4 WHERE id = ${id};`;
  }

module.exports = new Scoring();