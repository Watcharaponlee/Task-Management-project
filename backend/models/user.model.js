const pool = require("../config/db");

exports.findByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

exports.createUser = async (email, hashedPassword, firstname, lastname) => {
  await pool.execute(
    "INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)",
    [email, hashedPassword, firstname, lastname]
  );
};
