import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SaveToken(props) {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const saveToken = async () => {
      try {
        // Make a POST request to save the token
        const response = await fetch('http://localhost:3000/gettoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: token }),
        });
        const data = await response.json();
        // Save the token in localStorage
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (error) {
        console.error('Error saving token:', error);
      }
    };

    saveToken();

    // Optional cleanup function if needed
    return () => {
      // Clean up code if needed
    };
  }, [navigate, token]);

  return (
    <>
   
    </>
  );
}