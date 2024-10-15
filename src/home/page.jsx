import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import { IoIosFootball } from "react-icons/io";

import dcalogo from "../assets/logos/dca-logo.png";
import dca from "../assets/logos/dca.png";
import dfaacademy from "../assets/logos/dfa-academy.jpg";
import dfa from "../assets/logos/dfa.png";
import totalfootball from "../assets/logos/totalfootball.png";
import totalpremier from "../assets/logos/totalpremier.jpeg";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="p-20 flex items-center h-screen bg-gray-800 text-white">
        <div className="w-1/2 ">
          <div className="flex items-end gap-1">
            <IoIosFootball className="text-lg text-red-500" />
            <IoIosFootball className="text-xl text-red-500" />
            <IoIosFootball className="text-2xl text-red-500" />
          </div>
          <h1 className="text-4xl font-bold uppercase">
            Welcome to the <span className="text-red-500"> Dream Arena</span>
          </h1>
          <p className="text-md mt-2">
            Dream Arena by Dream Enterprises is an unparalleled sports complex
            designed to bring the vibrant football and cricket culture of
            Pakistan to life. Built with the spirit of community and excellence,
            the arena provides a premier space for players of all ages and skill
            levels.
          </p>
          <div className="mt-4 flex">
            <button className="bg-red-500 px-4 py-2 rounded-md btn">
              Book Now
            </button>
            <button className="bg-gray-500 px-4 py-2 rounded-md btn ml-4">
              Learn More
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <img src={dcalogo} alt="dca" className="h-16" />
            <img src={dca} alt="dca" className="h-16" />
            <img src={dfa} alt="dca" className="h-16" />
            <img src={totalfootball} alt="dca" className="h-16" />
            <img src={totalpremier} alt="dca" className="h-16" />
          </div>
        </div>
        <div className="w-1/2 h-screen"></div>
      </div>
    </div>
  );
};

export default Home;
