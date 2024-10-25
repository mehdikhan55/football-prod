import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL;

export const UserContext = createContext();

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const UserProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [fetchingCustomer, setFetchingCustomer] = useState(false);
    const [errorFetchingCustomer, setErrorFetchingCustomer] = useState(null);

    const fetchCustomer = async () => {
        try {
            setFetchingCustomer(true);
            setErrorFetchingCustomer(null);
            const response = await axios.get(`${URL}/customer/self`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`, // Ensure you send the token
                },
            });
            console.log('Response of user context is:', response.data);
            if(response.status > 400){
                throw new Error(response.data.message || "An error occurred");
            }
            setCustomer(response.data.customer); 
        } catch (error) {
            console.log('Error is:', error.response?.data?.message || error.message);
            setErrorFetchingCustomer(error.response?.data?.message || "An error occurred");
        } finally {
            setFetchingCustomer(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    return (
        <UserContext.Provider value={{ customer, fetchingCustomer, errorFetchingCustomer, fetchCustomer }}>
            {children}
        </UserContext.Provider>
    );
};
