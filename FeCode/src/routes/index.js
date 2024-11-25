import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotfoundPage/NotFoundPage"; // Đảm bảo tên tệp và thư mục là chính xác
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/product',
        page: ProductsPage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false, // Thêm dấu phẩy ở đây
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false, // Thêm dấu phẩy ở đây
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true, // Thêm dấu phẩy ở đây
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false, // Thêm dấu phẩy ở đây
        isPrivate: true
    },
    {
        path: '/*',
        page: NotFoundPage, // Thêm dấu phẩy ở đây
    },
];
