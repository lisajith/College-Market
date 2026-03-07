import React, { useEffect, useState } from 'react';

function MyPosts({ user }) {
  const [myItems, setMyItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', price: '', contact: '', imageUrl: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/items/mine', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMyItems(data));
  }, []);

  const deleteItem = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setMyItems(myItems.filter(item => item._id !== id));
  };

  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      price: item.price,
      contact: item.contact,
      imageUrl: item.imageUrl || ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editForm)
    });
    const data = await res.json();
    setMyItems(myItems.map(item => item._id === id ? data : item));
    setEditingItem(null);
  };

  return (
    <div className="page">
      <h2>My Posts</h2>
      <div className="posts-grid">
        {myItems.map(item => (
          <div key={item._id} className="item-card">
            {editingItem === item._id ? (
              <div>
                <input name="title" value={editForm.title} onChange={handleEditChange} />
                <input name="description" value={editForm.description} onChange={handleEditChange} />
                <input name="price" type="number" value={editForm.price} onChange={handleEditChange} />
                <input name="contact" value={editForm.contact} onChange={handleEditChange} />
                <input name="imageUrl" value={editForm.imageUrl} onChange={handleEditChange} />
                <button onClick={() => saveEdit(item._id)}>Save</button>
                <button onClick={() => setEditingItem(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} />
                )}
                <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>

                <div className="card-footer end-footer">
              {user ? (
                <p className="contact"><strong>Contact:</strong> {item.contact}</p>
              ) : (
                <p className="contact"><em>Login to see contact info</em></p>
              )}
              <p className="postedBy"><strong>Posted By:</strong> {item.postedBy}</p>
            </div>

                <div className="card-actions">
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                  <button onClick={() => startEdit(item)}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;