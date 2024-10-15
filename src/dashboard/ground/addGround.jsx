import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSiderbar from "../../components/sidebar/sidebar";
import dfawallpaper from "../../assets/dfa-wallpaper.png";
const URL = import.meta.env.VITE_BACKEND_URL;

const AddGround = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [prices, setPrices] = useState([{ duration: 1, price: 0 }]);
  const [groundType, setGroundType] = useState("");
  const [reservedTimes, setReservedTimes] = useState([
    { date: "2020-04-20", times: ["10:00", "11:00"] },
  ]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
    } catch (error) {
      setError(error);
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
    >
      <AdminSiderbar />
      <div className="flex flex-col justify-center gap-4 w-full max-sm:w-full max-md:w-2/3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Add a new Ground</h1>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g Dream Football Arena"
                className="rounded-md p-3 border border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g 1234 Dream Football Arena"
                className="rounded-md p-3 border border-gray-300"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g 123456789"
                className="rounded-md p-3 border border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground Type</label>
              <select
                value={groundType}
                onChange={(e) => setGroundType(e.target.value)}
                className="rounded-md p-3 border border-gray-300"
              >
                <option value="">Select Ground Type</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                className="rounded-md p-3 border border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-500">Ground End Time</label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                className="rounded-md p-3 border border-gray-300"
              />
            </div>
          </div>
          {prices.map((price, index) => (
            <div key={index} className="flex gap-2 items-center">
              <label className="text-gray-500">Duration</label>
              <input
                type="date"
                value={price.duration}
                onChange={(e) => {
                  const newPrices = [...prices];
                  newPrices[index].duration = e.target.value;
                  setPrices(newPrices);
                }}
                placeholder="Duration"
                className="rounded-md p-3 border border-gray-300"
              />
              <label className="text-gray-500">Price</label>
              <input
                type="number"
                value={price.price}
                onChange={(e) => {
                  const newPrices = [...prices];
                  newPrices[index].price = e.target.value;
                  setPrices(newPrices);
                }}
                placeholder="Price"
                className="rounded-md p-3 border border-gray-300"
              />
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
          {reservedTimes.map((reservedTime, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="date"
                value={reservedTime.date}
                onChange={(e) => {
                  const newReservedTimes = [...reservedTimes];
                  newReservedTimes[index].date = e.target.value;
                  setReservedTimes(newReservedTimes);
                }}
                placeholder="Date"
                className="rounded-md p-3 border border-gray-300"
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
                className="rounded-md p-3 border border-gray-300"
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
              setReservedTimes([
                ...reservedTimes,
                { date: "2020-04-20", times: ["10:00", "11:00"] },
              ])
            }
            className="btn btn-secondary w-48"
          >
            + Add Reserved Time
          </button>
          <button
            className={`btn btn-primary mt-5 w-full max-sm:w-full text-white rounded-full ${
              loading ? "cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {loading && <span className="loading loading-spinner"></span>}
            {loading ? "Creating Ground..." : "Create Ground"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGround;
