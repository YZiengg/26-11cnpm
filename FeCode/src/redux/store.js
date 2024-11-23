import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide.js'; // Sử dụng import default
import userReducer from './slides/userSlide.js'; // Sử dụng import default


export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
});