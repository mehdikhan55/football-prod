import React, { useState } from 'react'
import AddBooking from './addBooking';
import EditBooking from './viewAllBooking';
import ViewAllBooking from './viewAllBooking';

const Booking = () => {
    const [activeTab, setActiveTab] = useState('Add Booking');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='flex flex-col max-w-[1400px] mx-auto'>
            <div role="tablist" className="tabs  tabs-boxed sm:w-1/2 pt-4 w-full leading-tight mx-auto gap-4 sm:mt-10 mt-20">
                <a
                    role="tab"
                    className={`tab btn ${activeTab === 'Add Booking' ? 'tab-active bg-green-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => handleTabClick('Add Booking')}
                >
                    Add Booking
                </a>
                <a
                    role="tab"
                    className={`tab btn ${activeTab === 'View Bookings' ? 'tab-active bg-green-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => handleTabClick('View Bookings')}
                >
                    View Bookings
                </a>
            </div>

            <div className=" p-4">
                {activeTab === 'Add Booking' && <AddBooking />}
                {activeTab === 'View Bookings' && <ViewAllBooking />}
            </div>
        </div>
    )
}

export default Booking
