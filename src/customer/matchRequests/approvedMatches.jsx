import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';
import { useUser } from '../../context/userContext';
import ApprovedMatchCard from './approvedMatchCard';

const URL = import.meta.env.VITE_BACKEND_URL;

const ApprovedMatches = ({ customerId }) => {
  const [approvedMatches, setApprovedMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {customer} = useUser();

  useEffect(() => {
    const fetchApprovedMatches = async () => {

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${URL}/customer/match-requests/approved/${customer._id}`,{
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        const data = response.data;
        console.log('response', response)
        if(response.status > 400){
          throw new Error(data.message);
        }
        setApprovedMatches(data.approvedRequests);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedMatches();
  }, [customerId]);

  if(!customer){
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-white">Please login to view your approved matches!</p>
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
          {(approvedMatches && approvedMatches.length > 0 ) ? ( approvedMatches.map((match) => (
            <ApprovedMatchCard key={match._id} match={match} />
          )))
          : (
            <div className="flex justify-center items-center h-96">
              <p className="text-white">No approved matches found!</p>
            </div>
          )
        }
        </>
      )}
    </div>
  );
};

export default ApprovedMatches;
