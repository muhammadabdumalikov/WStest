const Express = require("express");
const bookCtrl = require("../controllers/bookCtrl")
const UserRouter = Express.Router();
const auth = require("../middlewares/auth")

UserRouter.route("/book").get(bookCtrl.getBooks).post(bookCtrl.createBook);
UserRouter.get("/book/search", bookCtrl.searchBook);

UserRouter.get("/book/main", bookCtrl.getMainBooks);
UserRouter.get("/book/:bookStatus", bookCtrl.getBooksByTag);
UserRouter.post("/book/:id/status", bookCtrl.statusBook);

UserRouter.get("/book/user", auth, bookCtrl.getUserBooks);
UserRouter.route("/book/:id")
    .get(bookCtrl.getBook)
    .put(bookCtrl.updateBook)
    .delete(bookCtrl.deleteBook);

module.exports = {
    path: "/api/users",
    router: UserRouter,
};
