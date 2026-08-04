const express = require("express");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const logger = require("./middleware/logger");
const pool = require("./database/db");
const productRoutes = require("./routes/productRoutes");
const installmentsRoutes = require("./routes/installmentsRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const promoRoutes = require("./routes/promoRoutes");
const app = express();

const path = require("path");

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(logger);
app.use(express.json());
app.use("/inventory", inventoryRoutes);
app.use("/installments", installmentsRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/promo", promoRoutes);
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