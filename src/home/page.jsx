import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import { IoIosFootball } from "react-icons/io";

import dcalogo from "../assets/logos/dca-logo.png";
import dca from "../assets/logos/dca.png";
import dfaacademy from "../assets/logos/dfa-academy.jpg";
import dfa from "../assets/logos/dfa.png";
import totalfootball from "../assets/logos/totalfootball.png";
import totalpremier from "../assets/logos/totalpremier.jpeg";

import wallpaperfb from "../assets/wallpaperfb.jpg";

import GeneralBooking from "./calendar";
import LeaveReview from "./leavereview";
import Newsletter from "./newsletter";
import Footer from "./footer";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen overflow-hidden">
      <Navbar />
      <div
        className="p-20 flex items-end text-white min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaperfb})` }}
      >
        <div className="w-full sm:w-1/2 mt-10">
          <div className="flex items-end gap-1">
            <IoIosFootball className="text-lg text-red-500" />
            <IoIosFootball className="text-xl text-red-500" />
            <IoIosFootball className="text-2xl text-red-500" />
          </div>
          <h1 className="text-4xl font-extrabold uppercase">
            Welcome to the <span className="text-red-700"> Dream Arena</span>
          </h1>
          <p className="text-md mt-2">
            Dream Arena by Dream Enterprises is an unparalleled sports complex
            designed to bring the vibrant football and cricket culture of
            Pakistan to life. Built with the spirit of community and excellence,
            the arena provides a premier space for players of all ages and skill
            levels.
          </p>
          <div className="mt-4 flex">
            <button className="bg-red-500 px-4 py-2 rounded-md btn border-0">
              <Link to="/customer/booking">Book Now</Link>
            </button>
            <button className="bg-gray-500 px-4 py-2 rounded-md btn ml-4 border-0">
              Learn More
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <img src={dcalogo} alt="dca" className="h-16" />
            <img src={dca} alt="dca" className="h-16" />
            <img src={dfa} alt="dca" className="h-16" />
            <img src={totalfootball} alt="dca" className="h-16" />
            <img src={totalpremier} alt="dca" className="h-16" />
          </div>
        </div>
      </div>
      <div className="p-20 bg-gray-900">
        <p className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <IoIosFootball className="text-red-500 text-4xl" />
          Booking a slot has never been easier!
        </p>
        <p className="text-center mt-2 text-md">
          Book a slot at Dream Arena with a few simple clicks Register now to
          get started.
        </p>
        <div className="flex justify-center mt-4">
          <button className="bg-red-500 px-4 py-2 rounded-md btn hover:bg-red-700 border-none w-96">
          <Link to="/customer/booking">Book Now</Link>
          </button>
        </div>
      </div>
      <GeneralBooking />
      <Newsletter />
      <LeaveReview />
      <Footer />
    </div>
  );
};

export default Home;
