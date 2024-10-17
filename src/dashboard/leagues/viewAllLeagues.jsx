import React, { useState } from 'react';
import LeagueCard from './LeagueCard';
import { dummyLeaguesData } from './dummyLeaguesData';
import EditLeagueForm from './editLeagueForm'
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import AdminSiderbar from '../../components/sidebar/sidebar';




const ViewAllLeagues = () => {
    const [leagues, setLeagues] = useState(dummyLeaguesData);
    const [selectedLeague, setSelectedLeague] = useState(null);

    const handleEditLeague = (league) => {
        setSelectedLeague(league);
    };

    const handleDeleteLeague = (leagueName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${leagueName}?`);
        if (confirmDelete) {
            setLeagues(leagues.filter(league => league.leagueName !== leagueName));
        }
    };

    const handleSubmitEditLeague = (updatedLeague) => {
        setLeagues(leagues.map((league) =>
            league.leagueName === updatedLeague.leagueName ? updatedLeague : league
        ));
        setSelectedLeague(null);
    };



    return (
        <div
            style={{
                backgroundImage: `url(${dfawallpaper})`,
                backgroundSize: "cover",
            }}
            className="flex flex-col gap-4"
        >
            <AdminSiderbar />
            <div className="relative">
                {selectedLeague && (
                    <div
                        className="absolute top-0 left-0 border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
                        onClick={() => setSelectedLeague(null)}
                    >
                        {"<Back"}
                    </div>
                )}
            </div>
            {selectedLeague ? (
                <EditLeagueForm
                    leagueData={selectedLeague}
                    onSubmit={handleSubmitEditLeague}
                />
            ) : (
                <>
                    {leagues.length > 0 ? (
                        leagues.map((league) => (
                            <LeagueCard
                                key={league.leagueName}
                                league={league}
                                onEdit={handleEditLeague}
                                onDelete={handleDeleteLeague}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No leagues available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewAllLeagues;
