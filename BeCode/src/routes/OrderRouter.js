const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// 1. Tạo đơn hàng mới
router.post('/create', OrderController.createOrder);
router.get('/get-all-order',OrderController.getAllOrder); 
module.exports = router;
