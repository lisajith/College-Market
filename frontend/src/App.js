import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import PostItem from './components/PostItem';
import Login from './components/Login';
import Register from './components/Register';
import MyPosts from './components/MyPosts';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { fetchItems } from "./api";


function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
  fetchItems().then(res => setItems(res.data));
}, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        });
    }

    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = "/"; // ✅ redirect to home
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<ItemList items={items} user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ItemList items={items} user={user} />} />
            <Route path="/post" element={<PostItem onAdd={(newItem) => setItems([...items, newItem])} />} />
            <Route path="/myposts" element={<MyPosts user={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;