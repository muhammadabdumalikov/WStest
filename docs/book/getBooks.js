const { parameters } = require("./getBooksParameters");

module.exports = {
  get: {
    summary: "Endpoint for get books.",
    tags: ["Book"],
    operationId: "getBooks",
    parameters,
    responses: {
      200: {
        description: "Get all books",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                books: {
                  type: "array",
                  description: "All books",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};
