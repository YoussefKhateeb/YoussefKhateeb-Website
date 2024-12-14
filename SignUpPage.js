import React, { useState } from 'react';

const SignUpPage = ({ setPage }) => {
  const [message, setMessage] = useState('');

  const handleSignUpPage = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    const username = e.target.Username.value.trim();
    const password = e.target.Password.value.trim();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Sign up successful! Redirecting to Login page...');
        setTimeout(() => setPage('login'), 2000); // Redirect after success
      } else {
        const result = await response.json();
        setMessage(result.error || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error during sign-up:', error);
      setMessage('Network error. Please check your server and try again.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUpPage}>
        <div>
          <input name="Username" placeholder="Username" required />
        </div>
        <div>
          <input name="Password" type="password" placeholder="Password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <div>{message}</div>}
      <div>
        Already have an account?{' '}
        <button onClick={() => setPage('login')}>Log in</button>
      </div>
    </div>
  );
};

export default SignUpPage;
