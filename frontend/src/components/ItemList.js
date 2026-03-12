import React from 'react';

function ItemList({ items, user }) {
  return (
    <main>
      <h2>All Items</h2>
      <div className="posts-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>

            <div className="card-footer end-footer">
              {user ? (
                <p>...</p>
                // <p className="contact"><strong>Contact:</strong> {item.contact}</p>
              ) : (
                <p className="contact"><em>Login to see contact info</em></p>
              )}
              <p>...</p>
              {/* <p className="postedBy"><strong>Posted By:</strong> {item.postedBy}</p> */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ItemList;