import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/navbar/navbar';
import { dummyLeaguesData } from './dummyLeaguesData';

const CustomerLeagues = () => {
    const navigate = useNavigate(); 

    const handleLeagueClick = (id) => {
        navigate(`/customer/leagues/${id}`); 
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="p-10 max-sm:p-5 mt-10">
                <h1 className="text-4xl font-bold text-center text-red-500 mb-10">Football Leagues</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {dummyLeaguesData.map((league, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-6 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => handleLeagueClick(index)}
                        >
                            <h2 className="text-2xl font-semibold mb-4">{league.leagueName}</h2>
                            <p className="text-sm mb-2">
                                <strong>Start Date:</strong> {league.startDate}
                            </p>
                            <p className="text-sm mb-2">
                                <strong>End Date:</strong> {league.endDate}
                            </p>
                            <p className="text-sm">
                                <strong>Teams Participating:</strong> {league.teams.length}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerLeagues;
