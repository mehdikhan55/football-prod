import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegNewspaper, FaArrowRight } from 'react-icons/fa';

const URL = import.meta.env.VITE_BACKEND_URL;

const NewsBox = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the news from the backend
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${URL}/news`);
      if (response.status >= 400) {
        throw new Error(response.data.message);
      }
      setNews(response.data.news);  // Assuming response contains news data in an array
    } catch (error) {
      setError(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();  // Fetch news when the component mounts
  }, []);

  return (
    <section className="bg-transparent py-8 px-4 mx-auto max-w-screen-xl">
      <div className="mx-auto max-w-screen-lg sm:text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-100 mb-6">
          Latest News
        </h2>
        {error && (
          <div role="alert" className="alert alert-error leading-tight flex justify-between py-2 mb-4 text-red-600 bg-red-100 rounded-md">
            <span>{error}</span>
            <button className="btn btn-sm border-none" onClick={() => setError(null)}>
              x
            </button>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
            {news.length > 0 ? (
              // Display the first 4 news items in a grid layout
              news.slice(0, 4).map((item) => (
                <div key={item._id} className="bg-white min-h-40 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 p-4">
                    <div className="flex flex-col items-start pb-4 space-y-2 text-primary-600">
                      <FaRegNewspaper className="text-2xl" />
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-left text-sm mb-4">{item.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 text-lg">No news available at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsBox;
