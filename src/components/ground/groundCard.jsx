import React from 'react';

const GroundCard = ({ ground, onRemove,onEdit, type="remove" }) => {
  return (
    <div className="p-4 border border-gray-300  shadow-md bg-white flex justify-between items-center rounded-lg">
      <div>
        <h2 className="font-bold text-lg">{ground.name}</h2>
        <p>Address: {ground.address}</p>
        <p>Phone: {ground.phone}</p>
        <p>Type: {ground.groundType}</p>
        <p>Start Time: {ground.startTime}</p>
        <p>End Time: {ground.endTime}</p>
      </div>
      <button
        onClick={() => (type=="remove" ? onRemove(ground.id) : onEdit(ground)) }
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {type == "remove"?"Remove" : "Edit"}
      </button>
    </div>
  );
};

export default GroundCard;
