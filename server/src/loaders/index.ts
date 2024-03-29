import { connectDatabase } from "./db-connect";
import { createHttpServer } from "./http-server";
import { createWebSocket } from "./ws-server";

export const loadApp = async () => {
  const httpServer = createHttpServer();
  const wsServer = createWebSocket(httpServer);
  global.wsServerGlob = wsServer
  await connectDatabase();
  return {
    httpServer,
    wsServer,
  };
};
