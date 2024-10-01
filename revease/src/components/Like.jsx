import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Like = ({ reviewId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const { token, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!token) {
        setError('You need to be logged in to view likes.');
        setIsLoading(false);
        return;
      }

      try {
        const countResponse = await axios.get(
          'http://127.0.0.1:8000/api/likes/count/',
          {
            params: { review: reviewId },
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLikes(countResponse.data.count);

        if (user && user.id) {
          const likeCheckResponse = await axios.get(
            'http://127.0.0.1:8000/api/likes/',
            {
              params: { review: reviewId, author: user.id },
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          if (likeCheckResponse.data.length > 0) {
            const userLike = likeCheckResponse.data[0];
            setLiked(true);
            setLikeId(userLike.id);
          } else {
            setLiked(false);
            setLikeId(null);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
        } else {
          setError('Error loading likes.');
        }
        console.error('Error fetching likes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchLikes();
    } else {
      setError('Review not found.');
      setIsLoading(false);
    }
  }, [reviewId, token, user]);

  const handleLike = async () => {
    if (!token) {
      setError('You need to be logged in to like this review.');
      return;
    }

    try {
      if (liked && likeId) {
        await axios.delete(
          `http://127.0.0.1:8000/api/likes/${likeId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLikes(likes - 1);
        setLiked(false);
        setLikeId(null);
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/likes/',
          { review: reviewId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLikes(likes + 1);
        setLiked(true);
        setLikeId(response.data.id);
      }
    } catch (error) {
      setError('Error while liking/disliking. Please try again.');
      console.error('Error when enjoying the review:', error);
    }
  };

  if (isLoading) {
    return <div>Loading likes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ marginLeft: '10px' }}>
      <button onClick={handleLike} className="btn btn-outline-primary me-2">
        {liked ? 'Dislike' : 'Like'}
      </button>
      <span>Likes: {likes}</span>
    </div>
  );
};

export default Like;
