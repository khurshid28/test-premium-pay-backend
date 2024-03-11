let db = require("./src/config/db");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

let bot = require("./src/bot/bot");

let data = new Promise(function (resolve, reject) {
  db.query(
    `SELECT id,fullname,payment_amount,status,(created_time) as date  from Zayavka WHERE  status in ('canceled_by_scoring','finished','paid') and  ('2024-01-31' < Date(created_time - interval 5 hour) and Date(created_time - interval 5 hour) < '2024-03-01')`,
    function (err, results, fields) {
      if (err) {
        resolve(null);
        return null;
      }
      return resolve(results);
    }
  );
});

toFormattedDate = (d) => d.toISOString().slice(0, 10);
let finishedCount = 0;
let canceledCount = 0;
let finishedAmount = 0;
let canceledAmount = 0;
// data
//   .then(async (results) => {
//     if (results && results.length) {
//       let check = results[0].status == "canceled_by_scoring";
//       check ? canceledCount++ : finishedCount++;
//       let res = [
//         {
//           ...results[0],
//           id:"PPD-"+results[0].id,
//           canceled: check ? 1 : 0,
//           finished: !check ? 1 : 0,
//         },
//       ];

//       for (let i = 1; i < results.length; i++) {
//         if (
//           toFormattedDate(results[i].date) ==
//           toFormattedDate(res[res.length - 1].date)
//         ) {
//           res[res.length - 1].fullname += "\r\n" + results[i].fullname;
//           res[res.length - 1].id += "\r\nPPD-" + results[i].id;
//         } else {
//           res.push({
//             ...results[i],
//             id:"PPD-"+results[i].id,
//           });
//         }

//         check = results[i].status == "canceled_by_scoring";
//         check ? canceledCount++ : finishedCount++;
//         check ? canceledAmount+= results[i].payment_amount: finishedAmount+= results[i].payment_amount ;
//         if(!check) console.log(toFormattedDate(results[i].date)+ ">>>>" +results[i].fullname + " >> "+ toMoney(Math.floor(results[i].payment_amount)));

//         res[res.length - 1] = {
//           ...res[res.length - 1],
          
//           date: res[res.length - 1].date,
//           canceled: (check ? 1 : 0) + (res[res.length - 1].canceled ?? 0),
//           finished: (!check ? 1 : 0) + (res[res.length - 1].finished ?? 0),
//         };
//       }
//       console.log(res);
//       console.log(finishedCount);
//       console.log(canceledCount);
//       console.log(finishedAmount);
//       console.log(canceledAmount);

//       // Sample JSON data
//       const data = [];
//       for (let index = 0; index < res.length; index++) {
//         const element = res[index];
//         data.push({
//           "Дата": toFormattedDate(element.date),
//           "Ф.И.О": element.fullname,
//           "ID": element.id,
//           "Отказ": element.canceled,
//           "Успешно": element.finished,
//           "Все": element.canceled + element.finished,
//         });
//       }

//       // Create a new workbook
//       const workbook1 = XLSX.utils.book_new();
//       const sheetName1 = "Sheet1";

//       // Convert JSON data to worksheet
//       const worksheet1 = XLSX.utils.json_to_sheet(data, {
//         alignment: { wrapText: true },
//         defval: "",
//         blankrows: true,
//       });

//       worksheet1["!cols"] = [
//         { width: 5 },
//         { width: 40 },
//         { width: 10 },
//         { width: 15 },
//         { width: 15 },
//       ];
//       // console.log(workbook1["!cols"]);
//       // Add the worksheet to the workbook
//       XLSX.utils.book_append_sheet(workbook1, worksheet1, sheetName1);

//       // Save the workbook to a file
//       const outputFilePath = "zayavkalar.xlsx";
//       XLSX.writeFile(workbook1, outputFilePath);

//       console.log(
//         `Styled Excel sheet created successfully at ${outputFilePath}`
//       );
//       await bot.sendDocument(2053690211, outputFilePath);
//     }
//   })
//   .catch((err) => console.log(err));


//   function toMoney(number) {
//     if (!number) {
//       return "0";
//     }
//     let result = "";
//     for (let i = 0; i < number.toString().length; i++) {
//       result += number.toString()[i];
//       if ((number.toString().length - i) % 3 == 1) {
//         result += " ";
//       }
//     }
//     return result;
//   }

let data2 = new Promise(function (resolve, reject) {
  db.query(
    `SELECT Zayavka.id,Zayavka.fullname,Zayavka.canceled_reason,Zayavka.payment_amount,Zayavka.status,Zayavka.created_time as date,fillial.name as shopname  from Zayavka,fillial WHERE Zayavka.fillial_id=fillial.id and  Zayavka.status in ('canceled_by_scoring','finished','paid') and  ('2024-02-25' < Date(Zayavka.created_time - interval 5 hour) and Date(Zayavka.created_time - interval 5 hour) < '2024-03-05') ORDER BY id DESC`,
    function (err, results, fields) {
      if (err) {
        resolve(null);
        return null;
      }
      return resolve(results);
    }
  );
});


data2
  .then(async (results) => {


    



    const data = [];
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      data.push({
        "Дата": toFormattedDate(element.date),
        "Ф.И.О": element.fullname,
        "ID": element.id,
        "Магазин": element.shopname,
        "Status": element.status,
        "Сумма": toMoney(Math.floor(element.payment_amount)),
        "check": null,
        "Причина": element.canceled_reason,

      
      });
      console.log(element);
    }
    console.log(data[0]);
    console.log(data[data.length -1]);

    // Create a new workbook
    const workbook1 = XLSX.utils.book_new();
    const sheetName1 = "Sheet1";

    // Convert JSON data to worksheet
    const worksheet1 = XLSX.utils.json_to_sheet(data, {
      alignment: { wrapText: true },
      defval: "",
      blankrows: true,
    });

    worksheet1["!cols"] = [
      { width: 5 },
      { width: 40 },
      { width: 10 },
      { width: 15 },
      { width: 15 },
    ];
    // console.log(workbook1["!cols"]);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook1, worksheet1, sheetName1);

    // Save the workbook to a file
    const outputFilePath = "zayavkalar-for-shops.xlsx";
    XLSX.writeFile(workbook1, outputFilePath);

    console.log(
      `Styled Excel sheet created successfully at ${outputFilePath}`
    );
    await bot.sendDocument(2053690211, outputFilePath);

  })
  .catch((err) => console.log(err));


  function toMoney(number) {
    if (!number) {
      return "0";
    }
    let result = "";
    for (let i = 0; i < number.toString().length; i++) {
      result += number.toString()[i];
      if ((number.toString().length - i) % 3 == 1) {
        result += " ";
      }
    }
    return result;
  }