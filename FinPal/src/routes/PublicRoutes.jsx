import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import LandingPage from "../pages/PublicPages/Landing-Page"
import Login from "../pages/PublicPages/Login"
import Signup from "../pages/PublicPages/Signup"

export const PublicRoutes = 
   {
  element: <PublicLayout />,   // parent layout defined once
  children: [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup/> },
  ]
}
  

 
