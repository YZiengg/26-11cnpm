const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');

const routes = (app) => {
    app.use('/api/user', UserRouter);    // Đường dẫn cho UserRouter
    app.use('/api/product', ProductRouter); // Đường dẫn cho ProductRouter
    app.use('/api/order', OrderRouter);  // Đường dẫn cho OrderRouter
};

module.exports = routes;
