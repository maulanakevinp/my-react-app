import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Navbar from './components/Layouts/Navbar.jsx';
import DarkModeProvider from './context/DarkMode.jsx';
import { TotalPriceProvider } from './context/TotalPriceContext.jsx';
import { router } from './router.jsx';

const isLogin = localStorage.getItem('token') ? true : false;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <TotalPriceProvider>
          {isLogin && <Navbar />}
          <RouterProvider router={router}/>
        </TotalPriceProvider>
      </DarkModeProvider>
    </Provider>
  </StrictMode>,
)
