const {
    InternalServerError,
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
                name
            } = req.body;
            name = name.replaceAll("'", "ʻ");
           
            let id = await new Promise(function (resolve, reject) {
                db.query(
                  `INSERT INTO FILLIAL (name,address,merchant_id,who_created) VALUES('${name}',${toMyString(address)},'${merchant_id}','{"role":"${req.user.role}","id":${
                    req.user.id
                  },"date": "${new Date().addHours(5).toISOString()}"}') ;`,
                  function (err, results, fields) {
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
            if (req.user.role == "user") {
                return next(
                    new ForbiddenError(
                        403,
                        "You do not have permission to access this resource"
                    )
                );
            }

            let { merchant_id } = req.params;
            let fillials = await FillialModel.find({
                merchant_id,
                work_status: { $not: "deleted" }
            });
            res.status(200).json(fillials);
        } catch (error) {
            console.log(error);
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new Fillial();