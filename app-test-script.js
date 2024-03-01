let db = require("./src/config/db");
const path = require("path");
const XLSX = require("xlsx");
const fs = require("fs");
let bot = require("./src/bot/bot");

let data = new Promise(function (resolve, reject) {
  db.query(
    `SELECT id,fullname,status,(created_time) as date  from Zayavka WHERE  status in ('canceled_by_scoring','finished','paid') and  ('2024-01-31' < Date(created_time - interval 5 hour) and Date(created_time - interval 5 hour) < '2024-03-01')`,
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
data
  .then(async (results) => {
    if (results && results.length) {
      let check = results[0].status == "canceled_by_scoring";
      check ? canceledCount++ : finishedCount++;
      let res = [
        {
          ...results[0],
          id:"PPD-"+results[0].id,
          canceled: check ? 1 : 0,
          finished: !check ? 1 : 0,
        },
      ];

      for (let i = 1; i < results.length; i++) {
        if (
          toFormattedDate(results[i].date) ==
          toFormattedDate(res[res.length - 1].date)
        ) {
          res[res.length - 1].fullname += "\r\n" + results[i].fullname;
          res[res.length - 1].id += "\r\nPPD-" + results[i].id;
        } else {
          res.push(results[i]);
        }

        check = results[i].status == "canceled_by_scoring";
        check ? canceledCount++ : finishedCount++;

        res[res.length - 1] = {
          ...res[res.length - 1],
          id:"PPD-"+res[res.length - 1].id,
          date: res[res.length - 1].date,
          canceled: (check ? 1 : 0) + (res[res.length - 1].canceled ?? 0),
          finished: (!check ? 1 : 0) + (res[res.length - 1].finished ?? 0),
        };
      }
      console.log(res);
      console.log(finishedCount);
      console.log(canceledCount);

      // Sample JSON data
      const data = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        data.push({
          "Дата": toFormattedDate(element.date),
          "Ф.И.О": element.fullname,
          "ID": element.id,
          "Отказ": element.canceled,
          "Успешно": element.finished,
          "Все": element.canceled + element.finished,
        });
      }

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
      const outputFilePath = "zayavkalar.xlsx";
      XLSX.writeFile(workbook1, outputFilePath);

      console.log(
        `Styled Excel sheet created successfully at ${outputFilePath}`
      );
      await bot.sendDocument(2053690211, outputFilePath);
    }
  })
  .catch((err) => console.log(err));
