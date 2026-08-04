const express = require("express");

const {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createReview);

router.get("/product/:id", getProductReviews);

router.put("/:id", authenticateToken, updateReview);

router.delete("/:id", authenticateToken, deleteReview);

module.exports = router;