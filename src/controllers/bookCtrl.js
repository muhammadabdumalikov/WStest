const Books = require("../models/bookModel");

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      const books = await Books.find({});

      res.json({ status: "OK", length: books.length, books });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  createBook: async (req, res) => {
    try {
      const { name, description, tags, author, sections } = req.body;

      const newBook = new Books({
        name,
        description,
        tags,
        author,
        sections,
      });
      await newBook.save();

      res.status(201).json({ message: "Created book" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateBook: async (req, res) => {
    try {
      const book = await Books.findOneAndUpdate(req.params.id, req.body);
      if (!book) return res.error.bookNotFound(res);

      res.json({ message: "Book updated" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const book = await Books.findOneAndDelete(req.params.id);
      if (!book) return res.error.bookNotFound(res);

      res.json({ message: "Book deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = bookCtrl;
