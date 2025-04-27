import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
}