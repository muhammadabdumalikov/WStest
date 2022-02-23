const Books = require("../models/bookModel");
const BookStatus = require("../models/bookStatusModel");
const Category = require("../models/categoryBookModel");
const APIfeatures = require("./APIfeatures");
const jwt = require("jsonwebtoken");

const bookCtrl = {
    getBooks: async (req, res) => {
        try {
            const features = new APIfeatures(
                Books.where("isPublic")
                    .equals(true)
                    .sort({ title: "desc", test: -1 })
                    .lean(),
                req.query
            )
                .filtering()
                .sorting()
                .paginating();

            let books = await features.query;
            books = await Promise.all(
                books.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );

            res.json({ length: books.length, books });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    // getTestBooks: async (req, res) => {
    //     try {
    //         const books = await Books.find()
    //             .populate("categories", "-books")
    //             .lean();

    //         res.json(books);
    //     } catch (error) {
    //         return res.error.handleError(res, err);
    //     }
    // },
    // getBookmarkBooks: async (req, res) => {
    //     try {
    //         let books = await BookStatus.find({
    //             bookmark: true,
    //             // userId: req.user.id,
    //         })
    //             .lean()
    //             .select("rate process bookmark bookId");

    //         books = await Promise.all(
    //             books.map(async (bookStatus) => {
    //                 const book = await Books.findById(bookStatus.bookId).lean();

    //                 delete bookStatus["bookId"];
    //                 return { ...book, ...bookStatus };
    //             })
    //         );

    //         res.json({ status: "OK", length: books.length, books });
    //     } catch (err) {
    //         return res.error.handleError(res, err);
    //     }
    // },
    getMainBooks: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit);

            let special = await Books.find().limit(limit).lean();
            special = await Promise.all(
                special.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );
            let bestseller = await Books.find()
                .sort({ rating: -1 })
                .limit(limit)
                .lean();
            bestseller = await Promise.all(
                bestseller.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );
            let discount = await Books.where("discountPrice")
                .ne(null)
                .limit(limit)
                .lean();

            discount = await Promise.all(
                discount.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );
            let newBooks = await Books.find({
                createdAt: {
                    // $lt: new Date(new Date().setDate(new Date().getDate() - 3)),
                    $gte: new Date(
                        new Date().setDate(new Date().getDate() - 3)
                    ),
                },
            })
                .sort({ createdAt: -1 })
                .limit(limit)
                .lean();
            newBooks = await Promise.all(
                newBooks.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );
            let editorChoice = await Books.find({ editorChoice: true })
                .limit(limit)
                .lean();
            editorChoice = await Promise.all(
                editorChoice.map(async (book) => {
                    const bookStatus = await BookStatus.findOne({
                        bookId: book._id,
                        // userId: req.user.id,
                    })
                        .lean()
                        .select("rate process bookmark");

                    return { ...book, ...bookStatus };
                })
            );

            res.json([
                {
                    title: "Siz uchun maxsus",
                    tag: "special",
                    books: special,
                },
                {
                    title: "Bestsellerlar",
                    tag: "bestseller",
                    books: bestseller,
                },
                {
                    title: "Chegirmali kitoblar",
                    tag: "discount",
                    books: discount,
                },
                {
                    title: "Yangi kitoblar",
                    tag: "newBooks",
                    books: newBooks,
                },
                {
                    title: "Muharrir tanlovi",
                    tag: "editorChoice",
                    books: editorChoice,
                },
            ]);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    getBooksByTag: async (req, res) => {
        try {
            const features = new APIfeatures(
                Books.where("bookStatus")
                    .equals(req.params.bookStatus)
                    .sort({ title: "asc", test: -1 })
                    .lean(),
                req.query
            )
                .filtering()
                .sorting()
                .paginating();

            let books = await features.query;

            res.json(books);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    getBook: async (req, res) => {
        try {
            let book = await Books.findById(req.params.id).lean();
            if (!book) return res.error.bookNotFound(res);

            const bookStatus = await BookStatus.findOne({
                bookId: book._id,
                // userId: req.user.id, //???
            })
                .lean()
                .select("rate process bookmark")
                .sort("rate -test");

            res.json({ ...book, ...bookStatus });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    getUserBooks: async (req, res) => {
        try {

            console.log(11111)
            const {session} = req.session;

            const id = jwt.verify(session, process.env.ACCESS_TOKEN_SECRET);

            res.json(id);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    statusBook: async (req, res) => {
        try {
            let { rate, process, bookmark } = req.body;
            // const userId = req.user.id;
            const bookId = req.params.id;

            rate = rate && Math.floor(rate);
            process = process && Math.floor(process);

            const bookStatus = await BookStatus.findOne({ bookId });
            if (bookStatus) {
                await BookStatus.findByIdAndUpdate(bookStatus._id, {
                    rate,
                    process,
                    bookmark,
                });
            } else {
                const newBookStatus = new BookStatus({
                    bookId,
                    // userId,
                    rate,
                    process,
                    bookmark,
                });
                await newBookStatus.save();
            }

            res.json({ message: "Changed book status" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    createBook: async (req, res) => {
        try {
            const {
                title,
                description,
                author,
                sections,
                image,
                categories,
                bookStatus,
                bookUrl,
                price,
                editorChoice,
                discountPrice,
            } = req.body;

            const newBook = new Books({
                title,
                description,
                author,
                sections,
                categories,
                image,
                bookStatus,
                bookUrl,
                price,
                editorChoice,
                discountPrice,
            });
            await newBook.save();
            res.status(200).json({ message: "Book created" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    updateBook: async (req, res) => {
        try {
            const {
                title,
                description,
                tags,
                author,
                sections,
                bookmark,
                categoryId,
                image,
                editorChoice,
                price,
                discountPrice,
            } = req.body;

            const book = await Books.findByIdAndUpdate(req.params.id, {
                title,
                description,
                tags,
                author,
                sections,
                bookmark,
                categoryId,
                image,
                editorChoice,
                price,
                discountPrice,
            });
            if (!book) return res.error.bookNotFound(res);

            res.json({ message: "Book updated" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    searchBook: async (req, res) => {
        try {
            let regex = new RegExp(req.query.key, "i");

            const filtered = await Books.find({
                $and: [{ $or: [{ title: regex }, { author: regex }] }],
            }).lean();

            res.json({ length: filtered.length, data: filtered });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    deleteBook: async (req, res) => {
        try {
            const book = await Books.findByIdAndDelete(req.params.id);
            if (!book) return res.error.bookNotFound(res);

            await Category.updateMany(
                { _id: book.categories },
                { $pull: { books: book._id } }
            );

            res.json({ message: "Book deleted" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
};

module.exports = bookCtrl;
