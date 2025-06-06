const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  
  User.create(email, hashedPassword, (err) => {
    if (err) {
      console.error("Error al registrar:", err);
      return res.status(500).send({ message: "Error al registrar", error: err });
    }
    res.send({ message: "Usuario creado exitosamente" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).send({ message: "Error al buscar usuario" });
    }

    if (!results || results.length === 0) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.send({
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user.id, email: user.email }
    });
  });
};
