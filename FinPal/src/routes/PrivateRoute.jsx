import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import PrivateLayout from "../Layouts/ProtectedLayouts/PrivateLayout";
import { Dashboard } from "../pages/Protected/Dashboard";
import { DreamBud } from "../pages/Protected/DreamBud";
import { Settings } from "../pages/Protected/Settings";
import { SpendSense } from "../pages/Protected/SpendSense";
import { Trek } from "../pages/Protected/Trek";
export const PrivateRoutes = 
{
  element: <PrivateLayout />,   // parent layout defined once
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/dreambud", element: <DreamBud /> },
    { path: "/spendsense", element: <SpendSense /> },
    { path: "/settings", element: <Settings /> },
    { path: "/trek", element: <Trek /> },
  ]
}
