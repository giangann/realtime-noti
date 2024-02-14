import express from "express";
import * as core from "express-serve-static-core";
import socket, { Server } from "socket.io";
import cors from "cors";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socket";
import { createServer } from "node:http";

const app: core.Express = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/", (req: core.Request, res: core.Response) => {
  res.json("This is express ts app");
});
const port = 5000;

const wsServer = app.listen(port, () => {
  console.log("app running in port ", port);
});

// const io = new Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >(port, { wsEngine: wsServer, cors: { origin: "*" } });

const io = new Server(wsServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("new client join");
});
