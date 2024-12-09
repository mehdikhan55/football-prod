import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import { useTeam } from "../../context/teamContext";

const URL = import.meta.env.VITE_BACKEND_URL

const localizer = momentLocalizer(moment);

const events = [
    {
        title: "My event",
        start: new Date(),
        end: new Date(),
    },
];

const BookingHistory = [
    {
        id: 1,
        bookingDate: "2021-09-01",
        bookingTime: "10:00",
        bookingDuration: 1,
        bookingPrice: 100,
        bookingStatus: "pending",
        paymentMethod: "cash",
        paymentStatus: "pending",
        paymentDate: "2021-09-01",
        ground: "Ground 1",
    },
    {
        id: 2,
        bookingDate: "2021-09-01",
        bookingTime: "10:00",
        bookingDuration: 1,
        bookingPrice: 100,
        bookingStatus: "pending",
        paymentMethod: "cash",
        paymentStatus: "pending",
        paymentDate: "2021-09-01",
        ground: "Ground 1",
    },
    {
        id: 3,
        bookingDate: "2021-09-01",
        bookingTime: "10:00",
        bookingDuration: 1,
        bookingPrice: 100,
        bookingStatus: "pending",
        paymentMethod: "cash",
        paymentStatus: "pending",
        paymentDate: "2021-09-01",
        ground: "Ground 1",
    },
    {
        id: 4,
        bookingDate: "2021-09-01",
        bookingTime: "10:00",
        bookingDuration: 1,
        bookingPrice: 100,
        bookingStatus: "pending",
        paymentMethod: "cash",
        paymentStatus: "pending",
        paymentDate: "2021-09-01",
        ground: "Ground 1",
    },
];

