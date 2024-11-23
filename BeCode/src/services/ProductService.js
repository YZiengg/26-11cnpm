const Product=require ("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock,rating,description } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name:name
            })
            if(checkProduct !== null) {
                resolve({
                    status: "OK",
                    message:"name of product is invalid"
                })
            }
                const newProduct = await Product.create({
                    name, 
                    image,
                    type,
                    price,
                    countInStock,
                    rating,
                    description
            });
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct,
                });
            } else {
                resolve({ status: 'ERR', message: 'Failed to create user.' });
            }
         } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id:id
            })
            if(checkProduct==null){
                resolve({
                    status:"OK",
                    message:'the product is not defined'
                })
            }
            const updatedPoduct = await Product.findByIdAndUpdate(id, data, {new: true})
            console.log('updatedPoduct', updatedPoduct)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data:updatedPoduct
                });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id:id
            })
            if(checkProduct===null){
                resolve({
                    status:"OK",
                    message:'the product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'delete successfully',
                });
        } catch (e) {
            reject(e);
        }
    });
};


const getAllProduct = (limit, page, sort, filter) => {
    const pageCurrent = Math.max(1, Number(page));  // Đảm bảo page >= 1
    const limitValue = Math.max(1, Number(limit));  // Đảm bảo limit >= 1
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();

            if (filter) {
                const label = filter[0];
                console.log('label', label);
                const allObjectFilter = await Product
                    .find({ [label]: { '$regex': filter[1] } })
                    .limit(limitValue)
                    .skip(Math.max(0, (pageCurrent - 1) * limitValue));  // Đảm bảo skip không âm

                resolve({
                    status: 'ok',
                    message: 'success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent,
                    totalPage: Math.ceil(totalProduct / limitValue),
                });
            } 
            else if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                console.log('objectSort', objectSort);

                const allProductSort = await Product
                    .find()
                    .limit(limitValue)
                    .skip(Math.max(0, (pageCurrent - 1) * limitValue))  // Đảm bảo skip không âm
                    .sort(objectSort);

                resolve({
                    status: 'ok',
                    message: 'success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent,
                    totalPage: Math.ceil(totalProduct / limitValue),
                });
            } else {
                const allProduct = await Product
                    .find()
                    .limit(limitValue)
                    .skip(Math.max(0, (pageCurrent - 1) * limitValue));  // Đảm bảo skip không âm

                resolve({
                    status: 'ok',
                    message: 'success',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent,
                    totalPage: Math.ceil(totalProduct / limitValue),
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};






const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id:id
            })
            if(product===null){
                resolve({
                    status:"OK",
                    message:'the product is not defined'
                })
            }
                resolve({
                    status: 'OK',
                    message: 'get product',
                    data: product
                });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
    
};
