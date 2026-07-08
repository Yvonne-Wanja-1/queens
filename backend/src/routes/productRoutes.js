const express = require("express");

const router = express.Router();

// GET /products
router.get("/", (req, res) => {
  res.json({
    message: "List of products will appear here."
  });
});

module.exports = router;