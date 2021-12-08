const router = require("express").Router();

router.use("/", require("./userRouter"));

module.exports = router;
