import React, { useState } from "react";
import AuthServices from "../services/AuthServices";
import logo from "../assets/logoWhite.png";
import registebg from "../assets/register.png";
import { BsGoogle } from "react-icons/bs";

const teams = ["Arsenal", "Aston Villa", "Brentford"];

const Register = () => {
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
    try {
      const response = await AuthServices.registerCustomer({
        username,
        password,
        email,
        address,
        phone,
        dob,
        team,
      });
      if (response.error) {
        setError(response.error);
      } else {
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col bg-gray-800" style={{ backgroundImage: `url(${registebg})`, backgroundSize: "cover" }}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 max-sm:w-full max-sm:p-4 max-md:w-2/3 overflow-auto">
        <div className="bg-gray-700 shadow-lg p-10 rounded-3xl w-2/3 bg-opacity-40 max-sm:p-2 max-sm:w-full">
          <div className="flex justify-between items-center mb-3  max-sm:text-center">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                DREAM <span className="text-[#EF4444]">ARENA</span>
              </h1>
              <p className="text-white text-center">
                Register to book your favorite ground
              </p>
            </div>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2 max-sm:flex-col">
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
            <div className="flex gap-2 max-sm:flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="rounded-md p-3 border border-gray-300  w-full opacity-70"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="address"
                className="rounded-md p-3 border border-gray-300 w-full opacity-70"
              />
            </div>
            <div className="flex gap-2 max-sm:flex-col">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone"
                className="rounded-md p-3 border border-gray-300  w-full opacity-70"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="dob"
                className="rounded-md p-3 border border-gray-300  w-full opacity-70"
              />
            </div>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="rounded-md p-3 border border-gray-300 text-black w-full opacity-70"
            >
              <option value="">None</option>
              {teams.map((team, index) => (
                <option className="text-black" key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-center">
              <button
                className={`btn btn-primary bg-[#EF4444] border-none hover:bg-[#a63030] hover:scale-105 mt-5 w-96 max-md:w-full max-sm:w-full text-white rounded-full ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
              >
                {loading && <span className="loading loading-spinner"></span>}
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-white">
                Already have an account?{" "}
                <a href="/customer/login" className="text-[#EF4444]">
                  Login
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

export default Register;
