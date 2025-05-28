import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon, Home, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = ({ open, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ยืนยันก่อนออกจากระบบ
    Swal.fire({
      title: "ต้องการออกจากระบบใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#ef5350",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      customClass: {
        confirmButton: "my-swal-button",
        cancelButton: "my-swal-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบ token
        localStorage.removeItem("token");

        // แสดง toast หรือ alert แจ้งออกจากระบบสำเร็จ
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        });

        // เปลี่ยนเส้นทางไปหน้า login หรือ home
        navigate("/login");
      }
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 72,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        position: "fixed", // ✅ สำคัญ! ให้ลอยซ้าย
        zIndex: 1300,
        "& .MuiDrawer-paper": {
          width: open ? 200 : 72,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#1a237e",
          color: "#FFFFFF",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // โลโก้ตรงกลางเสมอ
          height: 80,
          p: 2,
          cursor: "pointer", // ให้ดูว่าเป็น clickable
        }}
        onClick={onToggle} // ✅ คลิกทั้ง Box หรือจะใส่ใน img ก็ได้
      >
        <img
          src="/Logo.png"
          alt="TM Project"
          style={{
            height: open ? "70px" : "40px", // ✅ เปลี่ยนขนาดตาม open
            transition: "height 0.3s ease", // ✅ ทำให้เปลี่ยนขนาดแบบ smooth
          }}
        />
      </Box>

      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Tooltip title={!open ? "หน้าหลัก" : ""} placement="right">
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "#9fa8da",
                  }}
                >
                  <Home />
                </ListItemIcon>
                {open && <ListItemText primary="หน้าหลัก" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>

      {/* Logout at bottom */}
      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Tooltip title={!open ? "ออกจากระบบ" : ""} placement="right">
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "#9fa8da",
                  }}
                >
                  <Logout />
                </ListItemIcon>
                {open && <ListItemText primary="ออกจากระบบ" />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
