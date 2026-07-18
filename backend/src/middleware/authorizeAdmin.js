const authorizeAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    // User is an admin
    next();
};

module.exports = authorizeAdmin;