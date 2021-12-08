module.exports = {
  get: {
    summary: "Endpoint for get user information.",
    tags: ["User"],
    operationId: "userInfo",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Returns the user information if the user is registered.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
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
