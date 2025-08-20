import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import LandingPage from "../pages/PublicPages/Landing-Page"
import Login from "../pages/PublicPages/Login"
import Signup from "../pages/PublicPages/Signup"

export const PublicRoutes = 
 [
          {path:"/",
          element:( <PublicLayout>
              <LandingPage />
            </PublicLayout>),
           
          },
        
       { 
          path: "/login",
          element:( <PublicLayout>
              <Login/>
            </PublicLayout>),
          },
     {
          path:"/signup",
          element:( <PublicLayout>
              <Signup/>
            </PublicLayout>),
           
          }
 
      
  ]
