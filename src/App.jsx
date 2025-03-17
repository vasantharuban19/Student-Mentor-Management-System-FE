import React from "react";
import AppRoutes from "./components/utils/AppRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const API_URL = "https://student-mentor-management-eh6b.onrender.com";

const APP = () => {
  const routes = createBrowserRouter(AppRoutes);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default APP;
