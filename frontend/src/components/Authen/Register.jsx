// components/RegisterForm.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  PersonAdd,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const RegisterForm = ({ open, onClose }) => {
  // ใน component
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ฟังก์ชันส่งข้อมูลไป API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Register success:", data);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          title: "swal-font",
          popup: "swal-toast",
        },
      });

      onClose();

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#f44336",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "#3f51b5" }}> สมัครสมาชิก</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              pb: 1,
            }}
          >
            ชื่อ
          </Typography>
          <TextField
            fullWidth
            placeholder="ชื่อผู้ใช้งาน"
            variant="outlined"
            type="text"
            size="small"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#7986cb", mr: 1 }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              py: 1,
            }}
          >
            อีเมล
          </Typography>
          <TextField
            fullWidth
            placeholder="อีเมล"
            variant="outlined"
            type="email"
            size="small"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px black inset",
                WebkitTextFillColor: "black",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#7986cb", mr: 1 }} />
                </InputAdornment>
              ),
            }}
          />

          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              py: 1,
            }}
          >
            รหัสผ่าน
          </Typography>
          <TextField
            fullWidth
            placeholder="รหัสผ่าน"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            size="small"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#7986cb", mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{
                      color: "#9ca3af",
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    }}
                    type="button"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <DialogActions sx={{ mt: 2, mb: 1, px: 0 }}>
            <Button onClick={onClose} sx={{ color: "#9e9e9e" }} type="button">
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
                color: "#fff",
              }}
              endIcon={<PersonAdd />}
              type="submit"
            >
              สมัครสมาชิก
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
