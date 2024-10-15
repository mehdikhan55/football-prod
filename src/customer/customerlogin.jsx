import React, { useState } from "react";
import AuthServices from "../services/AuthServices";
import logo from "../assets/logoWhite.png";
import registebg from "../assets/register.png";
import { BsGoogle } from "react-icons/bs";
import { Navigate } from "react-router-dom";


const teams = ["Arsenal", "Aston Villa", "Brentford"];

const LoginCustomer = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
   window.location.href = "/customer/booking";
    setLoading(false);
    // try {
    //   const response = await AuthServices.registerCustomer({
    //     username,
    //     password,
    //     email,
    //     address,
    //     phone,
    //     dob,
    //     team,
    //   });
    //   if (response.error) {
    //     setError(response.error);
    //   } else {
    //     setError(null);
    //   }
    // } catch (error) {
    //   setError(error);
    // } finally {
    //   //take to the dashboard
    
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex-col bg-gray-800" style={{ backgroundImage: `url(${registebg})`, backgroundSize: "cover" }}>
      <div className="flex flex-col items-center justify-center h-screen gap-4 max-sm:w-full max-md:w-2/3">
        <div className="bg-gray-700 shadow-lg p-10 rounded-3xl w-1/3 bg-opacity-40 max-sm:w-full max-md:w-full">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                DREAM <span className="text-[#EF4444]">ARENA</span>
              </h1>
              <p className="text-white text-center">
                Login to book your favorite ground
              </p>
            </div>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="rounded-md p-3 border border-gray-300 w-full opacity-70"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="rounded-md p-3 border border-gray-300  w-full opacity-70"
              />
            </div>
        
            <div className="flex items-center justify-center">
              <button
                className={`btn btn-primary bg-[#EF4444] border-none hover:bg-[#a63030] hover:scale-105 mt-5 w-96 max-sm:w-full text-white rounded-full ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
              >
                {loading && <span className="loading loading-spinner"></span>}
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-white">
                Don't have an account?{" "}
                <a href="/customer/register" className="text-[#EF4444]">
                  Register
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center text-white border-t border-gray-300">
              {" "}
            </div>

            <div className="flex items-center justify-center text-white">
              <BsGoogle className="text-2xl text-red-500" />
              <span className="ml-2">Sign in with Google</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
