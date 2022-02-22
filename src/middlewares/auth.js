const jwt = require("jsonwebtoken");
const Session = require("../models/sessionModel");

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

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, data) => {
            if (err)
                return res.status(403).json({
                    err: {
                        name: "InvalidAuthorization",
                        message: "Invalid Authorization",
                    },
                });

            const session = await Session.findOne({ _id: data.id });

            if (!session)
                return res.status(403).json({
                    err: {
                        name: "InvalidAuthorization",
                        message: "Session already expired",
                    },
                });

            req.session = session;
            next();
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = auth;
