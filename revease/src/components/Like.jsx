// Like.jsx
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
      try {
        const countResponse = await axios.get(
          'http://127.0.0.1:8000/api/likes/count/',
          {
            params: { review: reviewId },
          }
        );
        setLikes(countResponse.data.count);

        if (user && user.id && token) {
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
        console.error('Error fetching likes:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        }
        setError('Erro ao carregar likes.');
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchLikes();
    } else {
      console.error('ID Review not defined.');
      setError('Review not found.');
      setIsLoading(false);
    }
  }, [reviewId, token, user]);

  const handleLike = async () => {
    if (!token) {
      setError('You need to be logged in to enjoy.');
      return;
    }

    try {
      console.log('Enviando reviewId:', reviewId);
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
      console.error('Error posting like:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        if (
          error.response.status === 400 &&
          error.response.data.detail === 'You already liked this review.'
        ) {
          setLiked(true);
        }
      }
      setError('Error while liking/disliking.');
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
