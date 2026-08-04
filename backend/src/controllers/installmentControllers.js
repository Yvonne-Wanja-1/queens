const pool = require("../database/db");

const createInstallmentPayment = async (req, res) => {
    try {
        const { order_id, amount_paid, payment_method, notes } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!order_id || !amount_paid || amount_paid <= 0) {
            return res.status(400).json({
                message: "Order ID and valid amount are required."
            });
        }

        // Get order
        const orderResult = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [order_id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                message: "Order not found."
            });
        }

        const order = orderResult.rows[0];

        // Ensure customer owns the order
        if (order.user_id !== userId) {
            return res.status(403).json({
                message: "You can only pay for your own orders."
            });
        }

        // Calculate total already paid
        const paidResult = await pool.query(
            "SELECT COALESCE(SUM(amount_paid), 0) AS total_paid FROM installment_payments WHERE order_id = $1",
            [order_id]
        );

        const totalPaid = parseFloat(paidResult.rows[0].total_paid);
        const remainingBalance = parseFloat(order.total_amount) - totalPaid;

        // Prevent overpayment
        if (amount_paid > remainingBalance) {
            return res.status(400).json({
                message: `Payment exceeds remaining balance of KES ${remainingBalance}`
            });
        }

        // Create payment
        const paymentResult = await pool.query(
            `INSERT INTO installment_payments 
            (order_id, amount_paid, payment_method, notes)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [order_id, amount_paid, payment_method, notes]
        );

        // Calculate new total paid
        const newTotalPaid = totalPaid + parseFloat(amount_paid);
        const newRemainingBalance = parseFloat(order.total_amount) - newTotalPaid;

        // Update order status if fully paid
        if (newRemainingBalance <= 0) {
            await pool.query(
                "UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
                [order_id]
            );
        }

        res.status(201).json({
            message: "Installment payment recorded successfully!",
            payment: paymentResult.rows[0],
            total_paid: newTotalPaid,
            remaining_balance: newRemainingBalance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error recording installment payment."
        });
    }
};

const getOrderPayments = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // Get order
        const orderResult = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [orderId]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                message: "Order not found."
            });
        }

        const order = orderResult.rows[0];

        // Ensure customer owns the order
        if (order.user_id !== userId) {
            return res.status(403).json({
                message: "You can only view payments for your own orders."
            });
        }

        // Get payments
        const paymentsResult = await pool.query(
            "SELECT * FROM installment_payments WHERE order_id = $1 ORDER BY payment_date ASC",
            [orderId]
        );

        // Calculate totals
        const paidResult = await pool.query(
            "SELECT COALESCE(SUM(amount_paid), 0) AS total_paid FROM installment_payments WHERE order_id = $1",
            [orderId]
        );

        const totalPaid = parseFloat(paidResult.rows[0].total_paid);
        const remainingBalance = parseFloat(order.total_amount) - totalPaid;

        res.status(200).json({
            message: "Installment payments retrieved successfully!",
            order_id: order.id,
            order_total: order.total_amount,
            total_paid: totalPaid,
            remaining_balance: remainingBalance,
            payments: paymentsResult.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving installment payments."
        });
    }
};

module.exports = {
    createInstallmentPayment,
    getOrderPayments,
};