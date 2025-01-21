import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom';
import LoginPage from './Pages/login.jsx';
import RegisterPage from './Pages/register.jsx';
import ErrorPage from './Pages/error.jsx';
import ProductPage from './Pages/products.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: localStorage.getItem('token') ? <Navigate to="/products"/> :  <LoginPage />,
  },
  {
    path: "/register",
    element: localStorage.getItem('token') ? <Navigate to="/products"/> :  <RegisterPage />,
  },
  {
    path: "/products",
    element: localStorage.getItem("token") ? <ProductPage /> : <Navigate to="/login" />,
  }
]);

export const navigate = useNavigate();