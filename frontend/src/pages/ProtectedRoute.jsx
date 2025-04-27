import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Add this library to decode JWT tokens if you're using them

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/signin" state={{ message: 'Please log in to access this page.' }} />;
  }

  try {
    // Decode the token to check for validity (if using JWT)
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token is expired
      localStorage.removeItem('token'); // Clear the expired token
      return <Navigate to="/signin" state={{ message: 'Session expired. Please log in again.' }} />;
    }
  } catch (error) {
    // Invalid token format or decoding error
    localStorage.removeItem('token');
    return <Navigate to="/signin" state={{ message: 'Invalid authentication. Please log in again.' }} />;
  }

  return children;
}
