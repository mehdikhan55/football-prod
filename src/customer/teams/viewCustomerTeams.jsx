import React, { useEffect, useState } from "react";
import TeamServices from "../../services/TeamServices";
import CustomerTeamCard from "../../components/customerTeams/customerTeamCard";
import GeneralServices from "../../services/GeneralServices";
import { useTeam } from "../../context/teamContext";
import ChallengeServices from "../../services/ChallengeServices";

const ViewCustomerTeams = () => {
  const [teams, setTeams] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selfId, setSelfId] = useState(null);
  const [activeChallenges, setActiveChallenges] = useState(null);

  const { currTeam } = useTeam();

  const [grounds, setGrounds] = useState([]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await TeamServices.fetchTeamsForCustomers();
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setTeams(data.teams);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setSelfId(currTeam._id);
  }, [currTeam]);

  const fetchGrounds = async () => {
    try {
      const response = await GeneralServices.getGrounds();
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setGrounds(data.grounds); // Assuming the response structure includes grounds
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChallengeServices.fetchChallenges();
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setChallenges(data.challenges);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChallengeServices.getChallengesForTeam();
      const data = response.data;
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setActiveChallenges(data.challenges);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchGrounds();
    fetchChallenges();
    fetchActiveChallenges();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      ) : (
        <>
          {error && (
            <div
              role="alert"
              className="alert alert-error leading-tight flex justify-between py-1 w-[84%] mx-auto mb-2"
            >
              <span>{error}</span>
              <div>
                <button
                  className="btn btn-sm border-none"
                  onClick={() => setError(null)}
                >
                  x
                </button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team, index) => (
              <>
                {team._id !== selfId && (
                  <CustomerTeamCard
                    key={index}
                    team={team}
                    grounds={grounds}
                    challenges={challenges}
                    selfId={selfId}
                  />
                )}
              </>
            ))}
          </div>
        </>
      )}
      <h2 className="text-2xl font-semibold text-center mt-10">
        Challenges request sent to you
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeChallenges?.map((challenge, index) => (
          <div
            key={index}
            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {challenge.challengerTeam.teamName}
            </h2>
            <p className="text-sm mb-4">
              <strong>Players:</strong>
              <ul className="list-disc list-inside">
                {challenge.challengerTeam.players.map((player, index) => (
                  <li key={index}>{player}</li>
                ))}
              </ul>
            </p>
            <p className="text-sm mb-4">
              <strong>Ground:</strong> {challenge.ground.name}
            </p>
            <p className="text-sm mb-4">
              <strong>Date:</strong> {challenge.date}
            </p>
            <p className="text-sm mb-4">
              <strong>Time:</strong> {challenge.time}
            </p>
            <div className="flex items-center justify-center">
              <button className="flex items-center mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Accept
              </button>
              <button className="flex items-center mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      '
    </div>
  );
};

export default ViewCustomerTeams;
