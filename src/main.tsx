import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApiSlice } from "./features/api/productsApiSlice";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ApiProvider api={productsApiSlice}>
        <RouterProvider router={router} />
      </ApiProvider>
    </HelmetProvider>
  </React.StrictMode>
);
