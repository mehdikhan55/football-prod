import React, { useState, useEffect } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import TeamCard from "../../components/teams/teamCard";
import { GiEmptyHourglass } from "react-icons/gi";
import axios from "axios";
import TeamServices from "../../services/TeamServices";

const URL = import.meta.env.VITE_BACKEND_URL;

const ViewTeams = () => {
  // const [teams, setTeams] = useState(dummyTeamsData); // Use the dummy teams data
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await TeamServices.fetchTeams(); // Use the fetchTeams function from TeamServices
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setTeams(data.teams);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleRemove = async (teamId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await TeamServices.removeTeam(teamId); // Use the removeTeam function from TeamServices
      if (response.status >= 400) {
        throw new Error(response.data.message);
      }
      await fetchTeams();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-2 pb-16">
      <AdminSiderbar />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-4 w-full pt-5">
          {error && (
            <div
              role="alert"
              className="alert alert-error leading-tight flex justify-between  py-1 w-full mx-auto"
            >
              <span>{error}</span>
              <div>
                <button
                  className="btn btn-sm border-none "
                  onClick={() => setError(null)}
                >
                  x
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {teams.length > 0 ? (
              teams.map((team) => (
                <TeamCard
                  key={team._id}
                  team={team}
                  onRemove={handleRemove} // Pass the handleRemove function
                  type="remove"
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-xl shadow-md border border-black border-dashed">
                <GiEmptyHourglass className="text-6xl text-gray-500" />
                <p className="text-gray-500 text-2xl">No teams found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeams;
