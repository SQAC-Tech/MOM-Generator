import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MOMForm from './components/MOMForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />    
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard/>
          </ProtectedRoute>
          }/> 
        <Route path="/mom" element={
          <ProtectedRoute>
          <MOMForm />
          </ProtectedRoute>
          } />
        
      </Routes>
    </Router>
  );
}

export default App;

