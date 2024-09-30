import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Like = () => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/likes/");
        setLikes(response.data.count);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/likes/");
      setLikes(response.data.count);
    } catch (error) {
      console.error("Error posting like:", error);
    }
  };

  return (
    <div>
      <h2>Likes: {likes}</h2>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Like;
