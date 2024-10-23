import React, { useEffect, useState } from 'react'
import TeamServices from '../../services/TeamServices';
import CustomerTeamCard from '../../components/customerTeams/customerTeamCard';

const ViewCustomerTeams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await TeamServices.fetchTeamsForCustomers();
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            setTeams(data.teams); // Assuming the response structure includes teams
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);


    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-200"></div>
                </div>
            ) : (
                <>
                    {error && (
                        <div role="alert" className="alert alert-error leading-tight flex justify-between py-1 w-[84%] mx-auto mb-2">
                            <span>{error}</span>
                            <div>
                                <button className="btn btn-sm border-none" onClick={() => setError(null)}>x</button>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        {teams.map((team, index) => (
                            <CustomerTeamCard key={index} team={team} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewCustomerTeams;