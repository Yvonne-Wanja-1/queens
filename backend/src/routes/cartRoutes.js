const express = require("express");
const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
} = require("../controllers/cartController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// View cart
router.get("/", authenticateToken, getCart);

// Update cart item quantity
router.put("/item/:id", authenticateToken, updateCartItem);

// Add product to cart
router.post("/add", authenticateToken, addToCart);

// Remove product from cart
router.delete("/item/:id", authenticateToken, removeFromCart);

    

module.exports = router;