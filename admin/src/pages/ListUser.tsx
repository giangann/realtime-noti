import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import { getApi } from "../request/request";
import { IUser } from "../types/user";
export const ListUser = () => {
    const [listUser, setListUser] = useState<IUser[]>([]);
  
    useEffect(() => {
      async function fetchListUser() {
        const fetchListUserResponse = await getApi<IUser[]>("user");
        if (fetchListUserResponse.success)
          setListUser(fetchListUserResponse.data);
        else console.log(fetchListUserResponse.error.message);
      }
      fetchListUser();
    }, []);
  
    return (
      <Stack direction={"row"}>
        {listUser && listUser.length ? (
          listUser.map((user) => <UserBox {...user} />)
        ) : (
          <NoUser />
        )}
      </Stack>
    );
  };
  
  const UserBox = ({ username }: IUser) => {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography>{username}</Typography>
      </Box>
    );
  };
  
  const NoUser = () => {
    return (
      <Typography variant="h4" color="red">
        No User found
      </Typography>
    );
  };
  