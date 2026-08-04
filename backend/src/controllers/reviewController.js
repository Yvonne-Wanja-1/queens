const pool = require("../database/db");

// Create a review
const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, rating, comment } = req.body;

        if (!product_id || !rating) {
            return res.status(400).json({
                message: "Product ID and rating are required.",
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5.",
            });
        }

        const product = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [product_id]
        );

        if (product.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        const existingReview = await pool.query(
            "SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2",
            [userId, product_id]
        );

        if (existingReview.rows.length > 0) {
            return res.status(400).json({
                message: "You have already reviewed this product.",
            });
        }

        const result = await pool.query(
            `INSERT INTO reviews (user_id, product_id, rating, comment)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, product_id, rating, comment]
        );

        res.status(201).json({
            message: "Review created successfully.",
            review: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating review.",
        });
    }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.id;

        const result = await pool.query(
            `SELECT
                reviews.id,
                users.name,
                reviews.rating,
                reviews.comment,
                reviews.created_at
            FROM reviews
            JOIN users
                ON reviews.user_id = users.id
            WHERE product_id = $1
            ORDER BY reviews.created_at DESC`,
            [productId]
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving reviews.",
        });
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviewId = req.params.id;
        const { rating, comment } = req.body;

        const result = await pool.query(
            `UPDATE reviews
             SET rating = $1,
                 comment = $2,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $3
             AND user_id = $4
             RETURNING *`,
            [rating, comment, reviewId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Review not found.",
            });
        }

        res.status(200).json({
            message: "Review updated successfully.",
            review: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating review.",
        });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviewId = req.params.id;

        const result = await pool.query(
            `DELETE FROM reviews
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [reviewId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Review not found.",
            });
        }

        res.status(200).json({
            message: "Review deleted successfully.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting review.",
        });
    }
};

module.exports = {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
};