let { InternalServerError, BadRequestError, ForbiddenError } = require("../utils/errors.js");
let cryptoRandomString = require("secure-random-string");


let db = require("../config/db");

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
class Merchant {
  async create(req, res, next) {
    try {
      if (req.user.role != "SuperAdmin") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
      let {
        name,
        type,
        // percent_type,
        expired_months,
        admin,
      } = req.body;

      let expired_monthsString = `'[`;
      expired_months.forEach((expired_month) => {
        expired_monthsString += toMyString(expired_month).slice(1, -1);
        expired_monthsString += `,`;
      });
      expired_monthsString = expired_monthsString.slice(0, -1);
      expired_monthsString += "]'";

      name = name.replaceAll("'", "ʻ");
      let id = await new Promise(function (resolve, reject) {
        db.query(
          `INSERT INTO merchant (name,type,expired_months,who_created) VALUES('${name}','${type}',${expired_monthsString},'{"role":"SuperAdmin","id":${
            req.user.id
          },"date": "${new Date().toISOString()}"}') ;`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            console.log("++++", results);
            if (results) {
              resolve(results.insertId);
            } else {
              reject(err);
            }
          }
        );
      });

      let loginName = cryptoRandomString({ length: 10 });
      let loginPassword = cryptoRandomString({ length: 15 });
      admin.loginName = loginName;
      admin.loginPassword = loginPassword;
      admin.fullName = admin.fullName.replaceAll("'", "ʻ");
 
      let admin_id = await new Promise(function (resolve, reject) {
        db.query(
          `INSERT INTO Admin (loginName,loginPassword,fullName,phoneNumber,merchant_id) VALUES('${loginName}','${loginPassword}','${admin.fullName}',${admin.phoneNumber},${id}) ;`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            console.log("++++", results);
            if (results) {
              resolve(results.insertId);
            } else {
              reject(err);
            }
          }
        );
      });
      console.log("merchant created", id);
        // let adminUser = await new Promise(function (resolve, reject) {
        //   db.query(
        //       `SELECT * from Admin WHERE id=${admin_id};`,
        //       function (err, results, fields) {
        //         if (err) {
        //            reject(err);
        //         }
        //         console.log("++++", results);
        //         if (results) {
        //           resolve(results[0]);
        //         } else {
        //            reject(err);
        //         }
        //       }
        //     );
        //   });

        // console.log(adminUser);


        let result = await new Promise(function (resolve, reject) {
            db.query(
                `UPDATE merchant SET admin_id =${admin_id} WHERE id = ${id};`,
                function (err, results, fields) {
                  if (err) {
                     reject(err);
                  }
                  console.log("99999", results);
                  if (!results.warningStatus) {
                    resolve("success");
                  } else {
                     reject(err);
                  }
                }
              );
            });
      if (result =="success") {
              return   res.status(201).json({
              "message": "Merchant and Admin is created successfully",
              "merchant_id":id,
               admin_id
             
          });
      } else {
          return next(new BadRequestError(400, "Admin isnot created"));
      }
      // admin_id = null

      // let {
      //     fullName,
      //     phoneNumber,
      //     work_status,
      //     type,
      //     name,
      //     merchant_id,
      // } =req.body.user;

      // let admin = await AdminModel.create({
      //     fullName,
      //     phoneNumber,
      //     address,
      //     loginName,
      //     loginPassword,

      // });
      // console.log("admin >>")
      // console.log(admin)
      // if (admin) {
      //     console.log("user")
      //     console.log(req.user)
      //     let merchant = await MerchantModel.create({
      //         "who_created": req.user["id"],
      //         "admin_id": admin["_id"],
      //         type,
      //         name,
      //         percent,
      //         expired_months
      //     });
      //     res.status(201).json({
      //         "message": "Merchant is created successfully",
      //         admin,
      //         merchant
      //     });
      // } else {
      //     return next(new BadRequestError(400, "Admin isnot created"));
      // }

    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500,  error));
    }
  }

  async getAll(req, res, next) {
    console.log("getAll ");
    try {
     
      if (req.user.role != "SuperAdmin") {
        return next(
          new ForbiddenError(
            403,
            "You do not have permission to access this resource"
          )
        );
      }
     
      let merchants = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * FROM merchant;`,
          function (err, results, fields) {
            console.log(err);
            if (err) {
              reject(err);
            }
            // console.log(">>>>>>>..");
            // console.log("++++", results);
            console.log(err);

            if (results) {
              resolve(results);
            } else {
              resolve([]);
            }
          }
        );
      });

      console.log(merchants);
      return res.status(200).json({data:merchants});
    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500,  error));
    }
  }



  async get(req, res, next) {
    try {
      // if (req.user.role !== "super_admin") {
      //   return next(
      //     new ForbiddenError(
      //       403,
      //       "You do not have permission to access this resource"
      //     )
      //   );
      // }
     
      let merchant = await new Promise(function (resolve, reject) {
        db.query(
          `SELECT * FROM merchant WHERE id ='${req.params.id}';`,
          function (err, results, fields) {
            if (err) {
              reject(err);
            }
            console.log("++++", results);
            if (results.length != 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

     
      return res.status(200).json({data:merchant});


    } catch (error) {
      console.log(error.message);
      return next(new InternalServerError(500,  error));
    }
  }
}

module.exports = new Merchant();
