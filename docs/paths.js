const user = require("./user");
const book = require("./book");
const category = require("./category");

module.exports = {
  paths: {
    ...user,
    ...book,
    ...category
  },
};
