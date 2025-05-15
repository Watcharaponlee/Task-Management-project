const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// ตั้งค่า CORS อนุญาตเฉพาะ frontend ที่รันบน localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // เปลี่ยนถ้าหน้าบ้านเปลี่ยน URL หรือพอร์ต
    credentials: true, // ถ้าต้องใช้ cookie หรือการยืนยันตัวตนแบบ sessions
  })
);

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const projectRoutes = require("./routes/project.routes");

app.use("/api/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);

module.exports = app;
