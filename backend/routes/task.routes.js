// routes/task.routes.js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const taskController = require("../controllers/task.controller");

router.post("/", authenticate, taskController.createTask);
// ดึง Task ทั้งหมด
router.get("/", authenticate, taskController.getAllTasks);

// ดึง Task ทีละตัวตาม id
router.get("/:id", authenticate, taskController.getTaskById);

// อัปเดต Task ตาม id
router.put("/:id", authenticate, taskController.updateTask);

// ลบ Task ตาม id
router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;
