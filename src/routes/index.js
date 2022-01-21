const router = require("express").Router();
const auth = require("../middlewares/auth");

router.use("/", require("./userRouter"));
router.use("/", auth, require("./bookRouter"));

module.exports = router;
