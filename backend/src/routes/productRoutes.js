const express = require("express");
const { getAllProducts , createProduct,getProductById

} = require("../controllers/productController");

const router = express.Router();

// GET /products
router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);

module.exports = router;