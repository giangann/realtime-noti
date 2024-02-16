import { useContext } from "react";
import { AuthContext } from "../App";
import { Container, Typography } from "@mui/material";

export const MyInfo = () => {
  const auth = useContext(AuthContext);

  return (
    <Container>
      <Typography variant="h3" color="blue">
        {auth.user?.username}
      </Typography>
    </Container>
  );
};
