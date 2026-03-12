
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");


app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});