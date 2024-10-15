// EditTeamForm.js
import React, { useState } from "react";

const EditTeamForm = ({ teamData, onSubmit }) => {
    const [teamName, setTeamName] = useState(teamData.teamName);
    const [players, setPlayers] = useState(teamData.players);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedTeam = {
                ...teamData,
                teamName,
                players: players.filter((player) => player), // Filter out empty player names
            };
            onSubmit(updatedTeam);
            setTeamName("");
            setPlayers([""]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayerChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
    };

    const addPlayerField = () => {
        setPlayers([...players, ""]);
    };

    const removePlayerField = (index) => {
        const newPlayers = players.filter((_, i) => i !== index);
        setPlayers(newPlayers);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Edit Team</h1>
            <div className="flex flex-col gap-2">
                <label className="text-gray-500">Team Name</label>
                <input
                    required
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="rounded-md p-3 border border-gray-300"
                />
            </div>
            <h2 className="text-xl font-bold">Players</h2>
            {players.map((player, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                        className="rounded-md p-3 border border-gray-300 w-full"
                    />
                    <button
                        type="button"
                        onClick={() => removePlayerField(index)}
                        className="btn btn-secondary"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addPlayerField}
                className="btn btn-secondary w-48"
            >
                + Add Player
            </button>
            <button
                className={`btn btn-primary mt-5 w-full text-white rounded-full ${loading ? "cursor-not-allowed" : ""}`}
                type="submit"
            >
                {loading && <span className="loading loading-spinner"></span>}
                {loading ? "Updating Team..." : "Update Team"}
            </button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    );
};

export default EditTeamForm;
