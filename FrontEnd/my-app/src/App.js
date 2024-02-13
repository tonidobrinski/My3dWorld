import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import UserList from "./UserList";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import AccountPage from "./pages/Account";
import RegisterPage from "./authentication/Register";
import LoginPage from "./authentication/Login";
import CategoryPage from "./pages/Category";
import OrderPage from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, //path: ''
      { path: "/categories", element: <CategoryPage /> },
      { path: "/categories/products/:productId", element: <ProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/contact-us", element: <ContactUsPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/how-can-i-order", element: <OrderPage /> },
    ],
  },
  {
    path: "/users",
    element: <UserList />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
