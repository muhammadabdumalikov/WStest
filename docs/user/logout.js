module.exports = {
  get: {
    summary: "Endpoint for log out.",
    tags: ["Logout"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    operationId: "logout",
    responses: {
      200: {
        description: "Returns the message after the logout.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Success",
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
