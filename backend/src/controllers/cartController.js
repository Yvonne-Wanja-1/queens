const pool = require("../database/db");

const addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        // Get logged-in user ID from JWT token
        const userId = req.user.id;

        // Validate input
        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Product ID and valid quantity are required."
            });
        }

        // Check if product exists
        const productResult = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [product_id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        // Check if user already has a cart
        let cartResult = await pool.query(
            "SELECT * FROM carts WHERE user_id = $1",
            [userId]
        );

        let cartId;

        // If no cart exists, create one
        if (cartResult.rows.length === 0) {
            const newCart = await pool.query(
                "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
                [userId]
            );

            cartId = newCart.rows[0].id;
        } else {
            cartId = cartResult.rows[0].id;
        }

        // Check if product is already in the cart
        const existingItem = await pool.query(
            "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, product_id]
        );

        let result;

        if (existingItem.rows.length > 0) {
            // Update quantity if product already exists in cart
            result = await pool.query(
                "UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *",
                [quantity, cartId, product_id]
            );
        } else {
            // Add new product to cart
            result = await pool.query(
                "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
                [cartId, product_id, quantity]
            );
        }

        res.status(201).json({
            message: "Product added to cart successfully!",
            cart_item: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error adding product to cart."
        });
    }
};

const getCart = async (req, res) => {
    try {
        // Get logged-in user ID
        const userId = req.user.id;

        // Get the user's cart
        const cartResult = await pool.query(
            "SELECT * FROM carts WHERE user_id = $1",
            [userId]
        );

        // If cart does not exist
        if (cartResult.rows.length === 0) {
            return res.status(200).json({
                message: "Cart is empty.",
                items: []
            });
        }

        const cartId = cartResult.rows[0].id;

        // Get all cart items with product details
        const itemsResult = await pool.query(
            `SELECT 
                cart_items.id,
                cart_items.quantity,
                products.id AS product_id,
                products.name,
                products.price,
                products.type,
                products.size,
                (products.price * cart_items.quantity) AS total_price
             FROM cart_items
             JOIN products ON cart_items.product_id = products.id
             WHERE cart_items.cart_id = $1`,
            [cartId]
        );

        // Calculate cart total
        const cartTotal = itemsResult.rows.reduce((total, item) => {
            return total + parseFloat(item.total_price);
        }, 0);

        res.status(200).json({
            message: "Cart retrieved successfully!",
            cart_id: cartId,
            total: cartTotal,
            items: itemsResult.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving cart."
        });
    }
};


const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;

        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Valid quantity is required."
            });
        }

        // Ensure the cart item belongs to the logged-in user
        const itemResult = await pool.query(
            `SELECT cart_items.*
             FROM cart_items
             JOIN carts ON cart_items.cart_id = carts.id
             WHERE cart_items.id = $1 AND carts.user_id = $2`,
            [id, userId]
        );

        if (itemResult.rows.length === 0) {
            return res.status(404).json({
                message: "Cart item not found."
            });
        }

        // Update quantity
        const result = await pool.query(
            "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
            [quantity, id]
        );

        res.status(200).json({
            message: "Cart item updated successfully!",
            cart_item: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating cart item."
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Ensure the cart item belongs to the logged-in user
        const itemResult = await pool.query(
            `SELECT cart_items.*
             FROM cart_items
             JOIN carts ON cart_items.cart_id = carts.id
             WHERE cart_items.id = $1 AND carts.user_id = $2`,
            [id, userId]
        );

        if (itemResult.rows.length === 0) {
            return res.status(404).json({
                message: "Cart item not found."
            });
        }

        // Delete the cart item
        await pool.query(
            "DELETE FROM cart_items WHERE id = $1",
            [id]
        );

        res.status(200).json({
            message: "Product removed from cart successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error removing product from cart."
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
};
