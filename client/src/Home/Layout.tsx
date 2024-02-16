import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { INoti } from "../types/noti";
import { getApi } from "../request/request";

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
  const [listNoti, setListNoti] = useState<INoti[]>([]);

  useEffect(() => {
    async function fetchNotis() {
      const fetchNotisResponse = await getApi<INoti[]>("noti");
      if (fetchNotisResponse.success) setListNoti(fetchNotisResponse.data);
      else console.log(fetchNotisResponse.error.message);
    }
    fetchNotis()
  }, []);
  return (
    <Box>
      {listNoti && listNoti.length ? (
        listNoti.map((noti) => <NotiBoxItem />)
      ) : (
        <Typography variant="h2" color="red">No noti</Typography>
      )}
    </Box>
  );
};

const NotiBoxItem = () => {
  return (
    <Box
      sx={{
        backgroundColor: "yellowgreen",
        height: 100,
        width: "100%",
        marginBottom: 2,
        padding: 2,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography>{"Từ Admin"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{"22/04/2024 16:00"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{"Nội dung: Thông báo quan trọng, ......"}</Typography>
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
