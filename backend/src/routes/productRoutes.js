const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { getAllProducts , 
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes
router.post("/", authenticateToken, createProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);


module.exports = router;