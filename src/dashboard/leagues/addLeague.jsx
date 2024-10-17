import React, { useState } from 'react';
import LeagueForm from './leagueForm';
import AdminSiderbar from '../../components/sidebar/sidebar';
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import {dummyLeaguesData} from './dummyLeaguesData';


const AddLeague = ({setActiveTab}) => {
    const [leagues, setLeagues] = useState(dummyLeaguesData);


    const handleAddLeague = (newLeague) => {
        console.log("Adding new league:", newLeague);
    
        const leagueWithId = {
            ...newLeague,
            id: leagues.length + 1, 
        };
    
        setLeagues([...leagues, leagueWithId]);
        console.log("Leagues after adding new league:", leagues);
        setActiveTab("View Leagues");
    };
    
    return (
        <div
            style={{
                backgroundImage: `url(${dfawallpaper})`,
                backgroundSize: "cover",
            }}
        >
            <AdminSiderbar />
            
            {/* <h2 className="text-2xl font-semibold">Add New League</h2> */}
            <LeagueForm onSubmit={handleAddLeague} />
        </div>
    );
};

export default AddLeague;
