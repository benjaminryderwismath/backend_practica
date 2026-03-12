
const pool = require("../db/db");

const getUsuarios = async (req, res) => {

    const usuarios = await pool.query(
        "SELECT id, nombre FROM usuarios"
    );

    res.json(usuarios.rows);
};

const deleteUsuario = async (req, res) => {

    const { id } = req.params;

    const resultado = await pool.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING *",
        [id]
    );

    if(resultado.rows.length === 0){
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        mensaje: "Usuario eliminado",
        usuario: resultado.rows[0]
    });
};

module.exports = {
    getUsuarios,
    deleteUsuario
};