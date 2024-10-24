import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import ViewCustomerTeams from "./viewCustomerTeams";
import { useTeam } from "../../context/teamContext";
import { Link } from "react-router-dom";

const CustomerTeams = () => {
  const { currTeam } = useTeam();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="p-10 max-sm:p-5 mt-10">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
          Football Teams
        </h1>
        {currTeam ? (
          <div className="flex flex-col">
            <p className="text-center mb-10">
              <strong>Logged In: </strong>
              {currTeam.teamName}
            </p>

            <ViewCustomerTeams />
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-center font-bold">You are not logged in...</p>
            <p className="text-center">Take actions</p>
            <div className="flex items-center justify-center gap-2">
              <Link to={"/teams/login"}>
                <button className="btn btn-secondary py-0 mt-1 hover:bg-primary hover:text-black">
                  Login As Team
                </button>
              </Link>

              <Link to={"/teams/register"}>
                <button className="btn btn-secondary py-0 mt-1 hover:bg-primary hover:text-black">
                  Register Team
                </button>
              </Link>
            </div>
          </div>
        )}
        {/* <ViewCustomerTeams  /> */}
      </div>
    </div>
  );
};

export default CustomerTeams;
