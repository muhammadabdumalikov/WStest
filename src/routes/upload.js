const Express = require("express");
const fs = require("fs");
const cloudinary = require("cloudinary");
const UploadRouter = Express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

UploadRouter.post("/upload", (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No upload file" });
        }

        const file = req.files.file;
        if (file.size > 5 * 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ message: "File large" });
        }

        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ message: "File format png or jpeg" });
        }

        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            { folder: "Zehniyat" },
            async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath);

                res.json({
                    publicId: result.public_id,
                    url: result.secure_url,
                });
            }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

UploadRouter.post("/destroy", (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId)
            return res.status(400).json({ message: "No checked image" });

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json({ message: "Image is deleted" });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

module.exports = {
    path: "/api/upload",
    router: UploadRouter,
};
