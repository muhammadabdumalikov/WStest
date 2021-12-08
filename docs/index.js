const info = require("./info");
const servers = require("./servers");
const components = require("./components");
const user = require("./user");

module.exports = {
  ...info,
  ...servers,
  ...components,
  ...user,
};
