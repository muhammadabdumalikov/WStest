const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");

router.post("/register", userCtrl.checkPhone, userCtrl.register);

router.post("/register/verify", userCtrl.registerVerify);

router.post("/login", userCtrl.checkPhone, userCtrl.login);

router.post("/login/verify", userCtrl.loginVerify);

router.get("/logout", userCtrl.logout);

router
  .route("/me")
  .get(auth, userCtrl.getUser)
  .put(auth, userCtrl.updateUser)
  .delete(auth, userCtrl.deleteUser);
router.put("/me/verify", auth, userCtrl.updateVerify);

module.exports = router;
