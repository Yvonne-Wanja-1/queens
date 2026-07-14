const pool = require("./database/db");
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use("/products", productRoutes);

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