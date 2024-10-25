import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard';

const ApprovedMatches = ({ customerId }) => {
  const [approvedMatches, setApprovedMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/customer/match-requests/approved/${customerId}`);
        setApprovedMatches(response.data.approvedRequests);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedMatches();
  }, [customerId]);

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
          {approvedMatches ? ( approvedMatches.map((match) => (
            <MatchCard key={match._id} match={match} />
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
