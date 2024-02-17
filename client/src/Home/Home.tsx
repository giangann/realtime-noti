import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import "../App.css";
import { Header } from "./Header";
import { Layout } from "./Layout";
import { INoti } from "../types/noti";
import { getApi } from "../request/request";
import { AuthContext } from "../App";

const wsServerAddr = "http://localhost:5000";
const wsServer = io(wsServerAddr);
export const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(wsServer);
export const NotiContext = createContext<INoti[]>([]);

export const Home = () => {
  const [listNoti, setListNoti] = useState<INoti[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    wsServer.emit("parseUser", auth.user);
  }, []);
  useEffect(() => {
    async function fetchNotis() {
      const fetchNotisResponse = await getApi<INoti[]>("noti");
      if (fetchNotisResponse.success) setListNoti(fetchNotisResponse.data);
      else console.log(fetchNotisResponse.error.message);
    }
    fetchNotis();
  }, []);

  useEffect(() => {
    async function fetchNotis() {
      const fetchNotisResponse = await getApi<INoti[]>("noti");
      if (fetchNotisResponse.success) setListNoti(fetchNotisResponse.data);
      else console.log(fetchNotisResponse.error.message);
    }
    wsServer.on("newNoti", async (message) => await fetchNotis());
  }, []);

  return (
    <SocketContext.Provider value={wsServer}>
      <NotiContext.Provider value={listNoti}>
        <Header />
        <Layout />
      </NotiContext.Provider>
    </SocketContext.Provider>
  );
};
