module.exports = {
  get: {
    summary: "Endpoint for get books.",
    tags: ["Book"],
    operationId: "getBook",
    responses: {
      200: {
        description: "Get all books",
        content: {
          "application/json": {
            schema: {
              type: "array",
              description: "All books",
              items: {
                $ref: "#/components/schemas/Book",
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
