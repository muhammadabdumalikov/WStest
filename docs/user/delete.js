module.exports = {
  delete: {
    summary: "Endpoint for delete user.",
    tags: ["User"],
    operationId: "userDelete",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Returns the message about if deleted user.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Success",
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
