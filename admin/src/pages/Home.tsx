import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { AuthContext } from "../App";
import "../App.css";
import { ListUser } from "./ListUser";
import { MyInfo } from "./MyInfo";

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

  const sendNotiHttp = async () => {};

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
        </div>

        <MyInfo />
      </div>

      <ListUser/>
      <div className="card">
        <button onClick={handleClick}>send noti</button>
      </div>
      <div className="card">
        <button onClick={sendNotiHttp}>send HTTP noti</button>
      </div>
    </SocketContextAdmin.Provider>
  );
};



