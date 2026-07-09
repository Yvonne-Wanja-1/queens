const getAllProducts = (req, res) => {
  res.json({
    message: "List of products will appear here."
  });
};

const createProduct = (req, res) => {
  res.json({
    message: "Product created successfully!"
  });
};

module.exports = {
  getAllProducts,
  createProduct,
};