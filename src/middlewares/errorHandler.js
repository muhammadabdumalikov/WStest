const errorHandler = (req, res, next) => {
  const error = {
    serverError: async (res, err) => {
      res.status(500).json({
        err: {
          name: "ServerErr",
          message: `International server error: ${err.message}`,
        },
      });
    },
    handleError: async (res, err) => {
      switch (err.name) {
        case "ValidationError":
          return res.status(400).json({ err });
        case "CastError":
          return res.status(400).json({ err });
        default:
          return res.status(500).json({
            err: {
              name: "ServerErr",
              message: `International server error: ${err.message}`,
            },
          });
      }
    },
    noUpload: async (res) => {
      res.status(400).json({
        err: {
          name: "NoUpload",
          message: "No upload file",
        },
      });
    },
    invalidSize: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidSize",
          message: "File large",
        },
      });
    },
    invalidType: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidType",
          message: "File format png or jpeg",
        },
      });
    },
    invalidPublicId: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidPublicId",
          message: "No checked image",
        },
      });
    },
    invalidUploadImage: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidUploadImage",
          message: "No Upload Image is required",
        },
      });
    },
    notFoundUser: async (res) => {
      res.status(400).json({
        err: {
          name: "NotFound",
          message: "User does not exist.",
        },
      });
    },
    invalidAuthorization: async (res) => {
      res.status(400).json({
        err: {
          name: "InvalidAuthorization",
          message: "Please login or register",
        },
      });
    },
    validationError: async (res, err) => {
      res.status(400).json({
        err: {
          name: "ValidationError",
          error: err,
        },
      });
    },
    codeValidationError: async (res) => {
      res.status(400).json({
        err: {
          name: "ValidationError",
          message: "Code not entered.",
        },
      });
    },
    invalidCode: async (res) => {
      res.status(400).json({
        err: {
          name: "ValidationError",
          message: "Code not valid.",
        },
      });
    },
    alreadyExistPhone: async (res) => {
      res.status(400).json({
        err: {
          name: "AlreadyExist",
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
  };

  res.error = error;

  next();
};

module.exports = errorHandler;
