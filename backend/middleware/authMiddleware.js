const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // Store user in request

            if (!req.user) {
                return res.status(401).json({ message: "User not found, not authorized" });
            }

            next();
        } catch (error) {
            console.error("Auth error:", error);
            res.status(401).json({ message: "Token failed, not authorized" });
        }
    } else {
        res.status(401).json({ message: "No token, not authorized" });
    }
};

module.exports = { protect };
