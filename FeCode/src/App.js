import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonstring } from './untils';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { getDetailsUser } from "./services/UserService";
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Di chuyển useState vào trong component
  const user = useSelector((state) => state.user);

  // Hàm để lấy và decode token
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = null;
    if (storageData && isJsonstring(storageData)) {
      try {
        storageData = JSON.parse(storageData); // Parse JSON
        decoded = jwtDecode(storageData);
      } catch (error) {
        console.error("Lỗi khi decode token:", error);
      }
    }
    return { storageData, decoded };
  };

  useEffect(() => {
    setIsLoading(true);  // Đặt trạng thái là true khi bắt đầu
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    } else {
      setIsLoading(false);  // Nếu không có user hoặc token, tắt loading
    }
  }, []);  // useEffect chỉ chạy một lần khi component mount

  // Hàm để lấy thông tin chi tiết người dùng
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    } finally {
      setIsLoading(false);  // Sau khi lấy dữ liệu, tắt loading
    }
  };

  // Interceptor để tự động làm mới token khi hết hạn
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin; // Kiểm tra quyền truy cập
              if (!isCheckAuth) return null; // Nếu không có quyền truy cập, không render route

              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
