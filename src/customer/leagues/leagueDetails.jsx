import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import { dummyLeaguesData } from './dummyLeaguesData';

const LeagueDetails = () => {
    const { id } = useParams();
    const league = dummyLeaguesData[id];

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
                        <strong>Teams:</strong> {league.teams.length}
                    </p>
                </div>

                <h2 className="text-2xl font-semibold mb-6">Matches</h2>
                <div className="grid grid-cols-1 gap-6">
                    {league.matches.map((match, idx) => (
                        <div key={idx} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                            <p className="mb-3">
                                <strong>Match:</strong> Team {match.teamA} vs Team {match.teamB}
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
                                    {match.scorers.map((scorer, i) => (
                                        <li key={i} className="text-sm">
                                            {scorer.player} ({scorer.team}) 
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeagueDetails;
