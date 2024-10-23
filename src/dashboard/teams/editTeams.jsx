import React, { useEffect, useState } from "react";
import TeamCard from "../../components/teams/teamCard";
import { GiEmptyHourglass } from "react-icons/gi";
import EditTeamForm from "../../components/teams/editTeamForm";
import AdminSiderbar from "../../components/sidebar/sidebar";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const EditTeams = () => {
  // const [teams, setTeams] = useState(dummyTeamsData);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/teams`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log("response", response);
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setTeams(data.teams);
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleEdit = (team) => {
    console.log("Editing team:", team);
    setSelectedTeam(team);
  };

  const handleSubmit = async (updatedTeam) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${URL}/teams/${updatedTeam._id}`,
        updatedTeam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("response", response);
      if (response.status >= 400) {
        throw new Error(data.message);
      }
      setSelectedTeam(null);
      await fetchTeams();
      toast.success("Team updated successfully");
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <AdminSiderbar />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-4 pt-12 relative">
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
          {selectedTeam && (
            <div
              className="absolute top-0 left-0 border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
              onClick={() => setSelectedTeam(null)}
            >
              {"Back"}
            </div>
          )}
          {selectedTeam ? (
            <EditTeamForm teamData={selectedTeam} onSubmit={handleSubmit} />
          ) : (
            <div className="flex flex-col gap-4">
              {teams?.length > 0 ? (
                teams.map((team) => (
                  <TeamCard
                    key={team._id}
                    type="edit"
                    team={team}
                    onEdit={handleEdit}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-xl shadow-md border border-black border-dashed">
                  <GiEmptyHourglass className="text-6xl text-gray-500" />
                  <p className="text-gray-500 text-2xl">No teams found</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditTeams;
