import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    rollNo: '', 
    password: '', 
    role: 'First Year' 
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://college-market-ten.vercel.app/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();

    if (data.message) {
      alert(data.message);
      navigate('/login'); // ✅ redirect to Login page after successful registration
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="First Year">First Year</option>
        <option value="Second Year">Second Year</option>
        <option value="Third Year">Third Year</option>
        <option value="Final Year">Final Year</option>
        <option value="Graduated">Graduated</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;