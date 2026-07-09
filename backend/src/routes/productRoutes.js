const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

// GET /products
router.get("/", getAllProducts);

module.exports = router;