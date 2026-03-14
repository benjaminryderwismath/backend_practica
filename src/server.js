
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend API funcionando",
        endpoints: {
            health: "/health"
        }
    });
});

app.get("/health", (req, res) => {
    res.json({
    status: "ok",
    message: "API funcionando",
    timestamp: new Date()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});