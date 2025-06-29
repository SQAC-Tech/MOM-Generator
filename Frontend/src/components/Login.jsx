import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://mom-generator.onrender.com/auth/login',
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("authToken", res.data.token);
      navigate('/dashboard'); 
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">


        <div className="flex justify-center mb-4">
  <img
    src="/SQACLogo.png"
    alt="SQAClogo"
    className="h-16 w-auto"
  />
</div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
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
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-pink-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
