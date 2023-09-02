import React, { useState } from 'react';
import axios from 'axios';
// no styling

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogIn = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/sign-in', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Authentication successful, you can handle the user data here
        const userData = response.data;
        console.log('User data:', userData);
      } else {
        // Authentication failed, display an error message
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors if needed
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LogIn;
