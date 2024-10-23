import React from 'react';
import { FaTrophy } from 'react-icons/fa';

 const  CustomerTeamCard = ({ team }) => {
    const handleChallenge = () => {
        alert(`Challenge sent to ${team.teamName}!`);
    };

    return (
        <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{team.teamName}</h2>
            <p className="text-sm mb-4">
                <strong>Players:</strong>
                <ul className="list-disc list-inside">
                    {team.players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
            </p>
            <button
                onClick={handleChallenge}
                className="flex items-center mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                <FaTrophy className="mr-2" />
                Challenge
            </button>
        </div>
    );
};

export default CustomerTeamCard;
