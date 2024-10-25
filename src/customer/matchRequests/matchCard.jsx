import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

const MatchCard = ({ match, onInterest }) => {
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const { customer } = useUser();

  useEffect(() => {
    if (match && customer) {
      console.log('match', match);
      const interestedPlayers = match.interestedPlayers;
      const isAlreadyInterested = interestedPlayers.some(player => player.player.toString() === customer._id);
      setAlreadyInterested(isAlreadyInterested);
    }
  }, [match, customer]); // Add dependencies

  const handleInterest = () => {
    if (onInterest) {
      onInterest(match); // Pass the match to the onInterest function
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 text-white shadow-md relative">
      <div className="absolute">
        {alreadyInterested && (
          <span className="top-1 ring-1 bg-green-500 text-white px-2 py-1 rounded">Interest Sent</span>
        )}
      </div>
      <h3 className="text-lg font-semibold">{match.bookingId.ground.name}</h3>
      <p>Date: {new Date(match.bookingId.bookingDate).toLocaleDateString()}</p>
      <p>Time: {match.bookingId.bookingTime}</p>
      <p>Players Needed: {match.playersRequired}</p>
      {onInterest && (
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
    </div>
  );
};

export default MatchCard;
