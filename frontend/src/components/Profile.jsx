// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, Person, PersonAdd, Save } from "@mui/icons-material";
import useUserStore from "../store/userStore";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProfileDialog({ open, onClose }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // เมื่อ Dialog เปิด หรือ user ใน store เปลี่ยน ให้ตั้งค่า form
  useEffect(() => {
    if (open && user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [open, user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/api/auth/profile/${user.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.data);

      Swal.fire({
        icon: "success",
        title: "อัปเดตข้อมูลสำเร็จ",
        toast: true,
        timer: 2000,
        position: "top-end",
        showConfirmButton: false,
      });

      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err?.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "#3f51b5" }}>แก้ไขข้อมูลส่วนตัว</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
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
          placeholder="ชื่อ"
          size="small"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
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
                <Person sx={{ color: "#7986cb", mr: 1 }} />
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
          อีเมล
        </Typography>
        <TextField
          placeholder="อีเมล"
          size="small"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
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
                <Email sx={{ color: "#7986cb", mr: 1 }} />
              </InputAdornment>
            ),
          }}
        />

        <DialogActions sx={{ mt: 2, mb: 1, px: 0 }}>
          <Button onClick={onClose} sx={{ color: "#9e9e9e" }} type="button">
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
              color: "#fff",
            }}
            endIcon={<Save />}
            type="submit"
          >
            บันทึก
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
