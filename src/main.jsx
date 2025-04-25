import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminRoute from './Component/Auth/AdminRoute.jsx';
import Layout from './Layout/Layout.jsx';
import Home from './Component/Home.jsx';
import Search from './Component/Search.jsx';
import NewArrival from './Component/NewArrival.jsx';
import Allprooduct from './Component/Allprooduct.jsx';
import CartPage from './page/Cartpage.jsx';
import Login from './Component/Auth/Login.jsx';
import SignUp from './Component/Auth/SignUp.jsx';
import UserDashboard from './Component/User/UserDashboard.jsx';
import Admin from './page/Admin.jsx';
import store from './Redux/Store.js';
import LoadingSpinner from './Component/Auth/LoadingSpinner.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "newArrival",
        element: <NewArrival />,
      },
      {
        path: "AllProduct",
        element: (
          <AdminRoute fallback={<LoadingSpinner />}>
            <Allprooduct />
          </AdminRoute>
        ),
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute fallback={<LoadingSpinner />}>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "userDashBoard",
        element: <UserDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);