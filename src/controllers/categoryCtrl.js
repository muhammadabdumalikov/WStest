const Categories = require("../models/categoryBookModel");

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Categories.find().lean()

            res.status(200).json(categories);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    createCategory: async (req, res) => {
        try {
            const { categoryName, icon } = req.body;

            const newCategory = new Categories({
                name: categoryName,
                icon: icon,
            });

            await newCategory.save();

            res.status(200).json({ message: "Category created" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { categoryName, icon } = req.body;

            const category = await Categories.findByIdAndUpdate(req.params.id, {
                name: categoryName,
                icon: icon,
            });

            if (!category) return res.error.categoryNotFound(res);

            res.json({ message: "Category updated" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await Categories.findByIdAndDelete(req.params.id);

            if (!category) return res.error.categoryNotFound(res);

            res.json({ message: "Category deleted" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
};

module.exports = categoryCtrl;
