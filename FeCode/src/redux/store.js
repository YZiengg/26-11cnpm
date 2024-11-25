import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide.js'; // Sử dụng import default
import userReducer from './slides/userSlide.js'; // Sử dụng import default
import orderReducer from './slides/orderSlide.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist cho Redux
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product', 'user'], // Không persist 'product' và 'user' reducer
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

// Tạo persistedReducer với cấu hình persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình Redux store
export const store = configureStore({
  reducer: persistedReducer, // Sử dụng persisted reducer đã cấu hình
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Bỏ qua các lỗi về serializable khi persist
      },
    }),
});

// Tạo persistor để theo dõi trạng thái persist
export let persistor = persistStore(store);
