const required = ["phone", "name"];
const { permitted } = require("../src/config/enums");

const user = {
  name: {
    type: "string",
    description: "User's full name",
  },
  phone: {
    type: "string",
    description: "User's phone number",
  },
  email: {
    type: "string",
    description: "User's email",
  },
  age: {
    type: "number",
    description: "User's age",
  },
  region: {
    type: "string",
    description: "User's living region",
  },
  interests: {
    type: "array",
    description: "User's interests books categories",
    items: {
      type: "string",
      enum: permitted,
    },
  },
};

module.exports = {
  components: {
    schemas: {
      User: {
        type: "object",
        required,
        description: "All user data",
        properties: {
          _id: {
            type: "string",
            description: "User's identification number",
          },
          name: user.name,
          phone: user.phone,
          age: user.age,
          email: user.email,
          region: user.region,
          interests: user.interests,
        },
        example: {
          name: "Falonchi Falonchiyev",
          phone: "+998901234567",
          age: 18,
          email: "mail@example.com",
          region: "Tashkent",
        },
      },
      Register: {
        type: "object",
        required,
        description: "Only user register data",
        properties: {
          name: user.name,
          phone: user.phone,
          age: user.age,
          email: user.email,
          region: user.region,
          interests: user.interests,
        },
        example: {
          name: "Falonchi Falonchiyev",
          phone: "+998901234567",
          age: 18,
          email: "mail@example.com",
          region: "Tashkent",
          interests: permitted,
        },
      },
      Code: {
        type: "object",
        required: ["code"],
        description: "Code sent to the user",
        properties: {
          code: {
            type: "string",
            description: "Code sent to the user",
          },
        },
        example: {
          code: 123456,
        },
      },
      Verify: {
        type: "object",
        required: ["phone", "code"],
        description: "Code sent to the user",
        properties: {
          phone: {
            type: "string",
            description: "User phone number",
          },
          code: {
            type: "string",
            description: "Code sent to the user",
          },
        },
        example: {
          phone: "+998901234567",
          code: 123456,
        },
      },
      Login: {
        type: "object",
        required,
        description: "Only user login data",
        properties: { phone: user.phone },
        example: {
          phone: "+998901234567",
        },
      },
      Token: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
            description: "All successfully returned tokens",
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Success message",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          err: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Error name",
              },
              message: {
                type: "string",
                description: "Error message",
              },
            },
          },
        },
      },
    },
  },
};
