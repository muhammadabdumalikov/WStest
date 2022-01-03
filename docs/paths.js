const user = require("./user");
const book = require("./book");

module.exports = {
  paths: {
    ...user,
    ...book,
  },
};
