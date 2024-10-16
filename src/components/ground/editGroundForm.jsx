import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditGroundForm = ({ groundData, onSubmit }) => {
  const navigate = useNavigate();

  // Initialize form fields with the passed ground data
  const [name, setName] = useState(groundData?.name || "");
  const [address, setAddress] = useState(groundData?.address || "");
  const [phone, setPhone] = useState(groundData?.phone || "");
  const [prices, setPrices] = useState(groundData?.prices || [{ duration: 1, price: 0 }]);
  const [groundType, setGroundType] = useState(groundData?.groundType || "");
  const [reservedTimes, setReservedTimes] = useState(groundData?.reserved_times || [{ date: "", times: [""] }]);
  const [startTime, setStartTime] = useState(groundData?.startTime || "");
  const [endTime, setEndTime] = useState(groundData?.endTime || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Populate form with the passed ground data when the component is mounted
    if (groundData) {
      setName(groundData.name);
      setAddress(groundData.address);
      setPhone(groundData.phone);
      setPrices(groundData.prices);
      setGroundType(groundData.groundType);
      setReservedTimes(groundData.reserved_times);
      setStartTime(groundData.startTime);
      setEndTime(groundData.endTime);
    }
  }, [groundData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedGround = {
        ...groundData, // Keep the id and other static fields
        name,
        address,
        phone,
        prices,
        groundType,
        reserved_times: reservedTimes,
        startTime,
        endTime,
      };

      // Call the onSubmit function passed as a prop to update the ground data
      onSubmit(updatedGround);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 w-full px-4 py-10 mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Edit Ground</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g Dream Football Arena"
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g 1234 Dream Football Arena"
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g 123456789"
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground Type</label>
            <select
              value={groundType}
              onChange={(e) => setGroundType(e.target.value)}
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Select Ground Type</option>
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500">Ground End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Handle prices */}
        {prices.map((price, index) => (
          <div key={index} className="flex flex-wrap gap-2 items-center">
            <div className="">
              <label className="text-gray-500">Duration</label>
              <input
                type="number"
                value={price.duration}
                onChange={(e) => {
                  const newPrices = [...prices];
                  newPrices[index].duration = e.target.value;
                  setPrices(newPrices);
                }}
                className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="">
              <label className="text-gray-500">Price</label>
              <input
                type="number"
                value={price.price}
                onChange={(e) => {
                  const newPrices = [...prices];
                  newPrices[index].price = e.target.value;
                  setPrices(newPrices);
                }}
                className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const newPrices = [...prices];
                newPrices.splice(index, 1);
                setPrices(newPrices);
              }}
              className="btn btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setPrices([...prices, { duration: 1, price: 0 }])}
          className="btn btn-secondary w-48"
        >
          + Add Dynamic Price
        </button>

        {/* Handle reserved times */}
        {reservedTimes.map((reservedTime, index) => (
          <div key={index} className="flex flex-wrap gap-2">
            <input
              type="date"
              value={reservedTime.date}
              onChange={(e) => {
                const newReservedTimes = [...reservedTimes];
                newReservedTimes[index].date = e.target.value;
                setReservedTimes(newReservedTimes);
              }}
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="text"
              value={reservedTime.times.join(",")}
              onChange={(e) => {
                const newReservedTimes = [...reservedTimes];
                newReservedTimes[index].times = e.target.value.split(",");
                setReservedTimes(newReservedTimes);
              }}
              placeholder="Times"
              className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="button"
              onClick={() => {
                const newReservedTimes = [...reservedTimes];
                newReservedTimes.splice(index, 1);
                setReservedTimes(newReservedTimes);
              }}
              className="btn btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setReservedTimes([...reservedTimes, { date: "", times: [""] }])
          }
          className="btn btn-secondary w-48"
        >
          + Add Reserved Time
        </button>

        <button
          className={`btn btn-primary mt-5 w-full max-sm:w-full text-white rounded-full ${loading ? "cursor-not-allowed" : ""
            }`}
          type="submit"
        >s


          {loading && <span className="loading loading-spinner"></span>}
          {loading ? "Processing..." : "Update Ground"}
        </button>
      </form>
    </div>
  );
};

export default EditGroundForm;
