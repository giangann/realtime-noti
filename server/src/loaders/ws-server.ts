import * as http from "http";
import { Server } from "socket.io";
export const createWebSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: { origin: "*", credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("new client connect");

    socket.on("parse-user", (message) => {
      console.log(message);
      socket.data.user = message.user;
    });
  });

  return io;
};
