import React from 'react';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="container text-center my-5"><h3>Aapka Cart Khali Hai.</h3></div>;
  }

  return (
    <div className="container my-5">
      <h2>Shopping Cart</h2>
      <div className="table-responsive my-4">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} className="me-2" />
                  {item.title}
                </td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-sm btn-outline-secondary me-2">-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-sm btn-outline-secondary ms-2">+</button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Total Amount: ${total.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default Cart;