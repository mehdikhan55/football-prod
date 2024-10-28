import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

const MyMatchesMatchCard = ({ match, onInterest, fetchMyMatches }) => {
    const [alreadyInterested, setAlreadyInterested] = useState(false);
    const [interestedPlayers, setInterestedPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { customer } = useUser();

    useEffect(() => {
        console.log('match is ', match);
        if (match && customer) {
            const interestedPlayersList = match.interestedPlayers;
            setInterestedPlayers(interestedPlayersList);
            const isAlreadyInterested = interestedPlayersList.some(player => player.player.toString() === customer._id);
            setAlreadyInterested(isAlreadyInterested);
        }
    }, [match, customer]);

    const handleInterest = () => {
        if (onInterest) {
            onInterest(match);
        }
    };

    const handleStatusChange = async (playerId, action) => {
        try {
            setLoading(true);
            setError(null);
            console.log('reqeust to change status', playerId, action);
            const response = await axios.patch(`${URL}/customer/match-requests/${match._id}/interested/${playerId}`, { action }, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            console.log('response of status change', response);
            const data = response.data;
            if (response.status > 400) {
                throw new Error(data.message);
            }
            setInterestedPlayers(prev =>
                prev.map(player =>
                    player.player.toString() === playerId ? { ...player, requestStatus: action } : player
                )
            );
            await fetchMyMatches();
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 text-white shadow-md relative">
            <h3 className="text-lg font-semibold">{match.bookingId.ground.name}</h3>
            <p>Request Maker: {match.matchMaker.username}</p>
            <p>Date: {new Date(match.bookingId.bookingDate).toLocaleDateString()}</p>
            <p>Time: {match.bookingId.bookingTime}</p>
            <p>Players Needed: {match.playersRequired}</p>

            <p>Ground: {match.bookingId.ground.name}</p>

            {interestedPlayers.map(player => (
                <div className="flex flex-col bg-gray-700 py-2 px-2 mb-1 text-white  rounded-xl">
                    <div key={player.player._id} className="flex justify-between items-center opacity-80">
                        <span>{player.player.username} - {player.requestStatus}</span>
                        <div>
                            {player.requestStatus === 'pending' && (
                                <>
                                    <button disabled={loading} onClick={() => handleStatusChange(player.player._id, 'approved')} className="bg-green-500 text-white py-1 px-2 rounded mr-1">
                                        Accept
                                    </button>
                                    <button disabled={loading} onClick={() => handleStatusChange(player.player._id, 'rejected')} className="bg-red-500 text-white py-1 px-2 rounded">
                                        Reject
                                    </button>
                                </>
                            )}
                            {/* {player.requestStatus === 'approved' && (
                                <>
                                    <button disabled={loading} onClick={() => handleStatusChange(player.player._id, 'rejected')} className="bg-red-500 text-white py-1 px-2 rounded mr-1">
                                        Reject
                                    </button>
                                </>

                            )}
                            {player.requestStatus === 'rejected' && (
                                <>
                                    <button disabled={loading} onClick={() => handleStatusChange(player.player._id, 'approved')} className="bg-green-500 text-white py-1 px-2 rounded mr-1">
                                        Approve
                                    </button>
                                </>
                            )} */}

                        </div>
                    </div>
                    {player.comments && (
                        <>
                            <p>Comments:</p>
                            <p className='border border-gray-100 px-1 py-2 rounded-md'>{player.comments}</p>
                        </>
                    )}
                </div>
            ))}

            {onInterest && (
                <button
                    onClick={handleInterest}
                    disabled={alreadyInterested}
                    className={`mt-2 ${alreadyInterested ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'} text-white py-1 px-3 rounded`}
                >
                    Express Interest
                </button>
            )}
        </div>
    );
};

export default MyMatchesMatchCard;
