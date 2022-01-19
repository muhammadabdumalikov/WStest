const getBooks = require("./getBooks");
const getMainBooks = require("./getMainBooks");
const getBook = require("./getBook");
const createBook = require("./createBook");
const updateBook = require("./updateBook");
const deleteBook = require("./deleteBook");

module.exports = {
  "/book": {
    ...getBooks,
    ...createBook,
  },
  "/book/main": {
    ...getMainBooks,
  },
  "/book/:id": {
    ...getBook,
    ...updateBook,
    ...deleteBook,
  },
};
