import express from "express";
import SwaggerUI from "swagger-ui-express";
const swaggerCombine = require("swagger-combine")
const fs = require("fs")

const app = express();

(async () => {
  try {
    app.get("/assets", (req, res) => {
      fs.readFile("./data/swaggerassets.json", (err: any, json: any) => {
        let obj = JSON.parse(json)
        res.json(obj)
      })
    })
    app.get("/notifications", (req, res) => {
      fs.readFile("./data/swaggernotifications.json", (err: any, json: any) => {
        let obj = JSON.parse(json)
        res.json(obj)
      })
    })
    app.get("/tags", (req, res) => {
      fs.readFile("./data/swaggertags.json", (err: any, json: any) => {
        let obj = JSON.parse(json)
        res.json(obj)
      })
    })
    app.get("/swagger", await swaggerCombine.middleware("C:/Users/MichaelRichardson/code/POC3/swagger.json"));
  } catch (e) {
    console.log(e);
  }
  var options = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: 'http://localhost:8000/assets',
          name: 'Assets'
        },
        {
          url: 'http://localhost:8000/tags',
          name: 'Tags'
        },
        {
          url: 'http://localhost:8000/notifications',
          name: 'Notifications'
        },
        {
          url: 'http://localhost:8000/swagger',
          name: 'All'
        }
      ]
    }
  }
  app.use("/", SwaggerUI.serve, SwaggerUI.setup(null as any, options));
  app.listen(8000);
})();


