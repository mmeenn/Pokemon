import React, { useState } from "react";
import { FaHeartBroken } from "react-icons/fa";

function FavPoke({ fav, unLikePoke }) {
  return (
    <div className="max-w-5xl mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {fav?.map((data, idx) => (
        <div key={idx}>
          <h3>{data?.name}</h3>
          <img
            src={data?.sprites?.other?.home?.front_default}
            alt={data?.name}
          />
          <br />
          <button
            onClick={() => {
              unLikePoke(data?.id);
            }}
          >
            <FaHeartBroken />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavPoke;
