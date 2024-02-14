import { createContext, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export const wsServer = "http://localhost:5000";
export const SocketContextAdmin = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export function App() {
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  const handleClick = () => {
    if (socket.current) {
      console.log("socket current", socket.current);
      socket.current.emit("send-noti", "send this noti to all user");
    }
  };

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(wsServer);
    }
  }, []);

  useEffect(() => {
    // if (socket.current) {
    //   socket.current.on("new-noti", (message) => {
    //     console.log("recive my noti", message);
    //   });
    // }
    socket.current.on("new-noti", (message) => {
      console.log("recive my noti", message);
    });
  }, [socket.current]);

  return (
    <SocketContextAdmin.Provider value={socket.current}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>send noti</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </SocketContextAdmin.Provider>
  );
}
