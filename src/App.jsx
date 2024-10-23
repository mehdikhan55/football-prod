import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import AdminLeagues from "./dashboard/leagues/adminLeagues";
import CustomerLeagues from "./customer/leagues/customerLeagues";
import LeagueDetails from "./customer/leagues/leagueDetails";
import { Toaster } from "react-hot-toast";
import AdminLeagueDetails from "./dashboard/leagues/AdminLeagueDetails";
import { useUser } from "./context/userContext";
import CustomerTeams from "./customer/teams/customerTeams";
import TeamLogin from "./customer/teams/teamAuth/teamLogin";
import TeamRegister from "./customer/teams/teamAuth/teamRegister";

const App = () => {
  const { fetchingCustomer, errorFetchingCustomer } = useUser();

  if (fetchingCustomer) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Routes */}
          <Route path="admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="admin/dashboard" element={<MainDashboard />} />
          <Route path="admin/dashboard/ground" element={<Ground />} />
          <Route path="admin/dashboard/booking" element={<Booking />} />
          <Route path="admin/dashboard/users" element={<Users />} />
          <Route path="admin/dashboard/emails" element={<Emails />} />
          <Route path="admin/dashboard/teams" element={<Teams />} />
          <Route path="admin/dashboard/challenges" element={<Challenges />} />
          <Route path="admin/dashboard/leagues" element={<AdminLeagues />} />
          <Route path="admin/dashboard/leagues/:id" element={<AdminLeagueDetails />} />

          {/* Customer Routes */}
          <Route path="customer" element={<Navigate to="/" />} />
          <Route path="customer/register" element={<Register />} />
          <Route path="customer/login" element={<LoginCustomer />} />
          <Route path="customer/booking" element={<CustomerBooking />} />
          <Route path="/teams" element={<CustomerTeams />} />
          <Route path="/teams/login" element={<TeamLogin />} />
          <Route path="/teams/register" element={<TeamRegister />} />


          {/* League Routes */}
          <Route path="customer/leagues" element={<CustomerLeagues />} />
          <Route path="customer/leagues/:id" element={<LeagueDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
