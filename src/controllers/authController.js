
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let usuarios = [];

const registrar = async (req, res) => {
    const { nombre, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = {
        id: usuarios.length + 1,
        nombre,
        password: passwordHash
    };

    usuarios.push(usuario);

    res.json({ mensaje: "Usuario creado" });
};

const login = async (req, res) => {
    const { nombre, password } = req.body;

    const usuario = usuarios.find(u => u.nombre === nombre);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, usuario.password);

    if (!valido) {
        return res.status(401).json({ error: "Password incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.json({ token });
};

module.exports = {
    registrar,
    login
};