import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { FaPlus } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "My event",
    start: new Date(),
    end: new Date(),
  },
];

const CustomerBooking = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

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

      console.log("Booking added successfully", newBooking);
      resetForm();
      handleDialogToggle();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div>
      <Navbar />
      <div className="p-20 max-sm:p-5 max-sm:pt-20 mt-10 bg-gray-800 text-white h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer Bookings</h1>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleDialogToggle}
          >
            <FaPlus className="text-white" />
            Add Booking
          </button>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: "20px" }}
          className="bg-white text-black w-full md:w-3/4 lg:w-full mx-auto"
        />

        {isDialogOpen && (
          <div className="modal modal-open ">
            <div className="modal-box bg-gray-500">
              <h1 className="text-2xl font-bold mb-4">Add a new Booking</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-black"
              >
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label htmlFor="bookingDuration" className="text-white">
                  Booking Duration (minutes)
                </label>
                <input
                  type="number"
                  value={bookingDuration}
                  onChange={(e) => setBookingDuration(Number(e.target.value))}
                  className="input input-bordered"
                  min="1"
                  required
                />
                <label htmlFor="bookingPrice" className="text-white">
                  Booking Price
                </label>
                <input
                  type="number"
                  value={bookingPrice}
                  onChange={(e) => setBookingPrice(Number(e.target.value))}
                  className="p-3 rounded-md input-bordered disabled:opacity-50 bg-white"
                  disabled
                  min="0"
                  required
                />
                <select
                  value={ground}
                  onChange={(e) => setGround(e.target.value)}
                  className="input input-bordered"
                  required
                >
                  <option value="">Select Ground</option>
                  <option value="Ground 1">Ground 1</option>
                  <option value="Ground 2">Ground 2</option>
                  <option value="Ground 3">Ground 3</option>
                </select>
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Creating Booking..." : "Create Booking"}
                </button>
              </form>
              <div className="modal-action">
                <button
                  onClick={handleDialogToggle}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerBooking;
