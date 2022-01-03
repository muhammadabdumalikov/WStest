const router = require("express").Router();

router.use("/", require("./userRouter"));
router.use("/", require("./bookRouter"));

module.exports = router;
