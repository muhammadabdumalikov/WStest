module.exports = {
  get: {
    summary: "Endpoint for get main screen books.",
    tags: ["Book"],
    parameters: [
      {
        name: "limit",
        schema: {
          type: "number",
        },
        description: "How many books to return for each section: /book?limit=5",
      },
    ],
    operationId: "getMainBooks",
    responses: {
      200: {
        description: "Get all main screen books",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                special: {
                  type: "array",
                  description: "special books",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
                bestseller: {
                  type: "array",
                  description: "bestseller books",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
                discount: {
                  type: "array",
                  description: "discount books",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
                newBooks: {
                  type: "array",
                  description: "newBooks books",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
                editorChoice: {
                  type: "array",
                  description: "editorChoice books",
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
