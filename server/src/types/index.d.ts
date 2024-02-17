/* eslint-disable no-var */

import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

declare global {
  var wsServerGlob: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  >;
}
export {};
