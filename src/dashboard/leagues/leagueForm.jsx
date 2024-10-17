import React, { useState } from 'react';
import { dummyTeamsData } from '../teams/dummyTeamsData';

const LeagueForm = ({ onSubmit }) => {
    const [leagueName, setLeagueName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            onSubmit({ leagueName, startDate, endDate, teams: selectedTeams });
            resetForm();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to reset form fields
    const resetForm = () => {
        setLeagueName('');
        setStartDate('');
        setEndDate('');
        setSelectedTeams([]);
        setError(null);
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (teamId) => {
        setSelectedTeams((prevSelected) =>
            prevSelected.includes(teamId)
                ? prevSelected.filter((id) => id !== teamId) // Remove if already selected
                : [...prevSelected, teamId] // Add if not selected
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-3/4 mx-auto flex-col gap-4">
            <h1 className="text-2xl font-bold">Add a New League</h1>

            <div className="flex flex-col gap-2">
                <label className="text-gray-500">League Name</label>
                <input
                    type="text"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                    placeholder="Enter League Name"
                    required
                    className="rounded-md p-3 border border-gray-300"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-500">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="rounded-md p-3 border border-gray-300"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-500">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="rounded-md p-3 border border-gray-300"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-500">Select Teams</label>
                <div className="flex flex-col gap-2">
                    {dummyTeamsData.map((team) => (
                        <div key={team.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={team.id}
                                value={team.id}
                                checked={selectedTeams.includes(team.id)}
                                onChange={() => handleCheckboxChange(team.id)}
                                className="mr-2"
                            />
                            <label htmlFor={team.id} className="text-gray-700">
                                {team.teamName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
            className={`btn btn-primary mt-5 w-full max-sm:w-full text-white rounded-full ${
              loading ? "cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {loading && <span className="loading loading-spinner"></span>}
            {loading ? "Creating League..." : "Create League"}
          </button>
        </form>
    );
};

export default LeagueForm;
