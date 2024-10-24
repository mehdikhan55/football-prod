import React, { useState } from "react";

const AddBookingForm = ({ onSubmit, customersData, groundsData }) => {
  const [customer, setCustomer] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingStartTime, setbookingStartTime] = useState("");
  const [bookingEndTime, setbookingEndTime] = useState("");
  const [bookingTime , setBookingTime] = useState("");
  const [bookingDuration, setBookingDuration] = useState(1);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paymentDate, setPaymentDate] = useState("");
  const [ground, setGround] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBooking = {
        customer: customer,
        bookingDate: new Date(bookingDate),
        // bookingStartTime,
        // bookingEndTime,
        bookingTime,
        bookingDuration,
        bookingPrice,
        bookingStatus,
        paymentMethod,
        paymentStatus,
        paymentDate: paymentDate ? new Date(paymentDate) : null,
        ground,
      };
      console.log("new booking:",newBooking);
      await onSubmit(newBooking);

      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setCustomer("");
    setBookingDate("");
    setbookingStartTime("");
    setbookingEndTime("");
    setBookingTime("");
    setBookingDuration(1);
    setBookingPrice(0);
    setBookingStatus("pending");
    setPaymentMethod("");
    setPaymentStatus("pending");
    setPaymentDate("");
    setGround("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add a new Booking</h1>

      {/* Form inputs for booking details */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Customer</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          >
            <option value="">Select Customer</option>
            {customersData.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.username}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          />
        </div>
      </div>

      {/* <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking Start Time</label>
          <input
            type="time"
            value={bookingStartTime}
            onChange={(e) => setbookingStartTime(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking End Time</label>
          <input
            type="time"
            value={bookingEndTime}
            onChange={(e) => setbookingEndTime(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          />
        </div>
      </div> */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking Time</label>
          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking Price</label>
          <input
            type="number"
            value={bookingPrice}
            onChange={(e) => setBookingPrice(Number(e.target.value))}
            className="rounded-md p-3 border border-gray-300"
            min="0"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Payment Method</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Enter Payment Method"
            className="rounded-md p-3 border border-gray-300"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Payment Date</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Ground</label>
          <select
            value={ground}
            onChange={(e) => setGround(e.target.value)}
            className="rounded-md p-3 border border-gray-300"
            required
          >
            <option value="">Select Ground</option>
            {groundsData.map((ground) => (
              <option key={ground._id} value={ground._id}>
                {ground.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        className={`btn btn-primary mt-5 w-full text-white rounded-full ${
          loading ? "cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading && <span className="loading loading-spinner"></span>}
        {loading ? "Creating Booking..." : "Create Booking"}
      </button>
    </form>
  );
};

export default AddBookingForm;
