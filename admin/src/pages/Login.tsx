import { Box, Button, Container, Stack } from "@mui/material";
import { BaseInput } from "../component/BaseInput";
import { TLogin } from "../types/auth";
import { useForm } from "react-hook-form";
export const Login = () => {
  const { register, handleSubmit } = useForm<TLogin>();
  const onSubmit = async (value: TLogin) => {
    console.log(value);
    
  };
  return (
    <Container>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
        sx={{ padding: 2 }}
      >
        <Stack spacing={2}>
          <BaseInput {...register("username")} placeholder="Your username" />
          <BaseInput {...register("password")} placeholder="Your password" />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
