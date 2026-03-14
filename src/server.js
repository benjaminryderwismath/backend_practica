
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

app.get("/", (req, res) => {
    res.json({
        message: "Servidor nuevo funcionando",
        endpoints: {
            health: "/health"
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});