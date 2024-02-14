import * as bodyParser from "body-parser";
import core from "express-serve-static-core";
import cors from "cors";
import express from "express";
import { indexRoute } from "../router/index.route";

export const createHttpServer = () => {
  const port = process.env.PORT;
  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use("/", (req: core.Request, res: core.Response) => {
    res.json("default route: express and ts and websocket server");
  });

  app.use("/", indexRoute);

  app.use(bodyParser.json());

  return app.listen(port, () => {
    console.log("app running on port: ", port);
  });
};
