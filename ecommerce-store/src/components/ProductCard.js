import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <span className="badge">New</span>
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-rating">
          ★ {product.rating?.rate || '4.5'} <span className="reviews">({product.rating?.count || 120})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">${product.price}</div>
          <button className="add-btn" onClick={() => onAddToCart(product)}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;