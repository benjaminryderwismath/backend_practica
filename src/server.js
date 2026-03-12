
require("dotenv").config();

const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});