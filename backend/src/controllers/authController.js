const pool = require("../database/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long.",
            });
        }

        res.json({
            name,
            email,
            password,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error registering user.",
        });
    }
};

module.exports = {
    register,
};