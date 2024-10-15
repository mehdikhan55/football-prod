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
            <div role="tablist" className="tabs tabs-boxed w-1/2 mx-auto ">
                <a
                    role="tab"
                    className={`tab ${activeTab === 'Add Booking' ? 'tab-active bg-green-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => handleTabClick('Add Booking')}
                >
                    Add Booking
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'View Bookings' ? 'tab-active bg-green-700 text-white' : 'bg-gray-200 text-gray-600'}`}
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