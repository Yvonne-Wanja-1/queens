const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

const {
    getLowStockProducts,
    restockProduct,
} = require("../controllers/inventoryController");

const router = express.Router();

router.get(
    "/low-stock",
    authenticateToken,
    authorizeAdmin,
    getLowStockProducts
);

router.put(
    "/restock/:id",
    authenticateToken,
    authorizeAdmin,
    restockProduct
);

module.exports = router;