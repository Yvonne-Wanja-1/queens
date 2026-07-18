const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        // Get user data from the request body
        const { name, email, password } = req.body;

        // Validate input
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

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "Email already exists.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const result = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, created_at`,
            [name, email, hashedPassword]
        );

        // Send success response
        res.status(201).json({
            message: "User registered successfully!",
            user: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error registering user.",
        });
    }
};


const login = async (req, res) => {
    try {
        // Get login data
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        // Find user by email
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // Check if user exists
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Get the user from the database
        const user = result.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Temporary success response
      // Generate JWT token
const token = jwt.sign(
    {
        id: user.id,
        email: user.email,
        role: user.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d",
    }
);

// Send response
res.status(200).json({
    message: "Login successful!",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
    },
});

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error logging in.",
        });
    }
};

module.exports = {
    register,
    login,
};