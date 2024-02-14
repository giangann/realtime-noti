import { createHttpServer } from "./http-server";
import { createWebSocket } from "./ws-server";

export const loadApp = () => {
  const httpServer = createHttpServer();
  const wsServer = createWebSocket(httpServer);

  return {
    httpServer,
    wsServer,
  };
};
