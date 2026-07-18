const pool = require("../database/db");

// GET /products
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving products.",
        });
    }
};

// GET /products/:id
const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID.",
            });
        }

        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving product.",
        });
    }
};

// POST /products
const createProduct = async (req, res) => {
    try {
        const { name, price, type, size, quantity } = req.body;

        // Validation
        if (!name || !type || !size || price == null || quantity == null) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price must be greater than 0.",
            });
        }

        if (quantity < 0) {
            return res.status(400).json({
                message: "Quantity cannot be negative.",
            });
        }

        const result = await pool.query(
            `INSERT INTO products (name, price, type, size, quantity)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, price, type, size, quantity]
        );

        res.status(201).json({
            message: "Product created successfully!",
            product: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating product.",
        });
    }
};

// PUT /products/:id
const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID.",
            });
        }

        const { name, price, type, size, quantity } = req.body;

        // Validation
        if (!name || !type || !size || price == null || quantity == null) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price must be greater than 0.",
            });
        }

        if (quantity < 0) {
            return res.status(400).json({
                message: "Quantity cannot be negative.",
            });
        }

        const result = await pool.query(
            `UPDATE products
             SET name = $1,
                 price = $2,
                 type = $3,
                 size = $4,
                 quantity = $5
             WHERE id = $6
             RETURNING *`,
            [name, price, type, size, quantity, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        res.status(200).json({
            message: "Product updated successfully!",
            product: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating product.",
        });
    }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid product ID.",
            });
        }

        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully!",
            product: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting product.",
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};