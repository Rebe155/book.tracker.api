const express = require("express");
const auth = require("../controllers/auth.controller");
const books = require("../controllers/books.controller");
const verifyToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Auth
router.post("/register", auth.register);
router.post("/login", auth.login);

// Libros protegidos
router.get("/books", verifyToken, books.getBooks);
router.get("/books/:id", verifyToken, books.getBook);
router.post("/books", verifyToken, books.createBook);
router.put("/books/:id", verifyToken, books.updateBook);
router.delete("/books/:id", verifyToken, books.deleteBook);

module.exports = router;
