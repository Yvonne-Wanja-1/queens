const pool = require("../database/db");

// Validate Promo Code
const validatePromoCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                message: "Promo code is required."
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM promo_codes
             WHERE code = $1
             AND is_active = TRUE
             AND expiry_date >= CURRENT_DATE`,
            [code]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Invalid or expired promo code."
            });
        }

        res.status(200).json({
            message: "Promo code is valid.",
            promo: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error validating promo code."
        });
    }
};

module.exports = {
    validatePromoCode,
};