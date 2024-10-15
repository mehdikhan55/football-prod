import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; 

const GroundCard = ({ ground, onRemove, onEdit, type = "remove" }) => {
  return (
    <div className="p-4 border border-gray-300 shadow-lg bg-white flex justify-between items-center rounded-lg transition-transform duration-200 hover:shadow-lg">
      <div className="flex-grow">
        <h2 className="font-bold text-lg text-gray-800">{ground.name}</h2>
        <p className="text-gray-600">Address: {ground.address}</p>
        <p className="text-gray-600">Phone: {ground.phone}</p>
        <p className="text-gray-600">Type: {ground.groundType}</p>
        <p className="text-gray-600">Start Time: {ground.startTime}</p>
        <p className="text-gray-600">End Time: {ground.endTime}</p>
      </div>
      <button
        onClick={() => (type === "remove" ? onRemove(ground.id) : onEdit(ground))}
        className="bg-primary text-white flex items-center px-4 py-2 rounded hover:bg-opacity-80 transition duration-200"
      >
        {type === "remove" ? (
          <>
            <AiFillDelete className="mr-2" /> Remove
          </>
        ) : (
          <>
            <AiFillEdit className="mr-2" /> Edit
          </>
        )}
      </button>
    </div>
  );
};

export default GroundCard;
