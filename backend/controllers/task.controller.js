// controllers/task.controller.js
const pool = require("../config/db");

exports.createTask = async (req, res) => {
  const {
    title,
    description,
    due_date,
    project_id,
    status,
    priority,
    assigned_to = null,
  } = req.body;

  const created_by = req.user.userId; // ดึงจาก token

  if (!title || !description || !due_date || !project_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ตรวจสอบ project_id
    const [project] = await pool.execute(
      "SELECT id FROM projects WHERE id = ?",
      [project_id]
    );
    if (project.length === 0) {
      return res.status(400).json({ message: "Invalid project_id" });
    }

    // ตรวจสอบ assigned_to ถ้ามี
    if (assigned_to) {
      const [user] = await pool.execute("SELECT id FROM users WHERE id = ?", [
        assigned_to,
      ]);
      if (user.length === 0) {
        return res.status(400).json({ message: "Invalid assigned_to user ID" });
      }
    }

    const [result] = await pool.execute(
      `INSERT INTO tasks 
      (title, description, status, priority, due_date, project_id, created_by, assigned_to, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title,
        description,
        status,
        priority,
        due_date,
        project_id,
        created_by,
        assigned_to,
      ]
    );

    res.status(201).json({
      message: "ok",
      data: {
        id: result.insertId,
        title,
        description,
        status,
        priority,
        due_date,
        project_id,
        created_by,
        assigned_to,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM tasks");
    res.json({ message: "ok", data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "ok", data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    priority,
    due_date,
    project_id,
    assigned_to,
  } = req.body;

  if (!title || !description || !due_date || !project_id || !assigned_to) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await pool.execute(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, project_id = ?, assigned_to = ?, updated_at = NOW() WHERE id = ?`,
      [
        title,
        description,
        status,
        priority,
        due_date,
        project_id,
        assigned_to,
        id,
      ]
    );

    // ดึงข้อมูล task ที่อัปเดตแล้วส่งกลับ
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [id]);

    res.json({ message: "ok", data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
