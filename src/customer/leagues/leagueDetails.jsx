import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

const LeagueDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [league, setLeague] = useState({
        leagueName: "",
        startDate: "",
        endDate: "",
        teams: [],
        matches: [],
    });

    const fetchLeagueDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/customer/leagues/${id}`, {
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
            console.log('error occured', error)
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLeagueDetails();
    }, []);



    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="p-10 max-sm:p-5 mt-10">
                <h1 className="text-4xl font-bold text-red-500 mb-10 text-center">
                    {league.leagueName} Details
                </h1>
                <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="text-lg mb-2">
                        <strong>Start Date:</strong> {league.startDate}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>End Date:</strong> {league.endDate}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>No of Teams:</strong> {league.teams.length}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Teams:</strong> 
                    </p>
                    <ul className="list-disc ml-4">
                        {league.teams.map((team, idx) => (
                            <li key={idx}>{team.teamName}</li>
                        ))}
                    </ul>

                </div>

                <h2 className="text-2xl font-semibold mb-6">Matches</h2>
                <div className="grid grid-cols-1 gap-6">
                    {league.matches.length === 0 ? (
                        <div className="text-center text-lg">No matches available</div>
                    ) :
                        <>
                            {league.matches.map((match, idx) => (
                                <div key={idx} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                                    <p className="mb-3">
                                        <strong>Match:</strong> Team {match.teamA.teamName} vs Team {match.teamB.teamName}
                                    </p>
                                    <p className="mb-3">
                                        <strong>Date:</strong> {match.date}
                                    </p>
                                    <p className="mb-3">
                                        <strong>Score:</strong> {match.score.teamA} - {match.score.teamB}
                                    </p>
                                    <div>
                                        <strong>Scorers:</strong>
                                        <ul className="mt-2 ml-4 list-disc">
                                            {match.scorers.length === 0 ? (<li>No scorers Data</li>) : (
                                            <>
                                                {match.scorers.map((scorer, i) => (
                                                    <li key={i} className="text-sm">
                                                        {`${scorer?.player} (${scorer?.team?.teamName}) - ${scorer?.score}`}
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default LeagueDetails;
