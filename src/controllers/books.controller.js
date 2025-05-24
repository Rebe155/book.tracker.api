const Book = require("../models/book.model");

exports.getBooks = (req, res) => {
  Book.getAllByUser(req.userId, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

exports.getBook = (req, res) => {
  Book.getById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).send({ message: "No encontrado" });
    res.send(results[0]);
  });
};

exports.createBook = (req, res) => {
  const data = { ...req.body, user_id: req.userId };
  Book.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Libro creado" });
  });
};

exports.updateBook = (req, res) => {
  Book.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Libro actualizado" });
  });
};

exports.deleteBook = (req, res) => {
  Book.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Libro eliminado" });
  });
};
