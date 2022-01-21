const router = require("express").Router();
const auth = require("../middlewares/auth");

router.use("/", require("./userRouter"));
router.use("/", auth, require("./bookRouter"));
router.use("/", auth, require("./upload"));

module.exports = router;
