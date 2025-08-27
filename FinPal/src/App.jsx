import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PublicRoutes} from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoute";
import PublicLayout from "./Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "./Layouts/ProtectedLayouts/PrivateLayout";
import { Notfound } from "./Layouts/PublicLayout/notfound";
function App() {
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
        {/* Private Routes wrapped once in PrivateLayout */}
        <Route element={<PrivateLayout />}>
          {PrivateRoutes.children.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        {/* Fallback for 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
