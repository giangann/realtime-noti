import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { getApi } from "../request/request";
import { IUser } from "../types/user";
import { NotiContext } from "./Home";
export const ListUser = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const sendNoti = useContext(NotiContext).sendNoti;
  const handleChangeUser = (userId: number) => {
    setSelectedUserId(userId);
  };

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
    <Box>
      <Stack direction={"row"}>
        {listUser && listUser.length ? (
          listUser.map((user) => (
            <UserBox
              onChange={handleChangeUser}
              selectedUserId={selectedUserId}
              {...user}
            />
          ))
        ) : (
          <NoUser />
        )}
      </Stack>
      <div className="card">
        <button
          disabled={selectedUserId < 0}
          onClick={() => sendNoti(selectedUserId)}
        >
          {"send HTTP & RealTime Noti"}
        </button>
      </div>
    </Box>
  );
};

type UserBoxProps = {
  selectedUserId: number;
  onChange: (userId: number) => void;
} & IUser;
const UserBox = ({ id, username, selectedUserId, onChange }: UserBoxProps) => {
  return (
    <Box
      component="div"
      onClick={() => onChange(id)}
      sx={{
        padding: 2,
        backgroundColor: selectedUserId === id ? "pink" : "none",
      }}
    >
      <Typography>{id}</Typography>
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
