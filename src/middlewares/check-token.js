const jwt = require("../utils/jwt.js");
const User = require("../models/User.js");
const Super = require("../models/Super.js");
const Admin = require("../models/Admin.js");




const {
    AuthorizationError,
    ForbiddenError,
    InternalServerError,
    InvalidTokenError
} = require("../utils/errors.js");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

let db= require("../config/db")


module.exports = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const paramsHeader = req.params.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
             token = paramsHeader && paramsHeader.split(" ")[1];
        }

        if (!token) {
            return next(new AuthorizationError(401, "No token provided"));
        }

        const { userId, agent, role } = jwt.verify(token);
        
        
         let user = await new Promise(function (resolve, reject) {
                db.query(
                  `SELECT * from ${role} WHERE id='${userId}'`,
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
        
       
          
        if (!user) {
            return next(new AuthorizationError(401, "Invalid token"));
        }
       
        // const reqAgent = req.headers["user-agent"];
        // if (agent !== reqAgent) {
        //     return next(
        //         new ForbiddenError(403, "You can't log in different devices")
        //     );
        // }

        req.user = {
            id: user["id"],
            role:user["role"],
        };
        
        return next();
    } catch (error) {
        console.log("check token >>");
        console.log(error);
        if(error instanceof TokenExpiredError) {
            return next(new AuthorizationError(401, "Token has expired"));
        } else if (error instanceof JsonWebTokenError) {
            return next(new InvalidTokenError(401, "Malformed token"));
        }
        
        return next(new InternalServerError(500,  error));
    }
};