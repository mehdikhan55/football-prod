import React, { useState } from 'react';
import LeagueForm from './leagueForm';
import AdminSiderbar from '../../components/sidebar/sidebar';
import dfawallpaper from "../../assets/dfa-wallpaper.png";


const AddLeague = ({setActiveTab}) => {
    const handleAddLeague = (newLeague) => {
        console.log("Adding new league:", newLeague);

        // Send data to backend

        setActiveTab("View Leagues")
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
