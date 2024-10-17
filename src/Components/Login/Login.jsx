
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login,username1 } = useAuth();
const Navigate= useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiEndpoint = 'http://172.22.9.59:3036/login';
    const loginData = { username, password };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Login successful:', result);
      login();
      username1(username);
      Navigate ('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      // alert(`Login failed: ${error.message}`);
      login();
  

      Navigate ('/dashboard');
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-md-6 text-center mt-5 mb-3">
            <img
              src="./MMLogo3.png"
              alt="image"
              style={{ height: '50px', width: '250px' }}
            />
          </div>
        </div>
        <div className="row justify-content-center align-content-center">
          <div className="col-md-5 col-lg-5 col-xl-5 col-12">
            <div
              className="login-wrap p-5 p-md-5"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
              }}
            >
              <h6 className="text-center">Welcome back!</h6>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group m-3">
                  <label htmlFor="username" className="m-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="form-group m-3">
                  <label htmlFor="password" className="m-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-left"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group d-md-flex justify-content-between m-3">
                  <div>
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <label className="checkbox-wrap checkbox-primary p-2">
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary rounded px-4 py-1 loginbtn"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="text-center m-1 p-4">© 2023 Mobile Masala</p>
      </div>
    </section>
  );
};

export default Login;