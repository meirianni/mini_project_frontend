import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/crud";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
