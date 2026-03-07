import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostItem({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    contact: '',
    rollNo: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // get JWT from login

    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    onAdd(data); // update state with saved item

    // reset form
    setForm({
      title: '',
      description: '',
      price: '',
      contact: '',
      rollNo: '',
      imageUrl: ''
    });

    // ✅ redirect to Home after posting
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>POST ITEM</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} required />
      <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
      <p>
        Don't have Image Url? Click here and create one! 👉{' '}
        <a href='https://catbox.moe/' target="_blank" rel="noopener noreferrer">CatBox</a>
      </p>
      <button type="submit">Post Item</button>
    </form>
  );
}

export default PostItem;