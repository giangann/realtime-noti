import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Header } from "./Header/Header";
export const FormContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(null);
export function App() {
  const wsServer = "http://localhost:5000";
  const [count, setCount] = useState(0);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  useEffect(() => {
    socket.current = io(wsServer);
  }, []);
  return (
    <FormContext.Provider value={socket.current}>
      <Header />
    </FormContext.Provider>
  );
}
