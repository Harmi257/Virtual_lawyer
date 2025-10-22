import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    roles: [],
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.register(form.username, form.email, form.password, form.roles)
      .then(() => setMessage('Registered successfully!'))
      .catch((err) => setMessage(err.response?.data?.error || 'Registration failed'));
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <div className="roles">
          <label>
            <input
              type="checkbox"
              value="ROLE_USER"
              checked={form.roles.includes('ROLE_USER')}
              onChange={handleRoleChange}
            />
            User
          </label>
          <label>
            <input
              type="checkbox"
              value="ROLE_LAWYER"
              checked={form.roles.includes('ROLE_LAWYER')}
              onChange={handleRoleChange}
            />
            Lawyer
          </label>
          <label>
            <input
              type="checkbox"
              value="ROLE_ADMIN"
              checked={form.roles.includes('ROLE_ADMIN')}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>

        <button type="submit">Register</button>

        {message && <p className="message">{message}</p>}
      </form>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 The Virtual Lawyer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
