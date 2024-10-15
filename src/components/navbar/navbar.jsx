import React,{useState} from "react";

import logoWhite from "../../assets/logoWhite.png";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="bg-gray-900 fixed top-0 w-full">
            <div className="flex justify-between items-center p-4">
                <div>
                    <img src={logoWhite} alt="logo" className="w-10 h-10" />
                </div>
                <div className="hidden md:flex gap-4">
                    <a href="/" className="text-white">Home</a>
                    <a href="/about" className="text-white">About</a>
                    <a href="/customer/booking" className="text-white">Booking</a>
                    <a href="/contact" className="text-white">Contact</a>
                    <a href="/login" className="text-white">Login</a>
                    <a href="/register" className="text-white">Register</a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setShowMenu(!showMenu)} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            {showMenu && (
                <div className="flex flex-col gap-4 p-4">
                    <a href="/" className="text-white">Home</a>
                    <a href="/about" className="text-white">About</a>
                    <a href="/contact" className="text-white">Contact</a>
                    <a href="/login" className="text-white">Login</a>
                    <a href="/register" className="text-white">Register</a>
                </div>
            )}
        </div>
    );
}

export default Navbar;