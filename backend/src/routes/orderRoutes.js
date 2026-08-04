const express = require("express");
const {
    checkout,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

const router = express.Router();

// Customer: view their own orders
router.get("/my-orders", authenticateToken, getMyOrders);

// Admin: view all orders
router.get("/", authenticateToken, authorizeAdmin, getAllOrders);

// Admin: update order status
router.put(
    "/:id/status",
    authenticateToken,
    authorizeAdmin,
    updateOrderStatus
);

// Customer: checkout cart
router.post("/checkout", authenticateToken, checkout);

module.exports = router;