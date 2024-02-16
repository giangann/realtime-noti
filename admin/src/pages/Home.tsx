import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { AuthContext } from "../App";
import "../App.css";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

export const wsServer = "http://localhost:5000";
export const SocketContextAdmin = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export const Home = () => {
  const [socketAdmin, setSocketAdmin] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const auth = useContext(AuthContext);

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
        <div className="card">
          <button onClick={auth.onLogout}>Log out</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <a href="#">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="#">
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
    </SocketContextAdmin.Provider>
  );
};
