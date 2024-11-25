const Order = require('../models/OrderModel');

// Tạo đơn hàng mới
const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.create(newOrder);
            if (order) {
                resolve({
                    status: 'OK',
                    message: 'Order created successfully',
                    data: order,
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Failed to create order',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Cập nhật trạng thái đơn hàng (ví dụ: thay đổi trạng thái thanh toán hoặc giao hàng)
const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found',
                });
                return;
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'Order updated successfully',
                data: updatedOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy tất cả đơn hàng (có thể phân trang, sắp xếp, lọc)
const getAllOrders = (limit, page, sort) => {
    const pageCurrent = Math.max(1, Number(page));  // Đảm bảo page >= 1
    const limitValue = Math.max(1, Number(limit));  // Đảm bảo limit >= 1
    return new Promise(async (resolve, reject) => {
        try {
            const totalOrders = await Order.countDocuments();

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];

                const orders = await Order
                    .find()
                    .limit(limitValue)
                    .skip(Math.max(0, (pageCurrent - 1) * limitValue))  // Đảm bảo skip không âm
                    .sort(objectSort);

                resolve({
                    status: 'OK',
                    message: 'Orders fetched successfully',
                    data: orders,
                    total: totalOrders,
                    pageCurrent,
                    totalPage: Math.ceil(totalOrders / limitValue),
                });
            } else {
                const orders = await Order
                    .find()
                    .limit(limitValue)
                    .skip(Math.max(0, (pageCurrent - 1) * limitValue));  // Đảm bảo skip không âm

                resolve({
                    status: 'OK',
                    message: 'Orders fetched successfully',
                    data: orders,
                    total: totalOrders,
                    pageCurrent,
                    totalPage: Math.ceil(totalOrders / limitValue),
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy chi tiết một đơn hàng theo ID
const getOrderDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found',
                });
                return;
            }
            resolve({
                status: 'OK',
                message: 'Order found',
                data: order,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Xóa đơn hàng theo ID
const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found',
                });
                return;
            }
            await Order.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Order deleted successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderDetail,
    deleteOrder,
};
