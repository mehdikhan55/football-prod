import React, { useState } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import { dummyTeamsData } from "./dummyTeamsData";
import axios from "axios";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const AddTeams = ({setActiveTab}) => {
    const [teamName, setTeamName] = useState("");
    const [players, setPlayers] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (teamName === "" || players.some((player) => player === "")) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${URL}/teams`,
                {
                    teamName, 
                    players
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log('response', response)
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            console.log('done')
            toast.success("Team created successfully");
            setActiveTab("View Teams");
        } catch (error) {
            setError(error?.response?.data?.message);
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
        <div className="flex flex-col justify-center gap-4 w-full max-sm:w-full max-md:w-2/3">
            <AdminSiderbar />
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                </div>

            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Add a New Team</h1>
                    <div className="flex flex-col gap-2">
                        {error && (
                            <div role="alert" className="alert alert-error leading-tight flex justify-between  py-1 w-full mx-auto">
                                <span>{error}</span>
                                <div>
                                    <button className="btn btn-sm border-none " onClick={() => setError(null)}>x</button>
                                </div>
                            </div>
                        )}
                        <label className="text-gray-500">Team Name</label>
                        <input
                            required
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="e.g. Team A"
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
                                placeholder={`Player ${index + 1}`}
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
                        className={`btn btn-primary mt-5 w-full text-white rounded-full ${loading ? "cursor-not-allowed" : ""
                            }`}
                        type="submit"
                    >
                        {loading && <span className="loading loading-spinner"></span>}
                        {loading ? "Creating Team..." : "Create Team"}
                    </button>
                    {error && <p className="text-red-500">{error.message}</p>}
                </form>
            )}
        </div>
    );
};

export default AddTeams;
