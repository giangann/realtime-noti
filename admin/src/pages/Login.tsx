import { Box, Button, Container, Stack } from "@mui/material";
import { BaseInput } from "../component/BaseInput";
import { TAuth } from "../types/auth";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { postApi } from "../request/request";
import { AuthContext } from "../App";
import { IUser } from "../types/user";
export const Login = () => {
  const [action, setAction] = useState<"login" | "register">("login");
  const auth = useContext(AuthContext);

  const { register, handleSubmit } = useForm<TAuth>();
  const onSubmit = async (value: TAuth) => {
    let authApi = `auth/${action}`;
    const authResponse = await postApi<IUser>(authApi, value);
    // if success, login with user data
    if (authResponse.success) auth.onLogin(authResponse.data);
    else console.log(authResponse.error.message);
  };
  return (
    <Container>
      <Stack direction={"row"}>
        <Button
          variant={action === "login" ? "contained" : "outlined"}
          onClick={() => setAction("login")}
        >
          ĐĂNG NHẬP
        </Button>
        <Button
          onClick={() => setAction("register")}
          variant={action === "register" ? "contained" : "outlined"}
        >
          ĐĂNG KÝ
        </Button>
      </Stack>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
        sx={{ padding: 2 }}
      >
        <Stack spacing={2}>
          <BaseInput {...register("username")} placeholder="Your username" />
          <BaseInput {...register("password")} placeholder="Your password" />
          <Button variant="contained" type="submit">
            {action.toUpperCase()}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
