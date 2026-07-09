const products = [];
const getAllProducts = (req, res) => {
       const id = req.params.id;

    res.json(products[id]);
};
const createProduct = (req, res) => {
    console.log(req.body);
products.push(req.body);
    res.json({
        message: "Product created successfully!",
        product: req.body,
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
};