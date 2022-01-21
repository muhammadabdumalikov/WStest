const { permitted } = require("../src/config/enums");

const userRequired = ["phone", "name"];
const bookRequired = ["title", "description", "author", "sections"];

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

const book = {
  _id: {
    type: "string",
    description: "Book's identification number",
  },
  title: {
    type: "string",
    description: "Book's name",
  },
  description: {
    type: "string",
    description: "Book's description",
  },
  tags: {
    type: "array",
    description: "Book's tags",
    items: {
      type: "string",
    },
  },
  author: {
    type: "string",
    description: "Book's author",
  },
  ratings: {
    type: "number",
    description: "Book's ratings",
  },
  students: {
    type: "number",
    description: "The number of students reading the book",
  },
  sections: {
    type: "number",
    description: "Book's section number",
  },
  rate: {
    type: "number",
    description: "User rating for book",
  },
  process: {
    type: "number",
    description: "What percentage of the book was read",
  },
  category: {
    type: "array",
    description: "Book's category",
    items: {
      type: "string",
    },
  },
  image: {
    type: "object",
    properties: {
      url: { type: "string", description: "Book image url" },
      publicId: { type: "string", description: "Book image id for cloud" },
    },
  },
};

module.exports = {
  components: {
    schemas: {
      // Auth
      User: {
        type: "object",
        userRequired,
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
        userRequired,
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
        userRequired,
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

      // Books
      Book: {
        type: "object",
        bookRequired,
        description: "All user data",
        properties: {
          _id: book._id,
          title: book.title,
          description: book.description,
          tags: book.tags,
          author: book.author,
          ratings: book.ratings,
          students: book.students,
          sections: book.sections,
          category: book.category,
          rate: book.rate,
          process: book.process,
        },
        example: {
          title: "Godfather",
          description: "Criminal book",
          tags: ["political", "biography"],
          author: "Mario Puzo",
          ratings: 4.3,
          students: 1,
          sections: 576,
          category: ["special", "political"],
          rate: 4,
          process: 20,
        },
      },
      ChangeBook: {
        type: "object",
        bookRequired,
        description: "All user data",
        properties: {
          title: book.title,
          description: book.description,
          tags: book.tags,
          author: book.author,
          sections: book.sections,
          category: book.category,
        },
        example: {
          title: "Godfather",
          description: "Criminal book",
          tags: ["political", "biography"],
          author: "Mario Puzo",
          sections: 576,
          category: ["special", "political"],
        },
      },
      StatusBook: {
        type: "object",
        description: "Change book status",
        properties: {
          bookId: book._id,
          rate: book.rate,
          process: book.process,
        },
        example: {
          bookId: "61e6af73131720d71dd4eabc",
          rate: 4,
          process: 20,
        },
      },

      // Messages
      Success: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "Success code",
          },
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
