import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const TeamCard = ({ team, onEdit, onRemove, type = "edit" }) => {
  return (
    <div className="p-4 border border-gray-300 shadow-lg bg-white flex justify-between items-center rounded-lg transition-transform duration-200 hover:shadow-lg w-full">
      <div className="flex-grow">
        <h2 className="font-bold text-lg text-gray-800">{team.teamName}</h2>
        <p className="text-gray-600">Players:</p>
        <ul className="list-disc list-inside text-gray-600 pb-3">
          {team.players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => (type === "remove" ? onRemove(team.id) : onEdit(team))}
        className={`btn text-white flex items-center ${type === "remove" ? "bg-red-500 hover:bg-red-700" : "bg-primary hover:bg-secondary"}`}
      >
        {type === "remove" ? (
          <>
            <AiFillDelete className="mr-2" /> Remove
          </>
        ) : (
          <>
            <AiFillEdit className="mr-2" /> Edit
          </>
        )}
      </button>
    </div>
  );
};

export default TeamCard;
