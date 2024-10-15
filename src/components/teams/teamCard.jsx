import React from 'react';

const TeamCard = ({ team, onEdit }) => {
  return (
    <div className="p-4 border border-gray-300 shadow-lg bg-white flex flex-col rounded-lg transition-transform duration-200 hover:shadow-lg w-full">
      <h2 className="font-bold text-lg text-gray-800">{team.teamName}</h2>
      <p className="text-gray-600">Players:</p>
      <ul className="list-disc list-inside text-gray-600">
        {team.players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <button
        onClick={() => onEdit(team)}
        className="mt-4 btn btn-primary text-white rounded-full"
      >
        Edit
      </button>
    </div>
  );
};

export default TeamCard;
