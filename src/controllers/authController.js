
const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registrar = async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
    "INSERT INTO usuarios (nombre,email,password) VALUES ($1,$2,$3) RETURNING id,nombre,email",
    [nombre, email, hashedPassword]
    );

    res.json(result.rows[0]);
};

module.exports = { registrar };