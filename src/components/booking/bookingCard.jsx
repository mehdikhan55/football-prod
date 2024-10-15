import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const BookingCard = ({ booking, onEdit, onCancel }) => {
  const handleEditClick = () => {
    onEdit(booking);
  };

  const handleCancelClick = () => {
    onCancel(booking.id);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Booking Details
      </h3>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-600">
        <div className="flex justify-between">
          <strong>Customer:</strong>
          <span>{booking.customer}</span>
        </div>

        <div className="flex justify-between">
          <strong>Date:</strong>
          <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between">
          <strong>Time:</strong>
          <span>{booking.bookingTime}</span>
        </div>

        <div className="flex justify-between">
          <strong>Duration:</strong>
          <span>{booking.bookingDuration} hours</span>
        </div>

        <div className="flex justify-between">
          <strong>Price:</strong>
          <span>${booking.bookingPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <strong>Status:</strong>
          <span>{booking.bookingStatus}</span>
        </div>

        <div className="flex justify-between">
          <strong>Payment Method:</strong>
          <span>{booking.paymentMethod}</span>
        </div>

        <div className="flex justify-between">
          <strong>Payment Status:</strong>
          <span>{booking.paymentStatus}</span>
        </div>

        <div className="flex justify-between">
          <strong>Payment Date:</strong>
          <span>
            {booking.paymentDate
              ? new Date(booking.paymentDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <strong>Ground:</strong>
          <span>{booking.ground}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="mt-4 bg-primary text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
          onClick={handleEditClick}
        >
          <AiFillEdit className="mr-2" />
          <p>Edit</p>
        </button>
        <button
          className="mt-4 bg-red-500 text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
          onClick={handleCancelClick}
        >
          <AiFillDelete className="mr-2" />
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
