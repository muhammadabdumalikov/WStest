const Express = require("express");
const bookCtrl = require("../controllers/bookCtrl");
const BookRouter = Express.Router();
const auth = require("../middlewares/auth");

BookRouter.get("/user", auth, bookCtrl.getUserBooks);

BookRouter.get("/", auth, bookCtrl.getBooks);
BookRouter.post("/", bookCtrl.createBook);

BookRouter.get("/:bookStatus", bookCtrl.getBooksByTag);

BookRouter.get("/:id", bookCtrl.getBook);
BookRouter.put("/:id", bookCtrl.updateBook);
BookRouter.delete("/:id", bookCtrl.deleteBook);

BookRouter.post("/:id/status", bookCtrl.statusBook);

BookRouter.get("/search", bookCtrl.searchBook);

BookRouter.get("/main", bookCtrl.getMainBooks);

module.exports = {
    path: "/api/book",
    router: BookRouter,
};
