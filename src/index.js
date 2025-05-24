require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.get("/", (req, res) => res.send("Bienvenido a la API de libros"));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
