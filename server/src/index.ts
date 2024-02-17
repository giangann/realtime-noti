import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { loadApp } from "./loaders";
import * as dotenv from "dotenv";
dotenv.config();
export let wsServerGlob: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;
var httpServerGlob;
async function load() {
  const { httpServer, wsServer } = await loadApp();
  wsServerGlob = wsServer;
  httpServerGlob = httpServer;
}

load();
