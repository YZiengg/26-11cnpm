const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const { userId, products, totalPrice, status, shippingAddress, paymentMethod } = req.body;
        console.log('req.body', req.body);

        if (!userId || !products || !totalPrice || !status || !shippingAddress || !paymentMethod) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Tất cả các trường đều là bắt buộc'
            });
        }

        const response = await OrderService.createOrder(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;

        if (!orderId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID đơn hàng là bắt buộc'
            });
        }

        const response = await OrderService.updateOrder(orderId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID đơn hàng là bắt buộc'
            });
        }

        const response = await OrderService.getDetailOrder(orderId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID đơn hàng là bắt buộc'
            });
        }

        const response = await OrderService.deleteOrder(orderId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await OrderService.getAllOrders(Number(limit) || 8, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getDetailOrder,
    deleteOrder,
    getAllOrders
};
