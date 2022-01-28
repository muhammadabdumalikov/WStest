const Books = require("../models/bookModel");
const BookStatus = require("../models/bookStatusModel");
const APIfeatures = require("./APIfeatures");

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      const features = new APIfeatures(Books.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      let books = await features.query;
      books = await Promise.all(
        books.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );

      res.json({ status: "OK", length: books.length, books });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getMainBooks: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);

      let special = await Books.find({ category: "special" }).limit(limit);
      special = await Promise.all(
        special.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );
      let bestseller = await Books.find({ category: "bestseller" }).limit(
        limit
      );
      bestseller = await Promise.all(
        bestseller.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );
      let discount = await Books.find({ category: "discount" }).limit(limit);
      discount = await Promise.all(
        discount.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );
      let newBooks = await Books.find({ category: "new" }).limit(limit);
      newBooks = await Promise.all(
        newBooks.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );
      let editorChoice = await Books.find({ category: "editorChoice" }).limit(
        limit
      );
      editorChoice = await Promise.all(
        editorChoice.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          });
          if (bookStatus) {
            book.rate = bookStatus.rate;
            book.process = bookStatus.process;
          }

          return book;
        })
      );

      res.json({ special, bestseller, discount, newBooks, editorChoice });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getBook: async (req, res) => {
    try {
      let book = await Books.findById(req.params.id);
      if (!book) return res.error.bookNotFound(res);

      const bookStatus = await BookStatus.findOne({
        bookId: book._id,
        userId: req.user.id,
      });
      if (bookStatus) {
        book.rate = bookStatus.rate;
        book.process = bookStatus.process;
      }

      res.json(book);
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  statusBook: async (req, res) => {
    try {
      let { bookId, rate, process } = req.body;
      const userId = req.user.id;

      rate = rate && Math.floor(rate);
      process = process && Math.floor(process);

      const bookStatus = await BookStatus.findOne({ bookId, userId });
      if (bookStatus) {
        await BookStatus.findByIdAndUpdate(bookStatus._id, { rate, process });
      } else {
        const newBookStatus = new BookStatus({
          bookId,
          userId,
          rate,
          process,
        });
        await newBookStatus.save();
      }

      res.json({ message: "Changed book status" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  createBook: async (req, res) => {
    try {
      const {
        title,
        description,
        tags,
        author,
        sections,
        image,
        category,
        price,
        discountPrice,
      } = req.body;

      const newBook = new Books({
        title,
        description,
        tags,
        author,
        sections,
        category,
        image,
        price,
        discountPrice,
      });
      await newBook.save();

      res.status(201).json({ message: "Created book" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateBook: async (req, res) => {
    try {
      const {
        title,
        description,
        tags,
        author,
        sections,
        bookmark,
        category,
        image,
        price,
        discountPrice,
      } = req.body;

      const book = await Books.findByIdAndUpdate(req.params.id, {
        title,
        description,
        tags,
        author,
        sections,
        bookmark,
        category,
        image,
        price,
        discountPrice,
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
