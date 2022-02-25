const Tags = require("../models/tagModel");

const tagCtrl = {
    getTags: async (req, res) => {
        try {
            const tags = await Tags.find().lean();

            res.status(200).json(tags);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    createTag: async (req, res) => {
        try {
            const { tagName } = req.body;

            const newTag = new Tags({
                name: tagName,
            });

            await newTag.save();

            res.status(200).json({ message: "Tag created" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    updateTag: async (req, res) => {
        try {
            const { tagName, isPublic } = req.body;

            const tag = await Tags.findByIdAndUpdate(req.params.id, {
                name: tagName,
                isPublic: isPublic
            });

            if (!tag) return res.error.categoryNotFound(res);

            res.json({ message: "Tag updated" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    deleteTag: async (req, res) => {
        try {
            const tag = await Tags.findByIdAndDelete(req.params.id);

            if (!tag) return res.error.categoryNotFound(res);

            res.json({ message: "Tag deleted" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
};

module.exports = tagCtrl;
