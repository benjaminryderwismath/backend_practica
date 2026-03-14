
const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registrar = async (req, res) => {
    try {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES ($1,$2,$3) RETURNING id,nombre,email",
        [nombre, email, hashedPassword]
    );

    app.post("/tes", (req,res) => {
        res.json({mesaje: "el servidor responde corectamente"});
    });

    res.status(201).json(result.rows[0]);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registrando usuario" });
    }
};

module.exports = { registrar };