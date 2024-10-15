import React, { useState } from 'react';
import { dummyBookingData } from '../../dashboard/booking/dummyBookingData'; 

const AddBookingForm = () => {
  const [bookings, setBookings] = useState(dummyBookingData);
  const [customerId, setCustomerId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDuration, setBookingDuration] = useState(1);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paymentDate, setPaymentDate] = useState("");
  const [ground, setGround] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBooking = {
        customer: customerId,
        bookingDate: new Date(bookingDate),
        bookingTime,
        bookingDuration,
        bookingPrice,
        bookingStatus,
        paymentMethod,
        paymentStatus,
        paymentDate: paymentDate ? new Date(paymentDate) : null,
        ground,
      };

      console.log('Booking added successfully', newBooking);
      setBookings([...bookings, newBooking]); // Update bookings state
      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setCustomerId("");
    setBookingDate("");
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
          <label className="text-gray-500">Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter Customer ID"
            className="rounded-md p-3 border border-gray-300"
            required
          />
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
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-500">Booking Duration (hours)</label>
          <input
            type="number"
            value={bookingDuration}
            onChange={(e) => setBookingDuration(Number(e.target.value))}
            className="rounded-md p-3 border border-gray-300"
            min="1"
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
          <input
            type="text"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            placeholder="Enter Payment Status"
            className="rounded-md p-3 border border-gray-300"
            required
          />
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
          <input
            type="text"
            value={ground}
            onChange={(e) => setGround(e.target.value)}
            placeholder="Enter Ground Name"
            className="rounded-md p-3 border border-gray-300"
            required
          />
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
