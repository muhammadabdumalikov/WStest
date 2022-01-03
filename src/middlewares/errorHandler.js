const errorHandler = (req, res, next) => {
  const error = {
    serverError: async (res, err) => {
      res.status(500).json({
        err: {
          code: "ServerErr",
          message: `International server error: ${err.message}`,
        },
      });
    },
    handleError: async (res, err) => {
      switch (err.code) {
        case "ValidationError":
          return res.status(400).json({ err });
        case "CastError":
          return res.status(400).json({ err });
        default:
          return res.status(500).json({
            err: {
              code: "ServerErr",
              message: `International server error: ${err.message}`,
            },
          });
      }
    },
    noUpload: async (res) => {
      res.status(400).json({
        err: {
          code: "NoUpload",
          message: "No upload file",
        },
      });
    },
    invalidSize: async (res) => {
      res.status(400).json({
        err: {
          code: "InvalidSize",
          message: "File large",
        },
      });
    },
    invalidType: async (res) => {
      res.status(400).json({
        err: {
          code: "InvalidType",
          message: "File format png or jpeg",
        },
      });
    },
    invalidPublicId: async (res) => {
      res.status(400).json({
        err: {
          code: "InvalidPublicId",
          message: "No checked image",
        },
      });
    },
    invalidUploadImage: async (res) => {
      res.status(400).json({
        err: {
          code: "InvalidUploadImage",
          message: "No Upload Image is required",
        },
      });
    },
    notFoundUser: async (res) => {
      res.status(400).json({
        err: {
          code: "NotFound",
          message: "User does not exist.",
        },
      });
    },
    invalidAuthorization: async (res) => {
      res.status(400).json({
        err: {
          code: "InvalidAuthorization",
          message: "Please login or register",
        },
      });
    },
    validationError: async (res, err) => {
      res.status(400).json({
        err: {
          code: "ValidationError",
          error: err,
        },
      });
    },
    codeValidationError: async (res) => {
      res.status(400).json({
        err: {
          code: "ValidationError",
          message: "Code not entered.",
        },
      });
    },
    invalidCode: async (res) => {
      res.status(400).json({
        err: {
          code: "ValidationError",
          message: "Code not valid.",
        },
      });
    },
    alreadyExistPhone: async (res) => {
      res.status(400).json({
        err: {
          code: "AlreadyExist",
          message: "The phone number already exists.",
        },
      });
    },
    notRegistered: async (res) => {
      res.status(400).json({
        err: {
          code: "NOT_REGISTERED",
          message: "You are not registered",
        },
      });
    },
    codeNotValid: async (res) => {
      res.status(400).json({
        err: {
          code: "CODE_NOT_VALID",
          message: "Code not valid",
        },
      });
    },
    bookNotFound: async (res) => {
      res.status(400).json({
        err: {
          code: "NOT_FOUND",
          message: "Book is not exist",
        },
      });
    },
  };

  res.error = error;

  next();
};

module.exports = errorHandler;
