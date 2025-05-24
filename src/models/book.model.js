const db = require("./db");

const Book = {
  getAllByUser: (userId, callback) => {
    db.query("SELECT * FROM books WHERE user_id = ?", [userId], callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM books WHERE id = ?", [id], callback);
  },
  create: (data, callback) => {
    const { title, author, status, start_date, end_date, comment, user_id } = data;
    db.query(
      "INSERT INTO books (title, author, status, start_date, end_date, comment, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, status, start_date, end_date, comment, user_id],
      callback
    );
  },
  update: (id, data, callback) => {
    const { title, author, status, start_date, end_date, comment } = data;
    db.query(
      "UPDATE books SET title=?, author=?, status=?, start_date=?, end_date=?, comment=? WHERE id=?",
      [title, author, status, start_date, end_date, comment, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM books WHERE id = ?", [id], callback);
  },
};

module.exports = Book;
