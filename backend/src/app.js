const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});

module.exports = app;