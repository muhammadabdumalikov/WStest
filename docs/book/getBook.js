module.exports = {
  get: {
    summary: "Endpoint for get one book.",
    tags: ["Book"],
    operationId: "getBook",
    responses: {
      200: {
        description: "Get one book by id",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Book",
            },
          },
        },
      },
      400: {
        description: "Book not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
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
