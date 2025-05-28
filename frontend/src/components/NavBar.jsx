import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Box,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // สมมติว่ามี logout ใน Context
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    alert("แก้ไขโปรไฟล์");
    handleMenuClose();
  };

  const handleLogout = () => {
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
        if (logout) logout(); // เรียก logout จาก Context ถ้ามี
        else localStorage.removeItem("token");

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/login");
      }
    });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleMenuOpen}
        >
          <Typography variant="body1" sx={{ mr: 0.5 }}>
            {user?.name || "Guest"}
          </Typography>
          <ArrowDropDownIcon />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          autoFocus={false}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleEditProfile} sx={{ fontSize: "0.875rem" }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            แก้ไขโปรไฟล์
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ fontSize: "0.875rem" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            ออกจากระบบ
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
