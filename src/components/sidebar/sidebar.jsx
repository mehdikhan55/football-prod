import React, { useState } from "react";
import LogoBG from "../../assets/logoWhite.png";
import { NavLink } from "react-router-dom";
import { RiFootballFill } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";

const AdminSiderbar = () => {
  const [show, handleShow] = useState(false);
  const [selected, setSelected] = useState("Grounds");
  return (
    <div className={`{show ? "overflow-hidden" : ""}`}>
      <a
        className=" bg-transparent text-black btn-primary btn focus:ring-4 font-medium text-sm px-3   focus:outline-none dark:focus:ring-blue-800 cursor-pointer absolute top-1 left-1 rounded-br-lg rounded-bl-lg border-2"
        type="button"
        data-drawer-target="drawer-navigation"
        data-drawer-show="drawer-navigation"
        aria-controls="drawer-navigation"
        onClick={() => handleShow(!show)}
      >
        Menu
      </a>
      <div
        id="drawer-navigation"
        className="fixed z-50 top-0 left-0 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full shadow-2xl border-r-4 border-gray-600 bg-secondary"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
        data-drawer="drawer-navigation"
        data-drawer-hide="drawer-navigation"
        data-drawer-hide-on-click="false"
        data-drawer-hide-on-esc="false"
        style={{
          transform: show ? "translateX(0)" : "translate(-100%)",
        }}
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-white uppercase dark:text-white"
        >
          Menu
        </h5>
        <div className="mt-10 mb-4 flex justify-center">
          <img src={LogoBG} alt="logo" className="w-20 h-20 rounded-full" />
        </div>
        <button
          onClick={() => handleShow(!show)}
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-white bg-transparent hover:bg-gray-200 hover::ext-gray-100 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin/dashboard/ground"
                className={`${selected == "Grounds" ? "bg-gray-700" : ''} flex items-center p-2 text-white hover::ext-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                onClick={() => setSelected("Grounds")}
              >
                <RiFootballFill className="w-5 h-5 text-white transition duration-75 dark:text-white group-hover::ext-gray-100 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Grounds</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/booking"
                className="flex items-center p-2 text-white hover::ext-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setSelected("Booking")}
              >
                <CiCalendar className="w-5 h-5 text-white transition duration-75 dark:text-white group-hover::ext-gray-100 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Booking</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/payments"
                href="#"
                className="flex items-center p-2 text-white hover::ext-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setSelected("Payments")}
              >
                <CiMoneyBill className="w-5 h-5 text-white transition duration-75 dark:text-white group-hover::ext-gray-100 dark:group-hover:text-white" />

                <span className="ms-3">Payment</span>
              </NavLink>
            </li>



            <li>
              <NavLink
                to="/admin/approval"
                className="flex items-center p-2 text-white hover::ext-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setSelected("Approval")}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover::ext-gray-100 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Approval</span>
              </NavLink>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white hover::ext-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-white dark:text-white group-hover::ext-gray-100 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a1 1 0 0 0-1 1v3H6a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0V6h3a1 1 0 0 0 0-2h-3V1a1 1 0 0 0-1-1ZM2.707 2.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0-1.414-1.414L5 3.586 3.707 2.293a1 1 0 0 0-1.414 0ZM17 10a1 1 0 0 0-1-1H13V6a1 1 0 0 0-2 0v3H7a1 1 0 0 0 0 2h4v3a1 1 0 0 0 2 0V11h3A1 1 0 0 0 17 10ZM17.707 13.707a1 1 0 0 0-1.414-1.414L15 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13.586 16l-1.293 1.293a1 1 0 0 0 1.414 1.414L15 17.414l1.293 1.293a1 1 0 0 0 1.414-1.414Z"></path>
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSiderbar;
