const Express = require("express");
const categoryCtrl = require("../controllers/categoryCtrl");
const CategoryRouter = Express.Router();

CategoryRouter.get("/", categoryCtrl.getCategories);
CategoryRouter.post("/", categoryCtrl.createCategory);

CategoryRouter.put("/:id", categoryCtrl.updateCategory);
CategoryRouter.delete("/:id", categoryCtrl.deleteCategory);

module.exports = {
    path: "/api/category",
    router: CategoryRouter,
};
