import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import PrivateLayout from "../Layouts/ProtectedLayouts/PrivateLayout";
import { Dashboard } from "../pages/Protected/Dashboard";
import { DreamBud } from "../pages/Protected/DreamBud";
import { Settings } from "../pages/Protected/Settings";
import { SpendSense } from "../pages/Protected/SpendSense";
import { Trek } from "../pages/Protected/Trek";
export const PrivateRoutes = 
[
    
          {path:"/dashboard",
          element:(
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          ),
      },

      {
          path:"/dreambud",
          element:(
            <PrivateLayout>
              <DreamBud />
            </PrivateLayout>
          ),
      },

      {
          path:"/spendSense",
          element:(
            <PrivateLayout>
              <SpendSense />
            </PrivateLayout>
          ),
          },
       {
          path:"/settings",
          element:(
            <PrivateLayout>
              <Settings />
            </PrivateLayout>
         ),
        },
       {
          path:"/trek",
          element:( <PrivateLayout>
              <Trek />
            </PrivateLayout>)
           
          
        }
        ]

