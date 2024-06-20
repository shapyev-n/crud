import {} from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import ListProduct from "../components/products/ListProduct";
import LoginAdmin from "../autentication/LoginAdmin";
import LoginClient from "../autentication/LoginClient";
import Register from "../autentication/Register";
import DetailsPage from "../pages/DetailsPage";
import CardBasket from "../components/card/CardBasket";

const MainRoutes = () => {
  const privat = [
    {
      path: "/admin",
      element: <AdminPage />,
      id: Date.now(),
    },
    {
      path: "/edit/:id",
      element: <EditPage />,
      id: Date.now(),
    },
  ];
  const routes = [
    {
      path: "*",
      element: <NotFoundPage />,
      id: Date.now(),
    },
    {
      path: "/",
      element: <HomePage />,
      id: Date.now(),
    },
    {
      path: "/list",
      element: <ListProduct />,
      id: Date.now(),
    },
    {
      path: "/loginAdmin",
      element: <LoginAdmin />,
      id: Date.now(),
    },
    {
      path: "/loginClient",
      element: <LoginClient />,
      id: Date.now(),
    },
    {
      path: "/register",
      element: <Register />,
      id: Date.now(),
    },
    {
      path: "/details/:id",
      element: <DetailsPage />,
      id: Date.now(),
    },
    {
      path: "/basket",
      element: <CardBasket />,
      id: Date.now(),
    },
  ];
  return (
    <Routes>
      {privat.map((el) => (
        <Route path={el.path} element={el.element} key={el.id} />
      ))}
      {routes.map((el) => (
        <Route path={el.path} element={el.element} key={el.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
