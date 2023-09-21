import React, { useState } from 'react';
import './App.css';
import HomePage from './views/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/:modalId?",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
