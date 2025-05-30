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
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import {
  PersonAdd,
  CreateNewFolder,
  Title,
  Description,
  TaskAlt,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";

const CreateProjectForm = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const payload = { name, description, status };
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3000/project", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "สร้างโปรเจกต์สำเร็จ",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          title: "swal-font",
          popup: "swal-toast",
        },
      });

      if (onSuccess) onSuccess();

      onClose();

      setName("");
      setDescription("");
      setStatus("");
    } catch (error) {
      console.error("Error to create Project :", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#f44336",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "#3f51b5" }}>
        <Typography
          sx={{ display: "flex", alignItems: "center", fontSize: 20 }}
        >
          <PersonAdd sx={{ mr: 1 }} />
          สร้างโปรเจกต์
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form>
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: 300,
              color: "#6e6e6e",
              pb: 1,
            }}
          >
            ชื่อโปรเจกต์
          </Typography>
          <TextField
            autoFocus
            size="small"
            id="name"
            placeholder="ชื่อโปรเจกต์"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
              },
              pb: 1,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Title sx={{ color: "#7986cb", mr: 1 }} />
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
            คำอธิบายโปรเจกต์
          </Typography>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="คำอธิบายโปรเจกต์"
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "black",
              },
              pb: 1,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Description sx={{ color: "#7986cb", mr: 1 }} />
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
            สถานะของโปรเจกต์
          </Typography>
          <FormControl fullWidth size="small" sx={{ pb: 2 }}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              input={
                <OutlinedInput
                  notched={false}
                  startAdornment={
                    <InputAdornment position="start">
                      <TaskAlt sx={{ color: "#7986cb", mr: 1 }} />
                    </InputAdornment>
                  }
                  sx={{ borderRadius: "20px" }}
                />
              }
            >
              <MenuItem value="" disabled>
                สถานะของโปรเจกต์
              </MenuItem>
              <MenuItem value="Started">Started</MenuItem>
              <MenuItem value="OnGoing">OnGoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions sx={{ pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "#9e9e9e" }} type="button">
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={submit}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#3f51b5",
            "&:hover": { backgroundColor: "#303f9f" },
            color: "#fff",
          }}
          endIcon={<CreateNewFolder />}
        >
          สร้างโปรเจกต์
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectForm;
