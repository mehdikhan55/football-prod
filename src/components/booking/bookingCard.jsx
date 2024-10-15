import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const BookingCard = ({ booking, onEdit, onCancel }) => {
  const handleEditClick = () => {
    onEdit(booking);
  };

  const handleCancelClick = () => {
    onCancel(booking.id); 
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h3>
      <p className="text-gray-600"><strong>Customer:</strong> {booking.customer}</p>
      <p className="text-gray-600"><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()} &emsp; <strong>Time:</strong> {booking.bookingTime}</p>
      <p className="text-gray-600"><strong>Duration:</strong> {booking.bookingDuration} hours &emsp; <strong>Price:</strong>  ${booking.bookingPrice.toFixed(2)}</p>
      <p className="text-gray-600"><strong>Status:</strong> {booking.bookingStatus} &emsp; <strong>Payment Method:</strong> {booking.paymentMethod}</p>
      <p className="text-gray-600"><strong>Payment Status:</strong> {booking.paymentStatus} <strong>Payment Date:</strong> {booking.paymentDate ? new Date(booking.paymentDate).toLocaleDateString() : 'N/A'}</p>
      <p className="text-gray-600"><strong>Ground:</strong> {booking.ground}</p>

      <div className="flex gap-2">
        <button
          className="mt-4 bg-primary text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
          onClick={handleEditClick}
        >
          <AiFillEdit className="mr-2" /><p>Edit</p>
        </button>
        <button
          className="mt-4 bg-red-500 text-white rounded-md py-2 px-5 focus:outline-none focus:ring-2 transition duration-200 flex items-center justify-center"
          onClick={handleCancelClick}
        >
          <AiFillDelete className="mr-2" /><p>Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
