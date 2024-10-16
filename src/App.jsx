import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";

import Home from "./home/page";
import Login from "./auth/login";

import Register from "./customer/register";
import LoginCustomer from "./customer/customerlogin";
import Ground from "./dashboard/ground/ground";
import Booking from "./dashboard/booking/booking";
import CustomerBooking from "./customer/customerBooking";
import Users from "./dashboard/users/users";
import Emails from "./dashboard/emails/emails";
import Teams from "./dashboard/teams/teams";
import MainDashboard from "./dashboard/statistics/stats";
import LeaveReview from "./home/leavereview";
import Challenges from "./dashboard/challenges/challenges";
import ContactUs from "./home/contact-us/ContactUs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="admin">
            <Route path="" element={<Navigate to="/admin/dashboard" />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard">
              <Route path="" element={<MainDashboard />} />
              <Route path="ground" element={<Ground />} />
              <Route path="booking" element={<Booking />} />
              <Route path="users" element={<Users />} />
              <Route path="emails" element={<Emails />} />
              <Route path="teams" element={<Teams />} />
              <Route path="challenges" element={<Challenges />} />
            </Route>
          </Route>
          <Route path="customer">
            <Route path="" element={<Navigate to="/" />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<LoginCustomer />} />
            <Route path="booking" element={<CustomerBooking />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
