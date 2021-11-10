import * as API from "openapi-merge";
import swaggerAssets from "../data/swaggerassets.json";
import swaggerNotifications from "../data/swaggerNotifications.json";
import swaggerTags from "../data/swaggertags.json";
import express from "express";
import SwaggerUI from "swagger-ui-express";

const app = express();

const merged = API.merge([
  {
    oas: {
      openapi: "3.0.3",
      components: swaggerAssets.components as any,
      info: { title: "Integrate.Assets", version: "1" },

      paths: swaggerAssets.paths as any,
    },
  },
  {
    oas: {
      openapi: "3.0.3",
      components: swaggerNotifications.components as any,
      info: { title: "Integrate.Notifications", version: "1" },

      paths: swaggerNotifications.paths as any,
    },
  },
//   {
//     oas: {
//       openapi: "3.0.3",
//       components: swaggerTags.components as any,
//       info: { title: "Integrate.Tags", version: "1" },

//       paths: swaggerTags.paths as any,
//     },
//   },
]);

app.use("/", SwaggerUI.serve, SwaggerUI.setup(merged.output));
app.listen(8000)

console.log(merged);
