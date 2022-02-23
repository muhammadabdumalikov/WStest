const router = require("express").Router();
const bookCtrl = require("../controllers/bookCtrl");

router.route("/book").get(bookCtrl.getBooks).post(bookCtrl.createBook);

// router.route("/books").get(bookCtrl.getTestBooks);

router.get("/book/search", bookCtrl.searchBook);

router.get("/book/main", bookCtrl.getMainBooks);

router.get("/book/:bookStatus", bookCtrl.getBooksByTag);

router.post("/book/:id/status", bookCtrl.statusBook);

router
    .route("/book/:id")
    .get(bookCtrl.getBook)
    .put(bookCtrl.updateBook)
    .delete(bookCtrl.deleteBook);

module.exports = router;
