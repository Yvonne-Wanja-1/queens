const pool = require("../database/db");

const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's cart
        const cartResult = await pool.query(
            "SELECT * FROM carts WHERE user_id = $1",
            [userId]
        );

        if (cartResult.rows.length === 0) {
            return res.status(400).json({
                message: "Cart is empty."
            });
        }

        const cartId = cartResult.rows[0].id;

        // Get cart items with product details
        const itemsResult = await pool.query(
            `SELECT 
                cart_items.product_id,
                cart_items.quantity,
                products.price
             FROM cart_items
             JOIN products ON cart_items.product_id = products.id
             WHERE cart_items.cart_id = $1`,
            [cartId]
        );

        if (itemsResult.rows.length === 0) {
            return res.status(400).json({
                message: "Cart is empty."
            });
        }

        // Calculate total amount
        let totalAmount = 0;

        itemsResult.rows.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // Create order
        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, total_amount)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, totalAmount]
        );

        const orderId = orderResult.rows[0].id;

        // Create order items
        for (const item of itemsResult.rows) {
            const totalPrice = item.price * item.quantity;

            await pool.query(
                `INSERT INTO order_items 
                (order_id, product_id, quantity, price, total_price)
                VALUES ($1, $2, $3, $4, $5)`,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price,
                    totalPrice
                ]
            );
        }

        // Clear cart
        await pool.query(
            "DELETE FROM cart_items WHERE cart_id = $1",
            [cartId]
        );

        res.status(201).json({
            message: "Order created successfully!",
            order: orderResult.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating order."
        });
    }
};



const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        res.status(200).json({
            message: "Orders retrieved successfully!",
            orders: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving orders."
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                orders.id,
                orders.total_amount,
                orders.status,
                orders.created_at,
                users.name AS customer_name,
                users.email AS customer_email
             FROM orders
             JOIN users ON orders.user_id = users.id
             ORDER BY orders.created_at DESC`
        );

        res.status(200).json({
            message: "All orders retrieved successfully!",
            orders: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving orders."
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Allowed statuses
        const allowedStatuses = [
            "pending",
            "paid",
            "processing",
            "ready",
            "delivered"
        ];

        // Validate status
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value."
            });
        }

        // Update order status
        const result = await pool.query(
            `UPDATE orders
             SET status = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        // Check if order exists
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Order not found."
            });
        }

        res.status(200).json({
            message: "Order status updated successfully!",
            order: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating order status."
        });
    }
};
module.exports = {
    checkout,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};