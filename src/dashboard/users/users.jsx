import React, { useState } from "react";
import AdminSiderbar from "../../components/sidebar/sidebar";
import { dummyUserData } from "./dummyUserData";

const Users = () => {
  const [users, setUsers] = useState(dummyUserData);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Calculate indexes for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const blockUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status =
      updatedUsers[index].status === "active" ? "blocked" : "active";
    setUsers(updatedUsers);
  };

  return (
    <div className="p-20 h-screen ">
      <AdminSiderbar />

      <div className="p-5 w-full">
        <h1 className="text-5xl font-bold pb-4">Manage the users</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Team
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.team}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="flex items-center px-6 py-4">
                  {/* Button to open the modal for user details */}
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() =>
                      document.getElementById(`modal-${index}`).showModal()
                    }
                  >
                    See Details
                  </button>

                  <button
                    onClick={() => blockUser(index)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </button>

                  {/* User Info Modal */}
                  <UserInfoModal user={user} modalId={`modal-${index}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`btn ${
                  currentPage === number + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } px-4 py-2 rounded btn`}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

const UserInfoModal = ({ user, modalId }) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-gray-900 text-white w-11/12 max-w-5xl relative p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-2xl mb-4 border-b border-gray-700 pb-2">
          User Details: {user.username}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-lg leading-7">
          <p>
            <strong>Email:</strong> <span className="ml-4">{user.email}</span>
          </p>
          <p>
            <strong>Phone:</strong> <span className="ml-4">{user.phone}</span>
          </p>
          <p>
            <strong>Address:</strong>{" "}
            <span className="ml-4">{user.address}</span>
          </p>
          <p>
            <strong>Team:</strong> <span className="ml-4">{user.team}</span>
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            <span className="ml-4">{user.dob.toDateString()}</span>
          </p>
          <p>
            <strong>Points:</strong> <span className="ml-4">{user.points}</span>
          </p>
          <p>
            <strong>Status:</strong> <span className="ml-4">{user.status}</span>
          </p>
        </div>

        <button
          onClick={() => document.getElementById(modalId).close()}
          className="btn absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
