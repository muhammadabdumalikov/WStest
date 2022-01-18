exports.parameters = [
  {
    name: "category",
    schema: {
      type: "string",
    },
    description: "Books filter by category: /book?category=special",
  },
  {
    name: "limit",
    schema: {
      type: "number",
    },
    description:
      "The numbers of items to return: /book?category=political&limit=10",
  },
  {
    name: "sort",
    schema: {
      type: "number",
    },
    description: "Books sorting date or count: /book?sort=-sections",
  },
  {
    name: "page",
    schema: {
      type: "number",
    },
    description: "Books paginating: /book?page=2",
  },
];
