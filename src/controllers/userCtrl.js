const Users = require("../models/userModel");
const Sessions = require("../models/sessionModel");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const userCtrl = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.error.validationError(res, errors);

            const { name, phone, region, age, email } = req.body;

            if (phone.length !== 13)
                return res.error.validationError(
                    res,
                    "Enter valid phone number"
                );

            const user = await Users.findOne({ phone });
            if (user) {
                if (user.verified) return res.error.alreadyExistPhone(res);
                if (!user.verified) {
                    await Users.findOneAndUpdate(
                        { phone },
                        { name, region, age, email }
                    );
                }
            }

            if (!user) {
                const newUser = new Users({
                    phone,
                    name,
                    region,
                    age,
                    email,
                });
                console.log(user);
                await newUser.save();
            }

            await createVerification(phone);

            res.json({ message: `Code sent to ${phone}` });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    registerVerify: async (req, res) => {
        try {
            const { phone, code } = req.body;

            const user = await Users.findOne({ phone });
            if (!user) return res.error.notRegistered(res);
            if (user.verified) return res.error.alreadyExistPhone(res);

            if (!code)
                return res.error.validationError(res, "Code not entered.");

            const codeStr = code.toString();
            const n1 = Math.abs(codeStr);
            const n2 = parseInt(codeStr, 10);
            if (isNaN(n1) && n2 !== n1 && n1.toString() !== codeStr)
                return res.error.validationError(res, "Enter valid code.");

            if (code.toString().length !== 6)
                return res.error.validationError(res, "Code length invalid.");

            const info = await verifyVerification(phone, code);

            if (!info.valid) return res.error.codeNotValid(res);

            const session = new Sessions({ session_user_device: "IOS" });
            console.log(session);

            await Users.findOneAndUpdate(
                { phone },
                { verified: true, $push: { sessions: session._id } }
            );

            // Then create jsonwebtoken to authentication
            const accessToken = createAccessToken({ id: session._id });

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
            if (user.sessions.length == 3)
                return res.status(401).json({
                    err: {
                        name: "InvalidAuthorization",
                        message: "You cannot login with this profile",
                    },
                });

            await createVerification(phone);

            res.json({ message: `Code sent to ${phone}` });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    loginVerify: async (req, res) => {
        try {
            const { phone, code } = req.body;

            if (!code) return res.error.codeValidationError(res);

            const info = await verifyVerification(phone, code);

            if (!info.valid) return res.error.invalidCode(res);

            const session = new Sessions({ session_user_device: "IOS" });
            await session.save();

            await Users.findOneAndUpdate(
                { phone },
                { verified: true, $push: { sessions: session._id } }
            );

            // If login success , create access token and refresh token
            const accessToken = createAccessToken({ id: session._id });

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
            const user = await Users.findById(req.user.id).select("-verified");
            if (!user) return res.error.notFoundUser(res);

            res.json(user);
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { name, region, age, email } = req.body;
            const { phone } = req.body;

            const user = await Users.findByIdAndUpdate(req.user.id, {
                name,
                region,
                age,
                email,
            });
            if (!user) return res.error.notFoundUser(res);

            if (phone && user.phone !== phone) {
                await createVerification(phone);
                return res.json({
                    message: `User updated and code sent to ${phone}`,
                });
            }

            res.json({ message: "User updated" });
        } catch (err) {
            return res.error.handleError(res, err);
        }
    },
    updateVerify: async (req, res) => {
        try {
            const { phone, code } = req.body;

            if (!code) return res.error.codeValidationError(res);

            const info = await verifyVerification(phone, code);

            if (!info.valid) return res.error.invalidCode(res);

            const user = await Users.findByIdAndUpdate(req.user.id, { phone });
            if (!user) return res.error.notFoundUser(res);

            res.json({ message: "User phone number updated" });
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

    // Validation
    checkPhone: [check("phone", "Incorrect phone number").isMobilePhone()],
};

// Token
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

// Verification
const createVerification = async (phone) => {
    return await client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ to: phone, channel: "sms" });
};

const verifyVerification = async (phone, code) => {
    return await client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: phone, code: code });
};

module.exports = userCtrl;
