import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./home/page";
import Login from "./auth/login";
import Ground from "./dashboard/ground/ground";

import Register from "./customer/register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="admin">
            <Route path="login" element={<Login />} />
            <Route path="ground" element={<Ground />} />
          </Route>
          <Route path="customer">
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
