import React from "react";
import ReactDom from 'react-dom/client';
import './index.css';
import App from "./App";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store'; // Đảm bảo đúng đường dẫn đến store
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDom.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <App />
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
