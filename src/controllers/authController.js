const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const usuario = result.rows[0];
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.json({ token });
    } catch (error) {
        console.error("ERROR LOGIN:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};

module.exports = { registrar, login };