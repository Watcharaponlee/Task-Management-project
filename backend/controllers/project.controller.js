const pool = require("../config/db");

exports.createProject = async (req, res) => {
  const { name, description, status } = req.body;
  const owner_id = req.user.userId; // สมมติว่าเอาจาก token

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO projects (name, description, status, owner_id, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [name, description || "", status || "OnGoing", owner_id]
    );

    res.status(201).json({
      message: "ok",
      data: {
        id: result.insertId,
        name,
        description,
        status: status,
        owner_id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, description, owner_id, status FROM projects"
    );
    res.json({ message: "ok", data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, description, owner_id FROM projects WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "ok", data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE projects SET name = ?, description = ? WHERE id = ?",
      [name, description || "", id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ดึงข้อมูลอัปเดตกลับมา
    const [rows] = await pool.execute(
      "SELECT id, name, description, owner_id, created_at FROM projects WHERE id = ?",
      [id]
    );

    res.json({ message: "ok", data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM projects WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
