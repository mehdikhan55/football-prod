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
  const [grounds, setGrounds] = useState([]);
  const [selectedGround, setSelectedGround] = useState(null);

  const [formattedEvents, setFormattedEvents] = useState([]);
  const formattedBookings = (data) => {
    //filter data based on selected ground
    const processedData = selectedGround
      ? data.bookings.filter((booking) => booking.ground._id === selectedGround)
      : data.bookings;
    const events = processedData.map((booking) => {
      const formattedDate = moment(booking.bookingDate).format("YYYY-MM-DD");
      console.log("formatted date: ", formattedDate);

      // Split bookingTime into hours and minutes
      const [hours, minutes] = booking.bookingTime.split(":").map(Number);

      // Create start time
      const startDateTime = new Date(
        `${formattedDate}T${booking.bookingTime}:00`
      );

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
    console.log("formatted events: ", events);
  };

  const fetchGrounds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/all-grounds`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log("kajshr", response.data);
      if (response.status >= 400) {
        console.log("response", response);
        console.log("data", data);
        console.log("error", error);
        throw new Error(data.message);
      }
      setGrounds(data.grounds);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFormattedBookings = async () => {
    try {
      await fetchGrounds();
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/bookings`);
      const data = response.data;

      if (response.status >= 400) {
        throw new Error(data.message);
      }
      //remove the bookings before today
      const today = new Date();
      const formattedToday = moment(today).format("YYYY-MM-DD");
      console.log("formatted today: ", formattedToday);
      const filteredData = data.bookings.filter((booking) => {
        const formattedDate = moment(booking.bookingDate).format("YYYY-MM-DD");
        return formattedDate >= formattedToday;
      });
      const formattedEvents = formattedBookings({ bookings: filteredData });
      setEvents(formattedEvents);
      console.log("data of bookings: ", data);
      console.log("formatted bookings: ", formattedEvents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormattedBookings();
  }, [selectedGround]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* <Navbar /> */}
      {/* Dropdown to select ground */}
      <div className="flex pt-5 items-center justify-center">
        <select
          className="w-1/2 p-2 mt-2 rounded-lg text-black"
          onChange={(e) => setSelectedGround(e.target.value)}
        >
          <option value="">Select Ground</option>
          {grounds.map((ground) => (
            <option key={ground._id} value={ground._id}>
              {ground.name}
            </option>
          ))}
        </select>
      </div>
      <div className="p-20 pt-2 max-sm:p-5 max-sm:pt-20 bg-gray-800 text-white">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={formattedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, marginTop: "20px" }}
            className="bg-gray-100 text-black w-full md:w-3/4 lg:w-full mx-auto p-10 max-sm:p-0 rounded-xl shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default GeneralBooking;
