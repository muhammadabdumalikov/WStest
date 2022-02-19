const createCategory = require("./createCategory")
const getCategory = require("./getCategories")

module.exports = {
  "/book": {
    ...getCategory,
    ...createCategory,
  },
//   "/book/main": {
//     ...getMainBooks,
//   },
//   "/book/:id/status": {
//     ...bookStatus,
//   },
//   "/book/bookmarks": {
//     ...getBookmarkBooks,
//   },
//   "/book/:id": {
//     ...getBook,
//     ...updateBook,
//     ...deleteBook,
//   },
};
