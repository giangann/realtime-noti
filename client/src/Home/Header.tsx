import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useContext, useEffect, useState } from "react";
import { NotiContext, SocketContext } from "../Home/Home";
export const Header = () => {

  const listNoti = useContext(NotiContext);
  
  return (
    <HeaderBox>
      <h3 style={{ color: "white" }}>Thông báo</h3>
      <Badge badgeContent={listNoti.length} color="secondary">
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
