import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Login failed:", err);
      setResponse("Login failed.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
};

export default Login;
