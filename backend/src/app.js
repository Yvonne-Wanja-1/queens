const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const logger = require("./middleware/logger");
const pool = require("./database/db");
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const installmentRoutes = require("./routes/installmentRoutes");
const app = express();

// Middleware
app.use(logger);
app.use(express.json());
app.use("/installments", installmentRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully!");
        console.log(result.rows[0]);
    }
});

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});

module.exports = app;