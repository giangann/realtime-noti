import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../App";
import { INoti } from "../types/noti";
import { NotiContext } from "./Home";

// Layout for fetch noti, allow scroll, use fetch pagination if can
export const Layout = () => {
  return (
    <Box sx={{ height: 1000, backgroundColor: "wheat" }}>
      <Container>
        <HelloBox />
        <NotiBox />
      </Container>
    </Box>
  );
};

const NotiBox = () => {
  const listNoti = useContext(NotiContext);

  return (
    <Box>
      {listNoti && listNoti.length ? (
        listNoti.map((noti) => <NotiBoxItem {...noti} />)
      ) : (
        <Typography variant="h2" color="red">
          No noti
        </Typography>
      )}
    </Box>
  );
};

const NotiBoxItem = ({ content, createdAt, from_user, isRead }: INoti) => {
  return (
    <Box
      sx={{
        backgroundColor: isRead ? "yellowgreen" : "#cccccc",
        height: 100,
        width: "100%",
        marginBottom: 2,
        padding: 2,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Từ ${from_user.username}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{createdAt as string}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Nội dung: ${content}, ......`}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const HelloBox = () => {
  const auth = useContext(AuthContext);
  return (
    <Box>
      <Typography sx={{ display: "inline-block" }}>Xin chao</Typography>
      <Typography variant="h2"> {auth.user?.username}</Typography>
    </Box>
  );
};
