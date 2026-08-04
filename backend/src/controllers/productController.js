const pool = require("../database/db");

// ===============================
// GET ALL PRODUCTS
// Search + Filter + Sort + Pagination
// ===============================
const getAllProducts = async (req, res) => {
    try {
        const {
            search,
            type,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10,
        } = req.query;

        let query = "SELECT * FROM products WHERE 1=1";
        const values = [];
        let index = 1;

        // Search by product name
        if (search) {
            query += ` AND name ILIKE $${index}`;
            values.push(`%${search}%`);
            index++;
        }

        // Filter by type
        if (type) {
            query += ` AND type = $${index}`;
            values.push(type);
            index++;
        }

        // Minimum price
        if (minPrice) {
            query += ` AND price >= $${index}`;
            values.push(minPrice);
            index++;
        }

        // Maximum price
        if (maxPrice) {
            query += ` AND price <= $${index}`;
            values.push(maxPrice);
            index++;
        }

        // Sorting
        switch (sort) {
            case "price_asc":
                query += " ORDER BY price ASC";
                break;

            case "price_desc":
                query += " ORDER BY price DESC";
                break;

            case "name":
                query += " ORDER BY name ASC";
                break;

            case "newest":
                query += " ORDER BY id DESC";
                break;

            default:
                query += " ORDER BY id ASC";
        }

        // Pagination
        const offset = (page - 1) * limit;

        query += ` LIMIT $${index} OFFSET $${index + 1}`;

        values.push(limit);
        values.push(offset);

        const result = await pool.query(query, values);

        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            totalProducts: result.rows.length,
            products: result.rows,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error retrieving products.",
        });
    }
};

// ===============================
// GET PRODUCT BY ID
// ===============================
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

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

// ===============================
// CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {
    try {
        const { name, price, type, size, quantity } = req.body;

        const image = req.file
    ? req.file.filename
    : null;

        if (!name || !price || !type || !size || !quantity) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        const result = await pool.query(
            `INSERT INTO products
            (name, price, type, size, quantity)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, price, type, size, quantity]
        );

        res.status(201).json({
            message: "Product created successfully.",
            product: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating product.",
        });
    }
};

// ===============================
// UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, type, size, quantity } = req.body;

        const result = await pool.query(
            `UPDATE products
             SET
                name = $1,
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
            message: "Product updated successfully.",
            product: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error updating product.",
        });
    }
};

// ===============================
// DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `DELETE FROM products
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully.",
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