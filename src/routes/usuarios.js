
const express = require("express");
const router = express.Router();

const { getUsuarios, deleteUsuario } = require("../controllers/usuariosController");

const verificarToken = require("../middleware/authMiddleware");

router.get("/", verificarToken, getUsuarios);

router.delete("/:id", verificarToken, deleteUsuario);

module.exports = router;