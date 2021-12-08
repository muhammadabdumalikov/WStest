const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let gRUser = {};
let gLUser = {};

const userCtrl = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.error.validationError(res, errors);

      const { name, phone, region, age, email } = req.body;

      const userPhone = await Users.findOne({ phone });
      if (userPhone) return res.error.alreadyExistPhone(res);

      await createVerification(phone);

      gRUser = { name, phone, region, age, email };

      res.json({ message: `Code sent to ${phone}` });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  registerVerify: async (req, res) => {
    try {
      const { code } = req.body;
      const { name, phone, region, age, email } = gRUser;

      if (!code) return res.error.codeValidationError(res);

      const info = await verifyVerification(phone, code);

      if (!info.valid) return res.error.invalidCode(res);

      const newUser = new Users({
        name,
        phone,
        region,
        age,
        email,
      });
      await newUser.save();

      gRUser = {};

      // Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.status(201).json({ accessToken });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  login: async (req, res) => {
    try {
      const { phone } = req.body;

      const user = await Users.findOne({ phone });
      if (!user) return res.error.notFoundUser(res);

      await createVerification(phone);

      gLUser = { phone };

      res.json({ message: `Code sent to ${phone}` });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  loginVerify: async (req, res) => {
    try {
      const { code } = req.body;
      const { phone } = gLUser;

      if (!code) return res.error.codeValidationError(res);

      const info = await verifyVerification(phone, code);

      if (!info.valid) return res.error.invalidCode(res);

      const user = await Users.findOne({ phone });

      // If login success , create access token and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accessToken });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/token" });
      res.json({ message: "Logged out" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.error.notFoundUser(res);

      res.json(user);
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const update = req.body;
      const { phone } = req.body;

      if (phone)
        return res
          .status(400)
          .json({
            err: { name: "Invalid", message: "Can not change the number" },
          });

      const user = await Users.findByIdAndUpdate(req.user.id, update);
      if (!user) return res.error.notFoundUser(res);

      res.json({ message: "User updated" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.user.id);
      if (!user) return res.error.notFoundUser(res);

      res.json({ message: "User deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) return res.error.invalidAuthorization(res);

      await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.error.invalidAuthorization(res);

          const accessToken = createAccessToken({ id: user.id });

          res.json({ accessToken });
        }
      );
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  // Validation
  checkPhone: [check("phone", "Incorrect phone number").isMobilePhone()],
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const createVerification = (phone) => {
  return client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: phone, channel: "sms" });
};

const verifyVerification = (phone, code) => {
  return client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: phone, code: code });
};

module.exports = userCtrl;
