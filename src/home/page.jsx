import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { IoIosFootball } from "react-icons/io";
import { Link } from "react-router-dom";

// Import images for the slideshow
import wallpaperfb from "../assets/wallpaperfb.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

import dcalogo from "../assets/logos/dca-logo.png";
import dca from "../assets/logos/dca.png";
import dfa from "../assets/logos/dfa.png";
import totalfootball from "../assets/logos/totalfootball.png";
import totalpremier from "../assets/logos/totalpremier.jpeg";

import GeneralBooking from "./calendar";
import LeaveReview from "./leavereview";
import Newsletter from "./newsletter";
import Footer from "./footer";

const Home = () => {
  // State for managing the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of images for the slideshow
  const slides = [wallpaperfb,image1, image2, image3, image4];

  // Effect to change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3900); 
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="bg-gray-800 text-white min-h-screen overflow-hidden">
      <Navbar />
      {/* Slideshow Hero Section */}
      <div
        className="p-20 flex items-end text-white min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slides[currentSlide]})`,
          transition: "background-image 1s ease-in-out", 
        }}
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
            <Link to="/customer/booking" className="bg-red-500 px-4 py-2 rounded-md btn border-0">
              <div>Book Now</div>
            </Link>
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

      {/* Booking Section */}
      <div className="p-20 bg-gray-900 max-sm:p-10">
        <p className="text-3xl font-bold text-center flex items-center justify-center gap-3 max-sm:flex-col">
          <IoIosFootball className="text-red-500 text-4xl" />
          Booking a slot has never been easier!
        </p>
        <p className="text-center mt-2 text-md">
          Book a slot at Dream Arena with a few simple clicks Register now to
          get started.
        </p>
        <div className="flex justify-center mt-4">
          <Link to="/customer/booking" className="bg-red-500 px-4 py-2 rounded-md btn hover:bg-red-700 border-none w-96 max-sm:w-1/2">
            <div>Book Now</div>
          </Link>
        </div>
      </div>

      {/* Other Sections */}
      <GeneralBooking />
      <Newsletter />
      <LeaveReview />
      <Footer />
    </div>
  );
};

export default Home;
