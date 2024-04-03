let axios = require("axios");

class CardController {
   async sendOtp(req, res, next) {
     const { cardNumber, expiry } = req.body;
  
    
    
     let url1 = process.env.DAVR_TEST_BASE_URL + process.env.DAVR_LOGIN;
     let url2 = process.env.DAVR_TEST_BASE_URL + "/card/sendOTP";
     const response1 = await axios.post(
       url1,
       {
         username: process.env.DAVR_TEST_USERNAME,
         password: process.env.DAVR_TEST_PASSWORD,
       },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     const response2 = await axios.post(
       url2,
       {
         card: cardNumber,
         expiry: expiry,
       },
       {
         headers: {
           Authorization: "Bearer " + response1.data["token"],
           "Content-Type": "application/json",
         },
       }
     );
     console.log(response2.data);
   
     return res.status(200).json({
       success: true,
       data: response2.data,
     });
   }
   async verify(req, res, next) {
     const { cardNumber, expiry } = req.body;
      if (cardNumber.length != 16) {
        return res.status(400).json({
          success: false,
          message: "Invalid card number !",
        });
      }
      if (expiry.length != 4) {
        return res.status(400).json({
          success: false,
          message: "Invalid card expiration date !",
        });
      }
     let url1 = process.env.DAVR_TEST_BASE_URL + process.env.DAVR_LOGIN;
     let url2 = process.env.DAVR_TEST_BASE_URL + "/card/verify";
     const response1 = await axios.post(
       url1,
       {
         username: process.env.DAVR_TEST_USERNAME,
         password: process.env.DAVR_TEST_PASSWORD,
       },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     console.log(response1.data);
     const response2 = await axios.post(
       url2,
       {
         card: cardNumber,
         expiry: expiry,
       },
       {
         headers: {
           Authorization: "Bearer " + response1.data["token"],
           "Content-Type": "application/json",
         },
       }
     );
     console.log(response2.data);
     return res.status(200).json({
        success: true,
        data:response2.data
     })
   }
 }

 module.exports = new CardController();