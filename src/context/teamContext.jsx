import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL;

export const TeamContext = createContext();

export const useTeam = () => {
    const context = React.useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
}

export const TeamProvider = ({ children }) => {
    const [currTeam, setCurrTeam] = useState(null);
    const [isFetchingTeam, setIsFetchingTeam] = useState(false);
    const [teamFetchingError, setTeamFetchingError] = useState(null);

    const fetchTeam = async () => {
        setIsFetchingTeam(true);
        setTeamFetchingError(null);
        try{
            const response = await axios.get(`${URL}/customer/teams/team-profile`,{
                headers: {
                    Authorization: `${localStorage.getItem('teamToken')}`,
                },
            });
            console.log('response is:', response);
            if(response.status > 400){
                throw new Error(response.data.message || "An error occurred");
            }
            setCurrTeam(response.data.team); 
        } catch (error) {
            console.log('Error is:', error.response?.data?.message || error.message);
            setTeamFetchingError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsFetchingTeam(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    return (
        <TeamContext.Provider value={{ currTeam, isFetchingTeam, teamFetchingError }}>
            {children}
        </TeamContext.Provider>
    );
};
