import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { OrderContextProvider } from "./context/OrderContext";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <OrderContextProvider>
      <RouterProvider router={router} />
    </OrderContextProvider>
  </ThemeProvider>,
);
