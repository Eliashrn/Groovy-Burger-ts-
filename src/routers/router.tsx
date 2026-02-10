import { createBrowserRouter } from "react-router-dom";
//@ts-ignore
import LoginPage from "../components/pages/login/LoginPage";
//@ts-ignore
import OrderPage from "../components/pages/order/OrderPage";
//@ts-ignore
import ErrorPage from "../components/pages/error/ErrorPage";

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/order/:username",
    element: <OrderPage />,
  },
  {
    path: "*", // "catch-all" route
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
