const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT
});

connection.connect(error => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); 
  }
  console.log("Conectado correctamente a la base de datos MySQL en Railway.");
});

module.exports = connection;
