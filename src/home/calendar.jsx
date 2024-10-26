import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const localizer = momentLocalizer(moment);

const GeneralBooking = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formattedEvents, setFormattedEvents] = useState([]);
  const formattedBookings = (data) => {
    const events = data.bookings.map((booking) => {

      const formattedDate = moment(booking.bookingDate).format("YYYY-MM-DD");
      console.log('formatted date: ', formattedDate);

      // Split bookingTime into hours and minutes
      const [hours, minutes] = booking.bookingTime.split(':').map(Number);

      // Create start time
      const startDateTime = new Date(`${formattedDate}T${booking.bookingTime}:00`)

      // Correctly calculate end time by adding the booking duration to hours
      let endDateTime = new Date(startDateTime);
      endDateTime.setHours(hours + booking.bookingDuration); // Add duration to hours
      endDateTime = new Date(endDateTime);

      return {
        title: booking.title || "Booking", // You can set a default title
        date: booking.bookingDate,
        start: startDateTime,
        end: endDateTime,

      };
    });
    setFormattedEvents(events);
    console.log('formatted events: ', events);

  };



  const fetchFormattedBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/bookings`);
      const data = response.data;

      if (response.status >= 400) {
        throw new Error(data.message);
      }

      const formattedEvents = formattedBookings(data);
      setEvents(formattedEvents);
      console.log('data of bookings: ', data);
      console.log('formatted bookings: ', formattedEvents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormattedBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="p-20 max-sm:p-5 max-sm:pt-20 bg-gray-800 text-white">
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: "20px" }}
          className="bg-gray-100 text-black w-full md:w-3/4 lg:w-full mx-auto p-10 max-sm:p-0 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default GeneralBooking;
