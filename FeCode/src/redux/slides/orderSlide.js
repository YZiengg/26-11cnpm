import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);

            if (itemOrder) {
                itemOrder.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemsSelected.find((item) => item.product === idProduct);
        
            if (itemOrder) {
                itemOrder.amount++;  // Tăng số lượng trong orderItems
            }
        
            if (itemOrderSelected) {
                itemOrderSelected.amount++;  // Tăng số lượng trong orderItemsSelected
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemsSelected.find((item) => item.product === idProduct);
        
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;  // Giảm số lượng trong orderItems
            }
        
            if (itemOrderSelected && itemOrderSelected.amount > 1) {
                itemOrderSelected.amount--;  // Giảm số lượng trong orderItemsSelected
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
            state.orderItemsSelected = state.orderItemsSelected.filter((item) => item.product !== idProduct);
        },

        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            state.orderItemsSelected = state.orderItems.filter((order) =>
                listChecked.includes(order.product)
            );
        },

        // Thêm action để xóa tất cả sản phẩm
        removeAllOrderProduct: (state) => {
            state.orderItems = []; // Xóa tất cả sản phẩm trong orderItems
            state.orderItemsSelected = []; // Xóa tất cả sản phẩm trong orderItemsSelected
        },
    },
});

export const { 
    addOrderProduct, 
    increaseAmount, 
    decreaseAmount, 
    removeOrderProduct, 
    selectedOrder, 
    removeAllOrderProduct // Xuất action removeAllOrderProduct
} = orderSlide.actions;

export default orderSlide.reducer;
