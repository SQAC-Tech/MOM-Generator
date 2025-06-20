import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/auth/signup',
        { name, email, password },
        { withCredentials: true }
      );
          localStorage.setItem("authToken", res.data.token);
      navigate('/dashboard'); // Redirect to dashboard on successful signup
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        
        <div className="flex justify-center mb-4">
  <img
    src="/public/SQAClogo.png"
    alt="SQAClogo"
    className="h-16 w-auto"
  />
</div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">SRM Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your SRM email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

         <div>
  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-14"
      placeholder="Enter your password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-2 px-2 text-sm text-purple-500 hover:text-purple-700 focus:outline-none cursor-pointer"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>


          <button
            type="submit"
            className="w-full bg-purple-400 text-white font-semibold py-2 rounded-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
