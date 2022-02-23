const Express = require("express");
const categoryCtrl = require("../controllers/categoryCtrl");
const CategoryRouter = Express.Router();

CategoryRouter.put("/category/:id", categoryCtrl.updateCategory);
CategoryRouter.delete("/category/:id", categoryCtrl.deleteCategory);
CategoryRouter.get("/category", categoryCtrl.getCategories);
CategoryRouter.post("/category", categoryCtrl.createCategory);

module.exports = {
    path: "/api/category",
    router: CategoryRouter,
};
