const OrderService = require('../services/OrderService');


const createOrder = async (req, res) => {
    try {
        console.log('req', req.body)
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone } = req.body
        if ( !itemsPrice|| !shippingPrice|| !totalPrice|| !address|| !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Tất cả các trường đều là bắt buộc'
            });
        }

        const response = await OrderService.createOrder(req.body)
        return res.status(201).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};
const getAllOrder = async (req, res) => {
    try {    
      const data = await OrderService.getAllOrder()
        return res.status(201).json(data);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};
module.exports = {
    createOrder,
    getAllOrder
  
};
