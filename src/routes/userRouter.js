const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");

router.post("/register", userCtrl.checkPhone, userCtrl.register);

router.post("/register/verify", userCtrl.registerVerify);

router.post("/login", userCtrl.checkPhone, userCtrl.login);

router.post("/login/verify", userCtrl.loginVerify);

router.get("/logout", userCtrl.logout);

router.get("/me", auth, userCtrl.getUser);

module.exports = router;
