import { useState } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function App() {
  const [isLogin, setIsLogin] = useState(false);

  const onLogin = () => {
    setIsLogin(true);
  };

  return isLogin ? <Home/>:<Login/>
}
