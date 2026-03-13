const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES ($1,$2,$3) RETURNING id,nombre,email",
    [nombre, email, hashedPassword]
    );

    res.json(result.rows[0]);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
    );

    const user = result.rows[0];

    if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, user.password);

    if (!valido) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.json({ token });
};

module.exports = {
    registrar,
    login
};