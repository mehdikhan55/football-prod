import React, { useState } from "react";
import AuthServices from "../services/AuthServices";
import logo from "../assets/logos/dca-logo.png";
import dfa1 from "../assets/dfa1.jpg";

const teams = [
    "Arsenal",
    "Aston Villa",
    "Brentford",
];

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
        <div className="flex bg-[#111827]">
            <div className="w-1/2 h-screen max-sm:w-0 max-md:w-1/3 ">
                <img src={dfa1} alt="dfa1" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center justify-center h-screen gap-4 w-1/2 max-sm:w-full max-md:w-2/3">
                <div className="bg-[#1F2937] shadow-lg p-10 rounded-3xl w-full max-w-md">
                    <img src={logo} alt="logo" className="w-36 h-36 mx-auto mb-4" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-center text-white">DREAM FOOTBALL ARENA</h1>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="address"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="phone"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                placeholder="dob"
                                className="rounded-md p-3 border border-gray-300 bg-transparent text-white w-full"
                            />
                        </div>
                        <select
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            className="rounded-md p-3 border border-gray-300 bg-[#1F2937] text-white w-full"
                        >
                            <option value="">None</option>
                            {teams.map((team, index) => (
                                <option className=" bg-[#1F2937] text-white" key={index} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center justify-center">
                            <button
                                className={`btn btn-primary bg-[#EF4444] border-none hover:bg-[#a63030] hover:scale-105 mt-5 w-96 max-sm:w-full text-white rounded-full ${loading ? "cursor-not-allowed" : ""}`}
                                type="submit"
                            >
                                {loading && <span className="loading loading-spinner"></span>}
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
