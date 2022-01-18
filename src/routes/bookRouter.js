const router = require("express").Router();
const bookCtrl = require("../controllers/bookCtrl");

router.route("/book").get(bookCtrl.getBooks).post(bookCtrl.createBook);

router
  .route("/book/:id")
  .get(bookCtrl.getBook)
  .put(bookCtrl.updateBook)
  .delete(bookCtrl.deleteBook);

module.exports = router;
