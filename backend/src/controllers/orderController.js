const checkout = async (req, res) => {
    try {
       const userId = req.user.id;
const { promoCode } = req.body;

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

// Apply promo code if provided
if (promoCode) {

    const promoResult = await pool.query(
        `SELECT *
         FROM promo_codes
         WHERE code = $1
         AND is_active = TRUE
         AND expiry_date >= CURRENT_DATE`,
        [promoCode]
    );

    if (promoResult.rows.length === 0) {
        return res.status(400).json({
            message: "Invalid or expired promo code."
        });
    }

    const discount =
        promoResult.rows[0].discount_percentage;

    totalAmount =
        totalAmount - (totalAmount * discount / 100);
}

        // Create order
        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, total_amount)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, totalAmount]
        );

        const orderId = orderResult.rows[0].id;

        // Create order items and reduce stock
        for (const item of itemsResult.rows) {
            const totalPrice = item.price * item.quantity;

            // Save order item
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

            // Reduce product stock
            await pool.query(
                `UPDATE products
                 SET quantity = quantity - $1
                 WHERE id = $2`,
                [
                    item.quantity,
                    item.product_id
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