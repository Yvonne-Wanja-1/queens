const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    res.json({
        message: "Authentication middleware is working!"
    });
};

module.exports = authenticateToken;