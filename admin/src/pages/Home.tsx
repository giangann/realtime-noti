import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { AuthContext } from "../App";
import "../App.css";
import { ListUser } from "./ListUser";
import { MyInfo } from "./MyInfo";
import { postApi } from "../request/request";
import { INoti } from "../types/noti";

export const wsServer = "http://localhost:5000";
export const SocketContextAdmin = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export const NotiContext = createContext<{
  sendNoti: (toUser: number) => void;
}>({ sendNoti: () => {} });
export const Home = () => {
  const [socketAdmin, setSocketAdmin] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const auth = useContext(AuthContext);

  const sendNotiHttp = async (toUser: number) => {
    const notiData = {
      from_user_id: auth.user?.id,
      to_user_id: toUser,
      content: "Test content noti",
    };
    const sendNotiResponse = await postApi<INoti>("noti", notiData);

    if (sendNotiResponse.success) console.log("send noti success");
    else console.log(sendNotiResponse.error.message);
  };

  const sendNotiWS = (toUser: number) => {
    if (socketAdmin) {
      socketAdmin?.emit("send-noti", {
        from_user_id: auth.user?.id,
        to_user_id: toUser,
        content: "Test content noti",
      });
    }
  };

  const sendNoti = async (toUser: number) => {
    sendNotiWS(toUser);
    await sendNotiHttp(toUser);
  };

  useEffect(() => {
    if (!socketAdmin) {
      let newSocketAdmin = io(wsServer).emit("parse-user", {
        user: auth.user,
      });
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
      <NotiContext.Provider value={{ sendNoti: sendNoti }}>
        <div>
          <div className="card">
            <button onClick={auth.onLogout}>Log out</button>
          </div>

          <MyInfo />
        </div>

        <ListUser />
      </NotiContext.Provider>
    </SocketContextAdmin.Provider>
  );
};
