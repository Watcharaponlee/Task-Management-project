const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const pool = require("../config/db");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // ใช้ pool ที่นำเข้า
    await pool.execute(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, hashedPassword, name]
    );
    res.status(201).json({
      message: "ok",
      data: {
        name: name,
        email: email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ message: "ok", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    delete user.password; // ไม่ให้โชว์ password
    res.json({ message: "ok", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);

    const [rows] = await pool.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "ok",
      data: rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    // ดึงข้อมูลผู้ใช้ก่อนลบ
    const [rows] = await pool.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = rows[0]; // ข้อมูลผู้ใช้ที่จะลบ

    // ลบผู้ใช้
    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

    res.json({
      message: "ok",
      data: deletedUser, // ✅ ส่งคืนเป็น array
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
