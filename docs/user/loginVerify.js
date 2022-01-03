module.exports = {
  post: {
    summary: "The user returns the token after entering the code.",
    tags: ["Login"],
    operationId: "verifyLogin",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Verify",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Returns the token after the user enters the code.",
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