const TeamsBooking = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookingDuration, setBookingDuration] = useState(1.5);
    const [bookingPrice, setBookingPrice] = useState(0);
    const [bookingStatus, setBookingStatus] = useState("pending");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [teamRequired, setTeamRequired] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [paymentDate, setPaymentDate] = useState("");
    const [ground, setGround] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookingHistoryData, setBookingHistoryData] = useState([]);

    const { currTeam, isFetchingTeam } = useTeam();


    const [grounds, setGrounds] = useState([]);

    const handleDialogToggle = () => {
        setIsDialogOpen(!isDialogOpen);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('yes')
            const newBooking = {
                customer: null,
                team: currTeam._id,
                bookingDate: new Date(bookingDate),
                bookingTime,
                bookingDuration,
                bookingPrice,
                bookingStatus,
                paymentMethod,
                paymentStatus,
                teamRequired,
                paymentDate: paymentDate ? new Date(paymentDate) : null,
                ground,
            };
            console.log('no')
            console.log('yes new booking:', newBooking);

            const response = await axios.post(`${URL}/teams/bookings`, newBooking, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            console.log("response", response);
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            toast.success('Booking added successfully');
            resetForm();
            handleDialogToggle();
        } catch (error) {
            console.log('error:', error);
            if (error.response) {
                setError(error.response.data.message || "Error creating booking");
                toast.error(error.response.data.message || "Error creating booking");
            } else {
                setError("Error creating booking");
                toast.error("Error creating booking");
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setBookingDate("");
        setBookingTime("");
        setBookingDuration(1);
        setBookingPrice(0);
        setBookingStatus("pending");
        setPaymentMethod("");
        setPaymentStatus("pending");
        setTeamRequired(false);
        setPaymentDate("");
        setGround("");
    };

    const fetchGrounds = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/all-grounds`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });
            const data = response.data;
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            setGrounds(data.grounds);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };



    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${URL}/teams/bookings`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });
            const data = response.data;
            console.log('response of fetchBookings:', response);
            if (response.status >= 400) {
                throw new Error(data.message);
            }
            console.log('currTeam:', currTeam);
            console.log('no')
            const specificBookings = data.bookings.filter(booking => {
                return booking.team != null;
            }).filter(booking => booking.team._id === currTeam._id);
            setBookingHistoryData(specificBookings);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        fetchGrounds();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-20 max-sm:p-5 max-sm:pt-20 mt-10 bg-gray-800 text-white min-h-screen">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Teams Bookings</h1>
                    <button
                        className="btn bg-red-500 hover:bg-red-700 border-0 flex items-center gap-2"
                        onClick={handleDialogToggle}
                    >
                        <FaPlus className="text-white" />
                        Add Booking
                    </button>
                </div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: "20px" }}
                    className="bg-white text-black w-full md:w-3/4 lg:w-full mx-auto"
                />

                <div className="mt-10">
                    <h1 className="text-2xl font-bold">Booking History</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {bookingHistoryData.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-gray-700 p-5 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-center">
                                    <h1 className="text-xl font-bold">
                                        Booking ID: {booking._id}
                                    </h1>
                                    <BiHistory className="text-white text-3xl" />
                                </div>
                                <div className="flex justify-end items-center mt-2">
                                    <p>
                                        {booking.bookingDate} {booking.bookingTime}
                                    </p>
                                </div>
                                <p>
                                    <span className="font-bold">Duration:</span>{" "}
                                    {booking.bookingDuration} minutes
                                </p>

                                <p>
                                    <span className="font-bold">Payment Method:</span>{" "}
                                    {booking.paymentMethod}
                                </p>

                                <p>
                                    <span className="font-bold">Ground:</span> {booking.ground.name}
                                </p>
                                {/* <div className="flex justify-between items-center">
                                    <p> {booking.bookingPrice}/-</p>
                                </div> */}
                                <p
                                    className={`rounded-full px-4 text-black font-bold text-sm mt-3 text-center py-2 ${booking.bookingStatus === "pending"
                                        ? "bg-yellow-500"
                                        : booking.bookingStatus === "approved"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}
                                >
                                    {booking.bookingStatus}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {isDialogOpen && (
                    <div className="modal modal-open ">
                        <div className="modal-box bg-gray-500">
                            <h1 className="text-2xl font-bold mb-4">Add a new Booking</h1>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4 text-black"
                            >
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                                <input
                                    type="time"
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                                <label htmlFor="bookingDuration" className="text-white">
                                    Booking Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={bookingDuration}
                                    onChange={(e) => setBookingDuration(Number(e.target.value))}
                                    className="input input-bordered"
                                    min="1"
                                    required
                                    step="0.1"
                                />
                                <label htmlFor="teamRequired" className="text-white">
                                    Team Required?
                                </label>
                                <input
                                    type="checkbox"
                                    checked={teamRequired}
                                    onChange={(e) => setTeamRequired(e.target.checked)}
                                    className="p-3 rounded-md input-bordered disabled:opacity-50 self-start bg-white w-6 h-6 accent-[#9ce37d] cursor-pointer"
                                />
                                {/* <label htmlFor="bookingPrice" className="text-white">
                                    Booking Price
                                </label>
                                <input
                                    type="number"
                                    value={bookingPrice}
                                    onChange={(e) => setBookingPrice(Number(e.target.value))}
                                    className="p-3 rounded-md input-bordered disabled:opacity-50 bg-white"
                                    disabled
                                    min="0"
                                    required
                                /> */}
                                <label htmlFor="bookingPaymentMethod" className="text-white">
                                    Payment Method
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="input input-bordered"
                                    required
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="easypaisa">Easypaisa</option>
                                    <option value="cash">Cash</option>
                                    <option value="bankTransfer">Bank Transfer</option>
                                </select>
                                <select
                                    value={ground}
                                    onChange={(e) => setGround(e.target.value)}
                                    className="input input-bordered"
                                    required
                                >
                                    <option value="">Select Ground</option>
                                    {grounds.map((ground) => (
                                        <option key={ground._id} value={ground._id}>
                                            {ground.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Creating Booking..." : "Create Booking"}
                                </button>
                            </form>
                            <div className="modal-action">
                                <button
                                    onClick={handleDialogToggle}
                                    className="btn btn-secondary"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamsBooking;
