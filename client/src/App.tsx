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
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)

  useEffect(() => {
    let socket = io(wsServer);
    setSocket(socket)
    console.log(socket)
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <Header />
    </SocketContext.Provider>
  );
}
