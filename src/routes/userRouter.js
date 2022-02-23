const Express = require("express");
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");
const UserRouter = Express.Router();

UserRouter.post("/register", userCtrl.checkPhone, userCtrl.register);

UserRouter.post("/register/verify", userCtrl.registerVerify);

UserRouter.post("/login", userCtrl.checkPhone, userCtrl.login);

UserRouter.post("/login/verify", userCtrl.loginVerify);

UserRouter.get("/logout", userCtrl.logout);

UserRouter.get("/me", auth, userCtrl.getUser);
UserRouter.put("/me", auth, userCtrl.updateUser);
UserRouter.delete("/me", auth, userCtrl.deleteUser);
UserRouter.put("/me/verify", auth, userCtrl.updateVerify);

module.exports = {
    path: "/api/users",
    router: UserRouter,
};
