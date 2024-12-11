import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useAuth } from './AuthContext';
import './Auth.css';  // Make sure to import the new CSS file

const Auth: React.FC = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Failed to log out.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="auth-container">
      {user ? (
        <div className="user-welcome">
          <h2>Welcome, {user.displayName || 'User'}</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
