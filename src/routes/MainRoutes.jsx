import {} from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import ListProduct from "../components/products/ListProduct";
import Register from "../autentication/Register";
import DetailsPage from "../pages/DetailsPage";
import CardBasket from "../components/card/CardBasket";
import Login from "../autentication/Login";
import { useAuth } from "../context/AuthContext";
import { ADMIN } from "../helpers/const";
import AboutPage from "../pages/AboutPage";
import Message from "../components/Message";

const MainRoutes = () => {
  const { user } = useAuth();

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
      path: "/login",
      element: <Login />,
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
    {
      path: "/about",
      element: <AboutPage />,
      id: Date.now(),
    },
    {
      path: "/message",
      element: <Message />,
      id: Date.now(),
    },
  ];
  return (
    <Routes>
      {user
        ? ADMIN.map((el) =>
            user.email === el.email
              ? privat.map((item) => (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.id}
                  />
                ))
              : null
          )
        : null}
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
