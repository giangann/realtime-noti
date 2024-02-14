import * as http from "http";
import { Server } from "socket.io";
export const createWebSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("new client connect");

    socket.on("send-noti", (message) => {
      io.sockets.sockets.forEach((client) => {
        client.emit("new-noti", message);
      });
    });
  });
  return io;
};
