const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const {
    validatePromoCode,
} = require("../controllers/promoController");

const router = express.Router();

router.post(
    "/validate",
    authenticateToken,
    validatePromoCode
);

module.exports = router;