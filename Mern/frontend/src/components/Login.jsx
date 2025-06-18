import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/assigntask'); // Navigate to /assigntask on successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container py-4">
      {/* Inline CSS for styling, matching RolesManagement component */}
      <style>{`
        .form-box {
          background: linear-gradient(to right, #fefefe, #f0f0f0);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: 0.3s ease;
        }

        .form-box:hover {
          transform: translateY(-2px);
        }

        .form-box h2 {
          font-weight: 700;
          color: #2c3e50;
          text-align: center;
          margin-bottom: 20px;
        }

        .form-label {
          font-weight: 600;
          color: #34495e;
        }

        .form-control,
        .form-select { /* Included form-select for consistency, though not directly used here */
          border-radius: 10px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .btn-primary {
          background-color: #1d3557;
          border: none;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
          transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #457b9d;
        }

        .text-danger {
          font-weight: 500;
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 768px) {
          .form-box {
            padding: 20px;
          }
        }
      `}</style>

      <div className="form-box" style={{ maxWidth: "500px", margin: "80px auto 0 auto" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              className="form-control"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4"> {/* Changed to mb-4 for more spacing */}
            <label className="form-label">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              className="form-control"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
