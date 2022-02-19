const router = require("express").Router();
const categoryCtrl = require("../controllers/categoryCtrl");

router
    .route("/category")
    .get(categoryCtrl.getCategories)
    .post(categoryCtrl.createCategory);

// router.get("/book/main", bookCtrl.getMainBooks);

// router.get("/book/bookmarks", bookCtrl.getBookmarkBooks);

// router.post("/book/:id/status", bookCtrl.statusBook);

router
  .route("/category/:id")
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.deleteCategory);

module.exports = router;
