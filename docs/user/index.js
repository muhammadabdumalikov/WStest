const register = require("./register");
const registerVerify = require("./registerVerify");
const login = require("./login");
const loginVerify = require("./loginVerify");
const logout = require("./logout");
const info = require("./info");
const update = require("./update");
const userDelete = require("./delete");

module.exports = {
  "/register": {
    ...register,
  },
  "/register/verify": {
    ...registerVerify,
  },
  "/login": {
    ...login,
  },
  "/login/verify": {
    ...loginVerify,
  },
  "/logout": {
    ...logout,
  },
  "/me": {
    ...info,
  },
  // "/me": {
  //   ...update,
  // },
  // "/delete": {
  //   ...userDelete,
  // },
};
