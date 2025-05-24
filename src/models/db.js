const mysql = require("mysql2");
const dbConfig = require("../../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectado a la base de datos MySQL.");
});

module.exports = connection;
