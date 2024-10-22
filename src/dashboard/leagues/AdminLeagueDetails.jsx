import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminSiderbar from '../../components/sidebar/sidebar';
import axios from 'axios';
import dfawallpaper from "../../assets/dfa-wallpaper.png";

const URL = import.meta.env.VITE_BACKEND_URL;

const AdminLeagueDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [league, setLeague] = useState(null);

    const fetchLeague = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/leagues/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            setLeague(data.league);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeague();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100" style={{
            backgroundImage: `url(${dfawallpaper})`,
            backgroundSize: "cover",
        }}>
            <AdminSiderbar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
                    
                    {error && (
                        <div role="alert" className="alert alert-error flex justify-between items-center py-2 mb-4 bg-red-100 border border-red-400 rounded-md">
                            <span className="text-red-600">{error}</span>
                            <button className="text-red-600 font-bold" onClick={() => setError(null)}>x</button>
                        </div>
                    )}
                    <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">{league?.leagueName} Details</h1>
                    <div className="mb-6 p-6 bg-gradient-to-r from-primary to-green-600 rounded-lg shadow-inner">
                        <p className="text-lg mb-2"><strong>Start Date:</strong> {new Date(league?.startDate).toLocaleDateString()}</p>
                        <p className="text-lg mb-2"><strong>End Date:</strong> {new Date(league?.endDate).toLocaleDateString()}</p>
                        <p className="text-lg mb-2"><strong>Total Teams:</strong> {league?.teams?.length}</p>
                        <p><strong>Teams:</strong></p>
                        <ol className="list-decimal ml-5">
                            {league?.teams?.map((team, idx) => (
                                <li key={idx} className="text-lg text-gray-800">{team.teamName}</li>
                            ))}
                        </ol>
                    </div>

                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Matches</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {league?.matches?.map((match, idx) => (
                            <div key={idx} className="bg-green-700 p-5 rounded-lg shadow-lg text-white transition-transform duration-200 hover:scale-105">
                                <p className="mb-2">
                                    <strong>Match:</strong> {match.teamA?.teamName} vs {match.teamB?.teamName}
                                </p>
                                <p className="mb-2">
                                    <strong>Date:</strong> {new Date(match.date).toLocaleDateString()}
                                </p>
                                <p className="mb-2">
                                    <strong>Score:</strong> {match.score?.teamA} - {match.score?.teamB}
                                </p>
                                <div>
                                    <strong>Scorers:</strong>
                                    <ul className="mt-2 ml-4 list-disc">
                                        {match.scorers.map((scorer, i) => (
                                            <li key={i} className="text-sm">{scorer.player} ({scorer.team?.teamName}) - {scorer?.score}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLeagueDetails;
