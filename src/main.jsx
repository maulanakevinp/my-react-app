import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import ErrorPage from './pages/error.jsx';
import DetailProductPage from './pages/detailProduct.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Navbar from './components/Layouts/Navbar.jsx';
import DarkModeProvider from './context/DarkMode.jsx';
import { TotalPriceProvider } from './context/TotalPriceCOntext.jsx';
import ProductPage from './Pages/products.jsx';

const isLogin = localStorage.getItem('token') ? true : false;
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <TotalPriceProvider>
          {isLogin && <Navbar />}
          <RouterProvider router={router} />
        </TotalPriceProvider>
      </DarkModeProvider>
    </Provider>
  </StrictMode>,
)
