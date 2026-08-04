const express = require("express");
const {
    createInstallmentPayment,
    getOrderPayments,
} = require("../controllers/installmentController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Make an installment payment
router.post("/pay", authenticateToken, createInstallmentPayment);

// View payments for an order
router.get("/order/:orderId", authenticateToken, getOrderPayments);

module.exports = router;