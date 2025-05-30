const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};
