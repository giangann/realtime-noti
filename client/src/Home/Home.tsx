import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext } from "react";
import io, { Socket } from "socket.io-client";
import "../App.css";
import { Header } from "./Header";
import { Layout } from "./Layout";
export const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export const Home = () => {
  const wsServer = "http://localhost:5000";

  return (
    <SocketContext.Provider value={io(wsServer)}>
      <Header />
      <Layout />
    </SocketContext.Provider>
  );
};
