import React from "react";

const NewsCard = ({ newsItem, onRemove, type }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold">{newsItem.title}</h2>
      <p className="text-gray-600">{newsItem.content}</p>
      {type === "remove" && (
        <button
          className="btn btn-danger mt-2 text-white bg-red-500 hover:bg-red-700"
          onClick={() => onRemove(newsItem._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default NewsCard;
