
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Định nghĩa các route cho Order

// 1. Tạo đơn hàng mới
router.post('/', OrderController.createOrder);

// 2. Cập nhật đơn hàng theo ID
router.put('/:id', OrderController.updateOrder);

// 3. Lấy chi tiết đơn hàng theo ID
router.get('/:id', OrderController.getDetailOrder);

// 4. Xóa đơn hàng theo ID
router.delete('/:id', OrderController.deleteOrder);

// 5. Lấy tất cả đơn hàng với các tùy chọn query (limit, page, sort, filter)
router.get('/', OrderController.getAllOrders);

module.exports = router;
