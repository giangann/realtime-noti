import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Header } from "./Header/Header";
export const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export function App() {
  const wsServer = "http://localhost:5000";
  return (
    <SocketContext.Provider value={io(wsServer)}>
      <Header />
    </SocketContext.Provider>
  );
}
