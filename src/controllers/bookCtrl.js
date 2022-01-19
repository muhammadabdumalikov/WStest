const Books = require("../models/bookModel");
const APIfeatures = require("./APIfeatures");

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      const features = new APIfeatures(Books.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const books = await features.query;

      res.json({ status: "OK", length: books.length, books });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getMainBooks: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const special = await Books.find({ category: "special" }).limit(limit);
      const bestseller = await Books.find({ category: "bestseller" }).limit(
        limit
      );
      const discount = await Books.find({ category: "discount" }).limit(limit);
      const newBooks = await Books.find({ category: "new" }).limit(limit);
      const editorChoice = await Books.find({ category: "editorChoice" }).limit(
        limit
      );

      res.json({ special, bestseller, discount, newBooks, editorChoice });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getBook: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id);
      if (!book) return res.error.bookNotFound(res);

      res.json(book);
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  createBook: async (req, res) => {
    try {
      const { title, description, tags, author, sections, bookmark, category } =
        req.body;

      const newBook = new Books({
        title,
        description,
        tags,
        author,
        sections,
        category,
      });
      await newBook.save();

      res.status(201).json({ message: "Created book" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateBook: async (req, res) => {
    try {
      const { title, description, tags, author, sections, bookmark, category } =
        req.body;

      const book = await Books.findByIdAndUpdate(req.params.id, {
        title,
        description,
        tags,
        author,
        sections,
        bookmark,
        category,
      });
      if (!book) return res.error.bookNotFound(res);

      res.json({ message: "Book updated" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const book = await Books.findByIdAndDelete(req.params.id);
      if (!book) return res.error.bookNotFound(res);

      res.json({ message: "Book deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = bookCtrl;
