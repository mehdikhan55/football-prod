import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { BiCalendar } from "react-icons/bi";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "My event",
    start: new Date(),
    end: new Date(),
  },
];

const GeneralBooking = () => {
  return (
    <div>
      <Navbar />
      <div className="p-20 max-sm:p-5 max-sm:pt-20 bg-gray-800 text-white">


        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: "20px" }}
          className="bg-gray-100 text-black w-full md:w-3/4 lg:w-full mx-auto p-10 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default GeneralBooking;
