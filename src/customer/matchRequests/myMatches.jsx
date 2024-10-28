import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/userContext';
import MyMatchesMatchCard from './myMatchesMatchCard';

const URL = import.meta.env.VITE_BACKEND_URL;

const MyMatches = ({ customerId }) => {
  const [myMatches, setMyMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {customer} = useUser();

  const fetchMyMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/customer/match-requests/my-matches/${customer._id}`,{
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
      },
      });
      console.log('response', response); 
      setMyMatches(response.data.myMatches);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer){
    fetchMyMatches();
  }
  }, [customerId]);


  if(!customer){  
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-white">Please login to view your matches!</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      ) : (
        <>
          {error && (
            <div
              role="alert"
              className="alert alert-error leading-tight flex justify-between py-1 w-[84%] mx-auto mb-2"
            >
              <span>{error}</span>
              <button className="btn btn-sm border-none" onClick={() => setError(null)}>
                x
              </button>
            </div>
          )}
          {myMatches ? ( myMatches.map((match) => (
            <MyMatchesMatchCard fetchMyMatches={fetchMyMatches} key={match._id} match={match} />
          )))
          : (
            <div className="flex justify-center items-center h-96">
              <p className="text-white">No matches found!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyMatches;
