import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import Dashboard from "./pages/crud";
import Katalog from "./pages/katalog";
import AuthPages from "./pages/auth";

function RequireAuth() {
  let auth = sessionStorage.getItem("logged");
  let location = useLocation();

  if (!auth) {
    // cek auth logged ada atau tidak
    // jika tidak ada maka arahkan ke login pages
    // endpoint login ===>  'baseURL/'
    return <Navigate to="/" state={{ from: location }} />;
  }

  //Renders child route's element, jika ada.
  return <Outlet />;
}
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<AuthPages />}></Route>
            <Route path="/catalog" element={<Katalog />}></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route index path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
