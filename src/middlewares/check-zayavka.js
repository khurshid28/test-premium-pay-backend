const jwt = require("../utils/jwt.js");
const User = require("../models/User.js");
const Super = require("../models/Super.js");
const Admin = require("../models/Admin.js");




const {
    AuthorizationError,
    ForbiddenError,
    InternalServerError,
    InvalidTokenError,
    UnAvailableError
    
} = require("../utils/errors.js");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

let db= require("../config/db")


module.exports = async(req, res, next) => {
    try {
        return next();
        console.log(req.body.id);
        // let {passport} = req.body;
        let Myzayavka = await new Promise(function (resolve, reject) { 
            db.query(
              `Select * from Zayavka WHERE id='${req.body.id}'`,
              function (err, results, fields) {
                if (err) {
                   reject(err);
                }
                // console.log("++++", results);
                if (results.length != 0) {
                  resolve(results[0]);
                } else {
                  
                    resolve(null);
                }
              }
            );
          });
        //   console.log("Myzayavka >>>>");
        //  console.log(Myzayavka);
        let zayavka = await new Promise(function (resolve, reject) { 
         db.query(
           `Select * from Zayavka WHERE passport='${Myzayavka.passport}' AND id != '${req.body.id}' `,
           function (err, results, fields) {
            
             if (err) {
                reject(err);
             }
            //  console.log("++++", results);
             if (results.length != 0) {
                
               resolve(results[0]);
             } else {
               
                 resolve(null);
             }
           }
         );
       });
    //    console.log(zayavka);
       if (!zayavka) {
        return  next();
       }
      if(zayavka.status == "progress" &&  Date.daysBetween(Date.parse(zayavka.created_time),Date.now() ) < 60 ){
        return next(new UnAvailableError(501,"User is unavailable"));
      }else{
         if(zayavka.status == "canceled_by_scoring" &&  Date.daysBetween(Date.parse(zayavka.finished_time),Date.now() ) < 3){
            return next(new UnAvailableError(501,"User is unavailable"));
         }else{
            return next();
         }
         
      }
    } catch (error) {
        console.log("error >>");
        console.log(error);
        if (error instanceof TokenExpiredError) {
            return next(new AuthorizationError(401, "Token has expired"));
        } else if (error instanceof JsonWebTokenError) {
            return next(new InvalidTokenError(401, "Malformed token"));
        }
        
        return next(new InternalServerError(500, error.message));
    }
};