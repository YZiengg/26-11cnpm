const ProductService = require('../services/ProductService');


const createProduct = async (req, res) => {
    try {
        const { name, price, description, rating, image, type, countInStock,discount } = req.body;
        console.log('req.body', req.body)

        if (!name || !price || !description || !rating || !image || !type || !countInStock || !discount) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Tất cả các trường đều là bắt buộc'
            });
        }

        const response = await ProductService.createProduct(req.body)
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if (!productId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID product là bắt buộc'
            });
        }

        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID product là bắt buộc'
            });
        }
        const response = await ProductService.getDetailProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID sản phẩm là bắt buộc'
            });
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'Đã xảy ra lỗi khi lấy các loại sản phẩm.',
            error: e.message
        });
    }
};



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    getAllType

};
