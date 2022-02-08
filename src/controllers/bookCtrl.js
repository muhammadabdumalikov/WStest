const Books = require("../models/bookModel");
const BookStatus = require("../models/bookStatusModel");
const APIfeatures = require("./APIfeatures");

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      const features = new APIfeatures(Books.find().lean(), req.query)
        .filtering()
        .sorting()
        .paginating();

      let books = await features.query;
      books = await Promise.all(
        books.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );

      res.json({ status: "OK", length: books.length, books });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getBookmarkBooks: async (req, res) => {
    try {
      let books = await BookStatus.find({
        bookmark: true,
        userId: req.user.id,
      })
        .lean()
        .select("rate process bookmark bookId");

      books = await Promise.all(
        books.map(async (bookStatus) => {
          const book = await Books.findById(bookStatus.bookId).lean();

          delete bookStatus["bookId"];
          return { ...book, ...bookStatus };
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

      let special = await Books.find({ category: "special" })
        .limit(limit)
        .lean();
      special = await Promise.all(
        special.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );
      let bestseller = await Books.find({ category: "bestseller" })
        .limit(limit)
        .lean();
      bestseller = await Promise.all(
        bestseller.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );
      let discount = await Books.find({ category: "discount" })
        .limit(limit)
        .lean();
      discount = await Promise.all(
        discount.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );
      let newBooks = await Books.find({ category: "new" }).limit(limit).lean();
      newBooks = await Promise.all(
        newBooks.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );
      let editorChoice = await Books.find({ category: "editorChoice" })
        .limit(limit)
        .lean();
      editorChoice = await Promise.all(
        editorChoice.map(async (book) => {
          const bookStatus = await BookStatus.findOne({
            bookId: book._id,
            userId: req.user.id,
          })
            .lean()
            .select("rate process bookmark");

          return { ...book, ...bookStatus };
        })
      );

      res.json({ special, bestseller, discount, newBooks, editorChoice });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getBook: async (req, res) => {
    try {
      let book = await Books.findById(req.params.id).lean();
      if (!book) return res.error.bookNotFound(res);

      const bookStatus = await BookStatus.findOne({
        bookId: book._id,
        userId: req.user.id,
      })
        .lean()
        .select("rate process bookmark");

      res.json({ ...book, ...bookStatus });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  statusBook: async (req, res) => {
    try {
      let { rate, process, bookmark } = req.body;
      const userId = req.user.id;
      const bookId = req.params.id;

      rate = rate && Math.floor(rate);
      process = process && Math.floor(process);

      const bookStatus = await BookStatus.findOne({ bookId, userId });
      if (bookStatus) {
        await BookStatus.findByIdAndUpdate(bookStatus._id, {
          rate,
          process,
          bookmark,
        });
      } else {
        const newBookStatus = new BookStatus({
          bookId,
          userId,
          rate,
          process,
          bookmark,
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
