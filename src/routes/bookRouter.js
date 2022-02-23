const Express = require("express");
const bookCtrl = require("../controllers/bookCtrl");
const BookRouter = Express.Router();
const auth = require("../middlewares/auth");

BookRouter.get("/book", bookCtrl.getBooks);
BookRouter.post("/book", bookCtrl.createBook);
BookRouter.get("/book/search", bookCtrl.searchBook);

BookRouter.get("/book/main", bookCtrl.getMainBooks);
BookRouter.get("/book/:bookStatus", bookCtrl.getBooksByTag);
BookRouter.post("/book/:id/status", bookCtrl.statusBook);

BookRouter.get("/book/user", auth, bookCtrl.getUserBooks);
BookRouter.get("/book/:id", bookCtrl.getBook);
BookRouter.put("/book/:id", bookCtrl.updateBook);
BookRouter.delete("/book/:id", bookCtrl.deleteBook);

module.exports = {
    path: "/api/book",
    router: BookRouter,
};
