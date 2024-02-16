import { createContext, useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { getApi, postApi } from "./request/request";
import { IUser } from "./types/user";

export type TAuth = {
  onLogin: (user: IUser) => void;
  onLogout: () => void;
  user: IUser | null;
};

export const AuthContext = createContext<TAuth>({
  onLogin: () => {},
  onLogout: () => {},
  user: null,
});

export function App() {
  const [user, setUser] = useState<IUser | null>(null);

  const onLogin = (user: IUser) => {
    setUser(user);
  };
  const onLogout = async () => {
    setUser(null);
    const logoutResponse = await getApi("auth/logout");
    if (logoutResponse.success) console.log("Logout success");
    else console.log(logoutResponse.error.message);
  };

  useEffect(() => {
    async function fetchMe() {
      const fetchMeResponse = await getApi<IUser>("auth/me");
      if (fetchMeResponse.success) onLogin(fetchMeResponse.data);
      else console.log(fetchMeResponse.error.message);
    }

    fetchMe();
  }, []);
  // if dont have empty array above, it will get infinity loop
  // because have set state inside useEffect

  return (
    <AuthContext.Provider value={{ onLogin, onLogout, user }}>
      <div>{user ? <Home /> : <Login />}</div>
    </AuthContext.Provider>
  );
}
