const pool = require("../database/db");

// Get all low-stock products
const getLowStockProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM products
            WHERE quantity <= low_stock_threshold
            ORDER BY quantity ASC
        `);

        res.status(200).json({
            count: result.rows.length,
            products: result.rows,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving low stock products.",
        });
    }
};

// Restock a product
const restockProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0.",
            });
        }

        const result = await pool.query(
            `
            UPDATE products
            SET quantity = quantity + $1
            WHERE id = $2
            RETURNING *
            `,
            [quantity, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        res.status(200).json({
            message: "Product restocked successfully.",
            product: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error restocking product.",
        });
    }
};

module.exports = {
    getLowStockProducts,
    restockProduct,
};