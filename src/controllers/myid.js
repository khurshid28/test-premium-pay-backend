const {
    InternalServerError,
    ForbiddenError
} = require("../utils/errors.js");
let axios = require("axios")

let db = require("../config/db")
class Myid {

    async getMe(req, res, next) {

        
        try {
            let { code } = req.body;
            let url1 = process.env.FACE_URL + "oauth2/access-token"
            let url2 = process.env.FACE_URL + "users/me"
            const response1 = await axios.post(url1, {
                "grant_type": "authorization_code",
                "code": code,
                "client_id": process.env.FACE_CLIENT_ID,
                "client_secret": process.env.FACE_CLIENT_SECRET,
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const response2 = await axios.get(url2, {
                headers: {
                    "Authorization": "Bearer " + response1.data["access_token"]
                }
            });
          return res.status(200).json(response2.data);
        } catch (error) {
            console.log(error);
            return next(new InternalServerError(500, error.message));
        }
    }


    
    async check(req, res, next) {
  
      
        try {
           let {passport} = req.body;
           console.log(req.body);
           let zayavka2 = await new Promise(function (resolve, reject) { 
            db.query(
              `Select * from Zayavka WHERE passport='${passport}' AND status='canceled_by_scoring ORDER BY id DESC '`,
              function (err, results, fields) {
                // console.log("here");
                // console.log(err);
                if (err) {
                   reject(err);
                }
                console.log("++++", results.length+"ta topildi");
                if (results.length != 0) {
                   
                  resolve(results[0]);
                } else {
                    resolve(null);
                }
              }
            );
          });
          
          if(zayavka2){
            if(Date.daysBetween(Date.parse(zayavka2.finished_time),Date.now() ) < 4 ){
                return res
                .status(200)
                .json({  message: "Пользователю не предоставлено разрешение",status : false });
             }
          }


           let zayavka = await new Promise(function (resolve, reject) { 
            db.query(
              `Select * from Zayavka WHERE passport='${passport}' AND status='finished' ORDER BY id DESC `,
              function (err, results, fields) {
                if (err) {
                   reject(err);
                }
                console.log("++++", results.length+"ta topildi");
                if (results.length != 0) {
                   
                  resolve(results[0]);
                } else {
                  
                    resolve(null);
                }
              }
            );
          });
          

          if (!zayavka) {
           return res
            .status(200)
            .json({  message: "Пользователю предоставлено разрешение",status : true });
          }else{
            if(Date.daysBetween(Date.parse(zayavka.finished_time),Date.now() ) < 60 ){
                return res
                .status(200)
                .json({  message: "Пользователю не предоставлено разрешение",status : false });
             }
          }
          return res
            .status(200)
            .json({  message: "Пользователю предоставлено разрешение",status : true });
        
        

        } catch (error) {
            console.log(">>>>>>>>>. ERROR >>>>>>>>>>");
            console.log(error);
            return next(new InternalServerError(500, error.message));
        }
    }




}


Date.daysBetween = function( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    

    
  
    // Calculate the difference in milliseconds
    var difference = date2 - date1;
  
    // Convert back to days and return
    return Math.round(difference/one_day); 
  }


module.exports = new Myid();