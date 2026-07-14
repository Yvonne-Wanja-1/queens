const products = [];

const getAllProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
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

const updateProduct = (req, res) => {
    const id = req.params.id;

    products[id] = req.body;

    res.json({
        message: "Product updated successfully!",
        product: products[id],
    });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;

    products.splice(id, 1);

    res.json({
        message: "Product deleted successfully!",
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};