const Order=require ("../models/OrderModel")
const bcrypt =require("bcrypt");

const createOrder = (newOrder) => {

    return new Promise(async (resolve, reject) => {
        console.log('newOrder', newOrder)
        const { orderItems,paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone,user  } = newOrder

        try {
                    const createOrder = await Order.create({
                    orderItems,
                    shippingAddress:{fullName,address,phone},
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user:user,
            });
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder,
                });
            } else {
                resolve({ status: 'ERR', message: 'Failed to create user.' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find()
                resolve({
                    status: 'OK',
                    message: 'successfully',
                    data: allOrder
                });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    createOrder, 
  getAllOrder
};
