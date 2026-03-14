const pool = require("../db/db");
const bcrypt = require("bcrypt");

const registrar = async (req, res) => {
    try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO usuarios (nombre,email,password) VALUES ($1,$2,$3) RETURNING id,nombre,email",
        [nombre, email, hashedPassword]
    );

    return res.status(201).json(result.rows[0]);
    } catch (error) {
    console.error("ERROR REGISTER:", error);
    return res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { registrar };