import { createHashRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import ErrorPage from './pages/error.jsx';

import ProductPage from './pages/products.jsx';
import DetailProductPage from './pages/detailProduct.jsx';

const isLogin = localStorage.getItem('token') ? true : false;
export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/products"/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: isLogin ? <Navigate to="/products"/> : <LoginPage />,
  },
  {
    path: "/register",
    element: isLogin ? <Navigate to="/products"/> : <RegisterPage />,
  },
  {
    path: "/products",
    element: isLogin ? <ProductPage /> : <Navigate to="/login"/>,
  },
  {
    path: "/products/:id",
    element: isLogin ? <DetailProductPage /> : <Navigate to="/login"/>,
  }
]);