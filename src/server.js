require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json()); // SIEMPRE antes de las rutas

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
    message: "Backend API funcionando"
    });
});

app.get("/health", (req, res) => {
    res.json({
    status: "ok"
    });
});

app.post("/test", (req, res) => {
    res.json({ mensaje: "Servidor funcionando correctamente" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});