const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  User.create(email, hashedPassword, (err) => {
    if (err) return res.status(500).send({ message: "Error al registrar" });
    res.send({ message: "Usuario creado" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error en DB:", err);
      return res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
    if (!results || results.length === 0) {
      return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
    }
    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ status: "error", message: "Contraseña inválida" });
    }

    try {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
      res.send({ token });
    } catch (error) {
      console.error("Error generando token JWT:", error);
      res.status(500).send({ status: "error", message: "Error generando token" });
    }
  });
};

