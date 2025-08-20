import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {PrivateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
