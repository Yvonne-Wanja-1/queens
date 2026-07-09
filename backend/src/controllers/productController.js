const getAllProducts = (req, res) => {
  res.json({
    message: "List of products will appear here."
  });
};

module.exports = {
  getAllProducts,
};