import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

const MatchCard = ({ match, onInterest }) => {
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const { customer } = useUser();

  useEffect(() => {
    if (match && customer) {
      console.log('match', match);
      const interestedPlayers = match.interestedPlayers;
      const isAlreadyInterested = interestedPlayers.map(player => player.player._id).includes(customer._id);
      setAlreadyInterested(isAlreadyInterested);
      const isapproved = interestedPlayers.map(player => player.requestStatus).includes('approved');
      setApproved(isapproved);
      const isRejected = interestedPlayers.map(player => player.requestStatus).includes('rejected');
      setRejected(isRejected);
    }
  }, [match, customer]); // Add dependencies

  const handleInterest = () => {
    if (onInterest) {
      onInterest(match); // Pass the match to the onInterest function
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 text-white shadow-md ">
      <div className="">
        {alreadyInterested && (
          <span className="top-1 ring-1 bg-green-500 text-white px-2 py-1 rounded">Interest Sent</span>
        )}
      </div>
      <h3 className="text-lg font-semibold">{match.bookingId.ground.name}</h3>
      <p>Request Maker: {match.matchMaker.username}</p>      
      <p>Date: {new Date(match.bookingId.bookingDate).toLocaleDateString()}</p>
      <p>Time: {match.bookingId.bookingTime}</p>
      <p>Players Needed: {match.playersRequired}</p>
      {(onInterest && !approved && !rejected) && (
        <button
          onClick={handleInterest}
          disabled={alreadyInterested}
          className={`mt-2 ${
            alreadyInterested ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
          } text-white py-1 px-3 rounded`}
        >
          Express Interest
        </button>
      )}
      {approved && (
        <button
          className={`mt-2 bg-green-500 text-white py-1 px-3 rounded`}
        >
          Approved
        </button>
      )}
      {rejected && (
          <span className="top-1 ring-1 bg-red-500 text-white px-2 py-1 rounded">Rejected</span>
        )}
    </div>
  );
};

export default MatchCard;
