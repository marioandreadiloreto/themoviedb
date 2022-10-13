import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviesList from "../movies-list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MoviesList />,
  },

]);

const Application = () => (
  <RouterProvider router={router} />
);

export default Application;
