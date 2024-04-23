var pdf = require("pdf-creator-node");
const path = require("path");
let fs = require("fs");
module.exports = async function (z) {
    let zayavka ={
      "id": 705,
      "merchant_id": 2,
      "fillial_id": 1,
      "user_id": 3,
      "fullname": "Xurshid Ismoilov O‘tkir o‘g‘li",
      "phoneNumber": "+998950642827",
      "phoneNumber2": "+998950642827",
      "cardNumber": "860014******0006",
      "passport": "AB6935244",
      "passport_date": "15.06.2017",
      "passport_by": "Buxoro viloyati Qorako'l tumani Ichki ishlar boshqarmasi",
      "address": {
          "city": "ҚОРАКЎЛ ТУМАНИ",
          "home": "Бухарская область, Каракульский район, Арабхона МСГ, Арабхона, дом 53",
          "region": "БУХОРО ВИЛОЯТИ"
      },
      "region_id": 20,
      "status": "canceled_by_daily",
      "canceled_reason": "Автоматический",
      "device": {
          "id": "UP1A.231005.007",
          "name": "Redmi fire"
      },
      "location": {
          "lat": "41.2719656",
          "long": "69.2319445"
      },
      "products": [
          {
              "name": "xgfsgd",
              "price": "500000"
          }
      ],
      "amount": 500000,
      "max_amount": 40000000,
      "payment_amount": 8340000,
      "expired_month": 12,
      "created_time": "2024-04-01T17:10:29.000Z",
      "finished_time": "2024-04-02T00:00:00.000Z",
      "bank": "Davr",
      "selfie": null,
      "agree": null,
      "step": 8,
      "scoring_start": "2024-03-29T11:07:24.000Z",
      "scoring_end": "2024-03-29T11:07:53.000Z",
      "paid_status": "no_value",
      "term": null,
      "pinfl": "53107005320039",
      "limit_summa": 9000000,
      "cardId": null,
      "fillial": {
          "inn": "306028283",
          "mfo": "01095",
          "nds": "326060092299",
          "name": "TEST OUT FIRMA",
          "address": {
              "city": "",
              "home": "ZAFAR KO`CHASI, 23-UY",
              "region": "Toshkent"
          },
          "admin_id": null,
          "bank_name": "ASIA ALLIANCE BANK",
          "hisob_raqam": "20208000700980700001",
          "work_status": "working",
          "created_time": "2023-12-28 15:59:19.000000",
          "percent_type": "OUT",
          "director_name": "YULDASHEV KAXRAMON KASIMOVICH",
          "director_phone": "",
          "expired_months": [
              {
                  "month": 12,
                  "percent": 39
              },
              {
                  "month": 9,
                  "percent": 34
              },
              {
                  "month": 6,
                  "percent": 30
              },
              {
                  "month": 3,
                  "percent": 25
              }
          ]
      },
      "admin": null
  };
   
    let options = {
      format: 'A4',
    //  phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs", 
    };
  
    let newFilePath = path.join(
        __dirname,
        "../",
        "../",
      "public",
      "graphs",
      `graph-${zayavka.id}.pdf`
    );
    let dt2 = new Date(zayavka.created_time);
          
    dt2.setMonth(dt2.getMonth() + 12)
   
       let dateText2 = dt2.toISOString()
       .substring(0, 10)
       .split("-")
       .reverse()
       .join("-")
       dateText2 = "02"+dateText2.substring(2)
  
    var document = {
      html: fs.readFileSync(
        path.join(
            __dirname,
            "../",
            "../",
            
            "public", "templetes", "pdf-templete.html"),
        "utf8"
      ),
      data: {
        ...zayavka,
        amount: toMoney(zayavka.amount),
        payment_amount: toMoney(zayavka.payment_amount),
        payment_amount_month: toMoney(
          Math.floor(zayavka.payment_amount / zayavka.expired_month)
        ),
        created_time: zayavka.created_time.toISOString()
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-"),
        created_time_hour: zayavka.created_time.toISOString().substring(11, 16),
        passport_seria: zayavka.passport.substring(0, 2),
        passport_number: zayavka.passport.substring(2),
        products: zayavka.products.map((item) => {
          return { ...item, price: toMoney(item.price) };
        }),
        data: Array.from(Array(zayavka.expired_month), (_, x) => {
  
          let dt = new Date(zayavka.created_time);
          
          dt.setMonth(dt.getMonth() + x + 1)
         
             let dateText = dt.toISOString()
             .substring(0, 10)
             .split("-")
             .reverse()
             .join("-")
             dateText = "02"+dateText.substring(2)
             console.log(dateText)
          return {
            count: x + 1,
  
            current_price: toMoney(
              Math.floor(zayavka.payment_amount / zayavka.expired_month) *
                (zayavka.expired_month - x - 1)
            ),
            payment_amount_month: toMoney(
              Math.floor(zayavka.payment_amount / zayavka.expired_month)
            ),
  
            date  : dateText
          };
        }),
        lastDate : dateText2
        
      },
      path: newFilePath,
      type: "",
    };

    console.log(zayavka.created_time.toISOString().substring(11, 16));
    await pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  
    
  }
  


  function toMoney(n) {
    if (n == null || n == 0) {
      return "0";
    }
  
    let result = "";
    let number = n.toString().split(".")[0];
    for (let i = 0; i < number.length; i++) {
      result += number[i];
      if ((number.length - i) % 3 == 1 && i != number.length - 1) {
        result += " ";
      }
    }
    let extraV = "00";
    if (n.toString().split(".").length > 1) {
      if (n.toString().split(".")[1].length > 1) {
        extraV = n.toString().split(".")[1].substring(0, 2);
      } else {
        extraV = n.toString().split(".")[1].substring(0, 1) + "0";
      }
    }
    return result + "," + extraV;
  }