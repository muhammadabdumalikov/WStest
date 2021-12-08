module.exports = {
  get: {
    summary: "Endpoint for get token.",
    tags: ["Token"],
    operationId: "token",
    responses: {
      200: {
        description: "Returns the token if the user is registered.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Token",
            },
          },
        },
      },
      400: {
        description: "Invalid request has been sent",
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
