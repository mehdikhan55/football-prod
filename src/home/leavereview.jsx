import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import review from "../assets/review.png";
const LeaveReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-col md:flex-row items-center p-10">
      <div className="w-1/3 flex justify-center">
        <img src={review} alt="review" />
      </div>
      <div className="container w-2/3">
        <h1 className="text-md">
          Leave a Review for your experience with Dream Arena
        </h1>
        <div className="flex gap-2 mb-3 mt-3">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label className="flex items-center">
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(ratingValue)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          placeholder="Leave a review"
          className="w-full opacity-45 p-10 rounded-xl text-black"      
        ></textarea>
        <button className="btn bg-red-500 border-0 w-full hover:bg-red-700">
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default LeaveReview;
