module.exports = {
  post: {
    summary: "The user sends the code after login.",
    tags: ["Login"],
    operationId: "login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Login",
          },
        },
      },
    },
    responses: {
      200: {
        description:
          "The code was successfully sent to the user's phone number",
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
