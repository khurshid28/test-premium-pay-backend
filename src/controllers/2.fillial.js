const {
    InternalServerError, ForbiddenError,
} = require("../utils/errors.js");

const FillialModel = require("../models/Fillial.js");

let db =require("../config/db")


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

class Fillial {

    async create(req, res, next) {
       
        try {
            if (req.user.role === "user") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }
            let {
                merchant_id,
                address,
                name,
                inn,
                mfo,
                nds,
                bank_name,
                hisob_raqam,
                director_name,
                director_phone


            } = req.body;
            name = name.replaceAll("'", "ʻ");
            director_name = director_name.replaceAll("'", "ʻ");
            bank_name = bank_name.replaceAll("'", "ʻ");
            
           
            let id = await new Promise(function (resolve, reject) {
                db.query(
                  `INSERT INTO fillial (name,address,merchant_id,who_created,inn,mfo,bank_name,nds,hisob_raqam,director_name,director_phone) VALUES('${name}',${toMyString(address)},'${merchant_id}','{"role":"${req.user.role}","id":${
                    req.user.id
                  },"date": "${new Date().addHours(5).toISOString()}"}','${inn}','${mfo}','${bank_name}','${nds}','${hisob_raqam}','${director_name}','${director_phone}') ;`,
                  function (err, results, fields) {
                    console.log(">>>>>>....");
                    console.log(err);
                    if (err) {
                      reject(err);
                    }
                    console.log("++++", results);
                    if (results.insertId) {
                      resolve(results.insertId);
                    } else {
                      reject(err);
                    }
                  }
                );
              });

          return  res.status(201).json({
                "message": "Fillial is created successfully",
                id
            });
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            if (!(req.user.role == "SuperAdmin" || req.user.role == "Admin")) {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }
           
            let fillials = await new Promise(function (resolve, reject) {
              db.query(
                `SELECT * FROM merchant;`,
                function (err, results, fields) {
                  if (err) {
                    reject(err);
                  }
                  console.log("++++", results);
                  if (results.length != 0) {
                    resolve(results);
                  } else {
                    resolve(null);
                  }
                }
              );
            });
            res.status(200).json({data:fillials});
        } catch (error) {
            console.log(error);
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new Fillial();