module.exports = {
    delete: {
      summary: "Endpoint for delete category.",
      tags: ["Category"],
      operationId: "deleteCategory",
      responses: {
        200: {
          description: "Delete book message successful",
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
  