import React, { useState } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import { BiUser } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { RiFootballFill } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { MdStadium } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BiCricketBall } from "react-icons/bi";

// <div
// className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
// style={{ background: "#208ce4" }}
// >
// <div
//   className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
//   style={{ bottom: "-30%", right: "-5%" }}
// ></div>

// <div>
//   <p className="text-white text-xl">Number of Products</p>
//   <p className="text-3xl font-semibold text-white">
//     {products.length}
//   </p>
// </div>
// <div>
//   <FiShoppingBag size={50} className="w-10 rounded-full text-white" />
// </div>
// </div>

const Card = ({ icon, title, value, color }) => {
  return (
    <div
      className="relative flex w-full p-5 rounded-lg shadow-md  gap-5 h-36 justify-between card"
      style={{ background: color }}
    >
      <div
        className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
        style={{ bottom: "-30%", right: "-5%" }}
      ></div>

      <div>
        <div>{icon}</div>
        <p className="text-white text-xl">{title}</p>
        <p className="text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(15);
  const [totalNumberOfTeams, setTotalNumberOfTeams] = useState(3);
  const [totalNumberOfMatches, setTotalNumberOfMatches] = useState(5);
  const [totalNumberOfEmails, setTotalNumberOfEmails] = useState(15);
  const [totalCancelledMatches, setTotalCancelledMatches] = useState(2);
  const [totalCricketMatches, setTotalCricketMatches] = useState(2);
  const [totalFootballMatches, setTotalFootballMatches] = useState(3);
  const [totalCricketTeams, setTotalCricketTeams] = useState(2);

  return (
    <div className="p-5 h-screen lg:p-20">
      <AdminSiderbar />

      <div className="p-5 w-full">
        <h1 className="text-2xl font-bold mb-2">
          Welcome to the{" "}
          <span className="text-secondary">Dream Arena Dashboard!</span>
        </h1>
        <p className="text-md mb-5">
          Following are the statistics of the Dream Arena
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={<BiUser size={50} className="w-10 rounded-full text-white" />}
            title="Number of Users"
            value={totalNumberOfUsers}
            color="#208ce4"
          />

          <Card
            icon={
              <CiCalendar size={50} className="w-10 rounded-full text-white" />
            }
            title="Number of Emails"
            value={totalNumberOfEmails}
            color="#5b5b5b"
          />
          <Card
            icon={
              <RiFootballFill
                size={50}
                className="w-10 rounded-full text-white"
              />
            }
            title="Number of Matches"
            value={totalNumberOfMatches}
            color="#f55252"
          />
          <Card
            icon={
              <MdEmail size={50} className="w-10 rounded-full text-white" />
            }
            title="Cancelled Matches"
            value={totalCancelledMatches}
            color="#b5b5b5"
          />
          <Card
            icon={
              <BiCricketBall
                size={50}
                className="w-10 rounded-full text-white"
              />
            }
            title="Cricket Matches"
            value={totalCricketMatches}
            color="#f55252"
          />
          <Card
            icon={
              <RiFootballFill
                size={50}
                className="w-10 rounded-full text-white"
              />
            }
            title="Football Matches"
            value={totalFootballMatches}
            color="#f55252"
          />
          <Card
            icon={
              <AiOutlineTeam
                size={50}
                className="w-10 rounded-full text-white"
              />
            }
            title="Cricket Teams"
            value={totalCricketTeams}
            color="#f7c744"
          />
          <Card
            icon={
              <FaUserFriends
                size={50}
                className="w-10 rounded-full text-white"
              />
            }
            title="Football Teams"
            value={totalNumberOfTeams}
            color="#f7c744"
          />
        </div>
      </div>
      <div className="p-5 w-full">
        <h1 className="text-2xl font-bold mb-2">Analysis</h1>
        <p className="text-md mb-5">
          Following are the analysis of the Dream Arena
        </p>

        <p className="text-md mb-5 text-gray-700 p-5 border-2 rounded-2xl shadow">
          In the last 30 days, the number of users has increased by 10%. The
          number of matches has increased by 5%. The number of emails has
          increased by 10%. The number of cricket matches has increased by 10%.
          The number of football matches has increased by 5%. The number of
          cricket teams has increased by 10%. The number of football teams has
          increased by 5%.

          <br />
          <br />

          The total number of users is 15. The total number of teams is 3. The
          total number of matches is 5. The total number of emails is 15. The
          total number of cancelled matches is 2. The total number of cricket
          matches is 2. The total number of football matches is 3. The total
          number of cricket teams is 2. The total number of football teams is 3.
        </p>
      </div>
    </div>
  );
};

export default MainDashboard;
