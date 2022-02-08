module.exports = {
  get: {
    summary: "Endpoint for get bookmark books.",
    tags: ["Book"],
    operationId: "getBookmarkBooks",
    responses: {
      200: {
        description: "Get all bookmark books",
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
