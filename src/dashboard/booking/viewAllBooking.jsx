import React, { useState } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import { dummyBookingData } from "./dummyBookingData";
import BookingCard from "../../components/booking/bookingCard";
import EditBookingForm from "../../components/booking/editBookingForm";

const ViewAllBooking = () => {
    const [bookings, setBookings] = useState(dummyBookingData);
    const [selectedBooking, setSelectedBooking] = useState(null); 

    const handleEditBooking = (booking) => {
        console.log("Selected booking:", booking);
        setSelectedBooking(booking);
    };

    const handleCancelBooking = (bookingId) => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId)); 
    }

    const handleSubmitEditBooking = (updatedBooking) => {
        setBookings(bookings.map((booking) => (booking.id === updatedBooking.id ? updatedBooking : booking)));
        setSelectedBooking(null);   
    };

    return (
        <div className="">
            <AdminSiderbar />
            <div className="pt-10 flex flex-col justify-start gap-4 mx-auto relative">
                {selectedBooking && (
                    <div 
                        className="absolute top-0 left-0 border-primary border-2 rounded-md p-1 text-center bg-primary text-white cursor-pointer"
                        onClick={() => setSelectedBooking(null)}
                    >
                        {"<Back"}
                    </div>
                )}
                {selectedBooking ? (
                    <EditBookingForm 
                        bookingData={selectedBooking} 
                        onSubmit={handleSubmitEditBooking} 
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <BookingCard 
                                    key={booking.id} 
                                    booking={booking} 
                                    onEdit={handleEditBooking}
                                    onCancel={handleCancelBooking} 
                                    type="edit" 
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No bookings available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllBooking;
