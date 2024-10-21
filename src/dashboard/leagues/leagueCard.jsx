import React from 'react';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const LeagueCard = ({ league, onEdit, onDelete }) => {
    const handleEditClick = () => {
        onEdit(league);
    };

    const handleDeleteClick = () => {
        onDelete(league._id);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {league.leagueName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-600">
                <div className="flex justify-between">
                    <strong>Start Date:</strong>
                    <span>{new Date(league.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <strong>End Date:</strong>
                    <span>{new Date(league.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <strong>Teams:</strong>
                    <div className="flex flex-wrap">
                        {league.teams.map((team, index) => (
                            <span key={team._id}>
                                {team.teamName}
                                {index < league.teams.length - 1 && ", "}
                            </span>
                        ))}

                    </div>

                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    className="mt-4 bg-primary text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
                    onClick={handleEditClick}
                >
                    <AiFillEdit className="mr-2" />
                    <p>Edit</p>
                </button>
                <button
                    className="mt-4 bg-red-500 text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
                    onClick={handleDeleteClick}
                >
                    <AiFillDelete className="mr-2" />
                    <p>Delete</p>
                </button>
                <Link to={`/admin/dashboard/leagues/${league._id}`} >
                <button
                    className="mt-4 bg-blue-500 text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
                >
                    <AiFillEye className="mr-2" />
                    <p>View Details</p>
                </button>
                </Link>
            </div>
        </div>
    );
};

export default LeagueCard;
