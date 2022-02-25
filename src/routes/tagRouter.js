const Express = require("express");
const tagCtrl = require("../controllers/tagCtrl")
const TagRouter = Express.Router();

TagRouter.get("/", tagCtrl.getTags);
TagRouter.post("/", tagCtrl.createTag);

TagRouter.put("/:id", tagCtrl.updateTag);
TagRouter.delete("/:id", tagCtrl.deleteTag);

module.exports = {
    path: "/api/tag",
    router: TagRouter,
};
