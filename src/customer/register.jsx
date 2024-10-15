import React,{useState} from "react";
import AuthServices from "../services/AuthServices";
//example post request
// {
//     "username": "customer",
//     "password": "customer",
//     "email": "customer@gmail.com",
//     "address": "customer address",
//     "phone": "+1234567890",
//     "dob": "1990-01-01",
//     "team": "customer team"
// }


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
        <div className="flex ">
            <div className="w-1/2 h-screen max-sm:w-0 max-md:w-1/3">
                <img src={dfa1} alt="dfa1" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center justify-center h-screen gap-4 w-1/2 max-sm:w-full max-md:w-2/3">
                <img src={logo} alt="logo" className="w-36 h-36" />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-center">DREAM FOOTBALL ARENA</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="address"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="phone"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="dob"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <input
                        type="text"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        placeholder="team"
                        className="rounded-md p-3 border border-gray-300"
                    />
                    <button
                        className={`btn btn-primary mt-5 w-96 max-sm:w-full text-white rounded-full ${
                            loading ? "cursor-not-allowed" : ""
                        }`}
                        type="submit"
                    >
                        {loading && <span className="loading loading-spinner"></span>}
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;