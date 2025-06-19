import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MOMForm from './components/MOMForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mom" element={<MOMForm />} />
      </Routes>
    </Router>
  );
}

export default App;

