import { createContext, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export const wsServer = "http://localhost:5000";
export const SocketContextAdmin = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export function App() {
  const [socketAdmin, setSocketAdmin] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  const handleClick = () => {
    if (socketAdmin) {
      socketAdmin.emit("send-noti", "send this noti to all user");
    }
  };

  useEffect(() => {
    if (!socketAdmin) {
      let newSocketAdmin = io(wsServer);
      setSocketAdmin(newSocketAdmin);
    }
  }, []);

  useEffect(() => {
    if (socketAdmin) {
      socketAdmin.on("new-noti", (message) => {
        console.log("recive my noti", message);
      });
    }
  }, [socketAdmin]);

  return (
    <SocketContextAdmin.Provider value={socketAdmin}>
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
