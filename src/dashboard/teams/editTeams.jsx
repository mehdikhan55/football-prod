import React, { useState } from "react";
import TeamCard from "../../components/teams/teamCard"; 
import { dummyTeamsData } from "./dummyTeamsData"; 
import EditTeamForm from "../../components/teams/EditTeamForm"; 
import AdminSiderbar from "../../components/sidebar/sidebar";

const EditTeams = () => {
  const [teams, setTeams] = useState(dummyTeamsData);
  const [selectedTeam, setSelectedTeam] = useState(null); 

  const handleEdit = (team) => {
    console.log("Editing team:", team);
    setSelectedTeam(team);
  };

  const handleSubmit = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === updatedTeam.id ? updatedTeam : team
      )
    );
    setSelectedTeam(null); // Clear the selected team after editing
  };

  return (
    <div className="">
      <AdminSiderbar />
      <div className="flex flex-col justify-start gap-4 mt-5">
        {selectedTeam && (
          <div
            className="absolute top-0 left-0 border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
            onClick={() => setSelectedTeam(null)}
          >
            {"<Back"}
          </div>
        )}
        {selectedTeam ? (
          <EditTeamForm
            teamData={selectedTeam}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {teams.length > 0 ? (
              teams.map((team) => (
                <TeamCard key={team.id} team={team} onEdit={handleEdit} />
              ))
            ) : (
              <p className="text-gray-500">No teams available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTeams;
