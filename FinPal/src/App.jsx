import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {PublicRoutes} from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoute";
import PublicLayout from "./Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "./Layouts/ProtectedLayouts/PrivateLayout";
import { Notfound } from "./Layouts/PublicLayout/notfound";
import { initFlowbite } from 'flowbite';

function App() {
   useEffect(() => {
    initFlowbite();
  }, []);
  return (
   <Router>
    
      <Routes>
        <Route element={<PublicLayout />}>
          {PublicRoutes.children.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
        
        <Route element={<PrivateLayout />}>
          {PrivateRoutes.children.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

       
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
