// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Authen/Register";
import useUserStore from "../store/userStore";

export default function LoginPage() {
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [openRegister, setOpenRegister] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);

      const profilesRes = await axios.get(
        "http://localhost:3000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        }
      );
      setUser(profilesRes.data.data);
      navigate("/project");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  // ใน component
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxwidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 400,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: "#4f46e5", p: 2 }}>
          <Typography variant="h4" component="h1" sx={{ color: "white" }}>
            SIGN-IN
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, py: 2 }}>
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              pb: 1,
            }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", // เปลี่ยนจาก 4px เป็น 12px
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset", // เปลี่ยนพื้นหลังเป็นสีขาว
                WebkitTextFillColor: "black", // สีข้อความ
              },
              "& input:-webkit-autofill:hover": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
              },
              "& input:-webkit-autofill:focus": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#7986cb", mr: 1 }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              pb: 1,
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            variant="outlined"
            placeholder="Password"
            size="small"
            required
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
                      "&:focus": {
                        outline: "none", // เอา outline ออก
                      },
                      "&:focus-visible": {
                        outline: "none", // เอา focus-visible ออกด้วย
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              pb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", // เปลี่ยนจาก 4px เป็น 12px
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset", // เปลี่ยนพื้นหลังเป็นสีขาว
                WebkitTextFillColor: "black", // สีข้อความ
              },
              "& input:-webkit-autofill:hover": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
              },
              "& input:-webkit-autofill:focus": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
              },
            }}
          ></TextField>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="indigo"
            fullWidth
            endIcon={<Login />}
            sx={{
              mt: 2,
              borderRadius: "20px",
              backgroundColor: "#3f51b5", // indigo color
              "&:hover": {
                backgroundColor: "#303f9f", // darker indigo
              },
              color: "#fff", // white text
            }}
          >
            Login
          </Button>
          <Typography
            sx={{
              mt: 1,
              fontSize: "0.85rem",
              color: "#9e9e9e",
              textAlign: "end",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => setOpenRegister(true)}
          >
            สมัครสมาชิก?
          </Typography>
        </Box>
      </Paper>
      {/* Register Dialog */}
      <RegisterForm
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </Container>
  );
}
