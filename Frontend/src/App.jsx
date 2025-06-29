import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MOMForm from './components/MOMForm';;
import Credits from './components/Credits';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />    
        <Route path="/dashboard" element={<Dashboard/>}/> 
        <Route path="/mom" element={<MOMForm/>} />
           <Route path="/credits" element={<Credits/>}/> 
        
      </Routes>
    </Router>
  );
}

export default App;

