module.exports = {
    post: {
      summary: "Endpoint for create category.",
      tags: ["Book"],
      operationId: "createCategory",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCategory",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Created category message successful",
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
  