import React, { useEffect, useState } from 'react';
import LeagueCard from './leagueCard';
import { dummyLeaguesData } from './dummyLeaguesData';
import EditLeagueForm from './editLeagueForm'
import dfawallpaper from "../../assets/dfa-wallpaper.png";
import AdminSiderbar from '../../components/sidebar/sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';

const URL = import.meta.env.VITE_BACKEND_URL;



const ViewAllLeagues = () => {
    // const [leagues, setLeagues] = useState(dummyLeaguesData);
    const [leagues, setLeagues] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLeagues = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/leagues`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            setLeagues(data.leagues);
            await fetchTeams();   
        } catch (error) {
            console.log('error', error);
            setError(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchLeagues();
    }, []);


    const fetchTeams = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/teams`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            setTeams(data.teams);
        } catch (error) {
            console.log('error', error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


    const handleEditLeague = (league) => {
        setSelectedLeague(league);
    };

    const handleDeleteLeague = async (leagueId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete?`);
        if (confirmDelete) {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.delete(`${URL}/leagues/${leagueId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });
                if (response.status >= 400) {
                    throw new Error(response.data.message);
                }
                await fetchLeagues();
            } catch (error) {
                console.log('error', error);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }

        }
    };

    const handleSubmitEditLeague = async (updatedLeague) => {
        try{
            setLoading(true);
            setError(null);
            const response = await axios.put(`${URL}/leagues/${selectedLeague._id}`, updatedLeague, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            if (response.status >= 400) {
                throw new Error(response.data.message);
            }
            await fetchLeagues();
            setSelectedLeague(null);
            toast.success('League updated successfully');
        } catch (error) {
            console.log('error', error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
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
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                </div>

            ) : (
                <>
                    <div className="relative w-3/4 mx-auto pb-1">

                        {selectedLeague && (
                            <div
                                className="absolute top-0 left-0 border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
                                onClick={() => setSelectedLeague(null)}
                            >
                                {"Back"}
                            </div>
                        )}

                        {error && (
                            <div role="alert" className="alert alert-error leading-tight flex justify-between  py-1 w-full mx-auto">
                                <span>{error}</span>
                                <div>
                                    <button className="btn btn-sm border-none " onClick={() => setError(null)}>x</button>
                                </div>
                            </div>
                        )}

                    </div>
                    {selectedLeague ? (
                        <EditLeagueForm
                            teamsData={teams}
                            leagueData={selectedLeague}
                            onSubmit={handleSubmitEditLeague}
                        />
                    ) : (
                        <>
                            {leagues.length > 0 ? (
                                leagues.map((league) => (
                                    <LeagueCard
                                        key={league._id}
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
                </>
            )
            }

        </div>
    );
};

export default ViewAllLeagues;
