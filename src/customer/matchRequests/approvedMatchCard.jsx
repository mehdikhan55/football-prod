import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

const ApprovedMatchCard = ({ match, onInterest }) => {
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
    <div className="border rounded-lg p-4 mb-4 text-white shadow-md relative">
      <h3 className="text-lg font-semibold">{match.bookingId.ground.name}</h3>
      <p>Request Maker: {match.matchMaker.username}</p>      
      <p>Date: {new Date(match.bookingId.bookingDate).toLocaleDateString()}</p>
      <p>Time: {match.bookingId.bookingTime}</p>
      <p>Players Needed: {match.playersRequired}</p>
      <div className="mt-3">
        {approved && (
          <span className="top-1 ring-1 bg-green-500 text-white px-2 py-1 rounded">approved</span>
        )}
      </div>
    </div>
  );
};

export default ApprovedMatchCard;
