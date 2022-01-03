const info = require("./info");
const servers = require("./servers");
const components = require("./components");
const paths = require("./paths");

module.exports = {
  ...info,
  ...servers,
  ...components,
  ...paths,
};
