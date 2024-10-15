import React from 'react';
import AdminSiderbar from '../../components/sidebar/sidebar';

// Sample user data following the customer schema
const dummyUserData = [
    {
        username: 'john_doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Springfield',
        phone: '123-456-7890',
        dob: new Date('1990-05-14'),
        team: 'Team Alpha',
        points: 100,
        status: 'active',
        leftReview: false,
        createdAt: new Date(),
    },
    {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        address: '456 Elm St, Metropolis',
        phone: '987-654-3210',
        dob: new Date('1985-10-20'),
        team: 'Team Beta',
        points: 150,
        status: 'blocked',
        leftReview: true,
        createdAt: new Date(),
    },
    {
        username: 'bob_jones',
        email: 'bob.jones@example.com',
        address: '789 Oak St, Gotham',
        phone: '555-555-5555',
        dob: new Date('1992-03-07'),
        team: 'Team Gamma',
        points: 50,
        status: 'active',
        leftReview: false,
        createdAt: new Date(),
    },
];

const Users = () => {
    return (
        <div className="pt-16 pb-16 h-screen ">
            <AdminSiderbar />

            <div className="max-w-7xl mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className='text-5xl font-bold pb-4'>Manage the users</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Team</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyUserData.map((user, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.username}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.address}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">{user.team}</td>
                                <td className="px-6 py-4">{user.status}</td>
                                <td className="flex items-center px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        See Details
                                    </a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                                        Block
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
