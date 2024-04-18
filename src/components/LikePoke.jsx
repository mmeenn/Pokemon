import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikePoke({ disLikeId }) {
  const [like, setLike] = useState(false)
  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <button onClick={toggleLike}>
      {like ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
    </button>
  );
}

export default LikePoke;
