import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Home/Home";
export const Header = () => {
  const [noti, setNoti] = useState(0);

  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log('socket client',socket)
    socket?.on("new-noti", (message) => {
      console.log("take message from server",message);
      setNoti(noti + 1);
    });
  }, [socket,noti]);
  return (
    <HeaderBox>
      <Button variant="contained" onClick={() => setNoti(noti + 1)}>
        Noti
      </Button>
      <h3 style={{ color: "white" }}>Thông báo</h3>
      <Badge badgeContent={noti} color="secondary">
        <MailIcon color="action" />
      </Badge>
    </HeaderBox>
  );
};

const HeaderBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundColor: "blue",
        height: 70,
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
};
