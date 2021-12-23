const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({
        err: {
          name: "InvalidAuthorization",
          message: "Invalid Authorization",
        },
      });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({
          err: {
            name: "InvalidAuthorization",
            message: "Invalid Authorization",
          },
        });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = auth;
