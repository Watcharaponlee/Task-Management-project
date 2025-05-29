import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./../components/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "./../components/NavBar";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  const handleToggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Sidebar open={open} onToggle={handleToggleSidebar} />

      {/* Content ครอบเต็มจอ */}
      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "100vh",
          pl: `${open ? 200 : 72}px`, // เผื่อ sidebar ไม่บัง content
          transition: "padding-left 0.3s ease",
          pt: "64px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
