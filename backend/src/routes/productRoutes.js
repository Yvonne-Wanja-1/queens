const express = require("express");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const authenticateToken = require("../middleware/authMiddleware");
const { getAllProducts , 
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post(
    "/",
    authenticateToken,
    authorizeAdmin,
    createProduct
);

router.put(
    "/:id",
    authenticateToken,
    authorizeAdmin,
    updateProduct
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeAdmin,
    deleteProduct
);


module.exports = router;