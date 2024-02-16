import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import indexRoute from "../router/index.route";

export const createHttpServer = () => {
  const port = process.env.PORT;
  const app = express();

  // dont understand this block :((
  // if dont have this => client can't reach because cors policy
  app.use((req, res, next) => {
    const origin = req.get("origin");
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers"
    );

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
    } else {
      next();
    }
  });

  app.use(
    cors({
      origin: [process.env.ALLOW_CORS_WEB_URL],
      credentials: true,
    })
  );

  app.use(bodyParser.json());
  app.use("/", indexRoute);

  return app.listen(port, () => {
    console.log("app running on port: ", port);
  });
};
