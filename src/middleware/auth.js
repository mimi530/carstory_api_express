const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const bearer = req.header("authorization");
    if (!bearer) return res.status(401).send("Access denied. No token provided");

    try {
        const token = bearer.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};
