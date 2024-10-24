import React, { useEffect } from "react";
import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import ChallengeServices from "../../services/ChallengeServices";
import GeneralServices from "../../services/GeneralServices";
import { useTeam } from "../../context/teamContext";

const CustomerTeamCard = ({ team, grounds, challenges, selfId }) => {
  const [selectedGround, setSelectedGround] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const checkIfChallenged = () => {
    console.log("Challenges:", challenges);
    const challenge = challenges.find(
      (challenge) =>
        challenge.challengerTeam._id === selfId &&
        challenge.challengedTeam._id === team._id
    );
    console.log("Challenge:", challenge);
    return challenge;
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleSendChallenge = async () => {
    console.log("Grounds:", grounds);
    console.log("Selected Ground:", selectedGround);
    const groundId = grounds.find(
      (ground) => ground.name === selectedGround
    )._id;
    console.log("Ground ID:", groundId);
    // Call the service and send the challenge
    const response = await ChallengeServices.sendChallenge({
      challenged: team._id,
      ground: groundId,
      date: selectedDate,
      time: selectedTime,
    });

    if (response.error) {
      console.log("Error sending challenge", response.error);
      alert("Error sending challenge");
      return;
    }

    alert(`Challenge sent to ${team.teamName}!`);
    handleCloseDialog();
  };

  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{team.teamName}</h2>
      <p className="text-sm mb-4">
        <strong>Players:</strong>
        <ul className="list-disc list-inside">
          {team.players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </p>
      {!checkIfChallenged() ? (
        <button
          onClick={handleOpenDialog}
          className="flex items-center mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <FaTrophy className="mr-2" />
          Challenge
        </button>
      ) : (
        <button className="flex items-center mt-4 px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed">
          <FaTrophy className="mr-2" />
          Already Challenged
        </button>
      )}

      {isOpen && (
        <div className="modal modal-open text-black">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Challenge {team.teamName}</h3>
            <div className="py-4">
              <label className="block mb-2">Select Ground:</label>
              <select
                value={selectedGround}
                onChange={(e) => setSelectedGround(e.target.value)}
                className="select select-bordered w-full mb-4"
              >
                <option value="">Select Ground</option>
                {grounds.map((ground, index) => (
                  <option key={index} value={ground.name}>
                    {ground.name}
                  </option>
                ))}
              </select>
              <label className="block mb-2">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input input-bordered w-full mb-4"
              />

              <label className="block mb-2">Select Time:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
            </div>

            <div className="modal-action">
              <button onClick={handleSendChallenge} className="btn btn-primary">
                Send Challenge
              </button>
              <button onClick={handleCloseDialog} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTeamCard;
