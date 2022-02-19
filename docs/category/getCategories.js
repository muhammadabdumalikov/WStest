// const { parameters } = require("./getBooksParameters");

module.exports = {
  get: {
    summary: "Endpoint for get categories.",
    tags: ["Category"],
    operationId: "getCategories",
    // parameters,
    responses: {
      200: {
        description: "Get all categories",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "All categories",
                  items: {
                    $ref: "#/components/schemas/Category",
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
